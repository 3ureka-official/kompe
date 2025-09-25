import { creators } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getValidTikTokAccessToken } from "./creatorService";

type VideoMetrics = {
  id: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
};

const FIELDS = [
  "id",
  "view_count",
  "like_count",
  "comment_count",
  "share_count",
] as const;
const CONCURRENCY = 5;
const FIFTEEN_MIN_MS = 15 * 60 * 1000;

// applications を含んだ contest を返すための include 定義
const CONTEST_INCLUDE = {
  applications: {
    include: {
      creators: true,
      contest_transfers: true,
    },
    orderBy: { views: "desc" },
  },
  brands: true,
  contests_assets: true,
  contests_inspirations: true,
} as const;

export async function getTikTokMetricsAndUpdate(contestId: string): Promise<{
  competition: Awaited<ReturnType<typeof fetchContestWithApps>>;
}> {
  const now = new Date();

  // まずは存在チェックと updated__engagement_at のみ
  const competition = await prisma.contests.findFirst({
    where: { id: contestId },
    select: {
      id: true,
      updated_engagement_at: true,
      applications: {
        select: {
          id: true,
          views: true,
          likes: true,
          comments: true,
          shares: true,
          tiktok_url: true,
          creators: true,
        },
      },
    },
  });
  if (!competition) throw new Error("contest_not_found");

  // スロットル（前回から15分未満ならそのまま返す）
  if (
    competition.updated_engagement_at &&
    now.getTime() - new Date(competition.updated_engagement_at).getTime() <
      FIFTEEN_MIN_MS
  ) {
    const result = await fetchContestWithApps(contestId);
    return { competition: result };
  }

  // --- TikTok メトリクス取得（並列制御） ---
  type AppResult = {
    applicationId: string;
    metrics: {
      viewCount: number;
      likeCount: number;
      commentCount: number;
      shareCount: number;
    } | null;
  };
  const results: AppResult[] = [];

  for (let i = 0; i < competition.applications.length; i += CONCURRENCY) {
    const chunk = competition.applications.slice(i, i + CONCURRENCY);
    const settled = await Promise.allSettled(
      chunk.map(async (application) => {
        const m = await fetchCreatorVideoMetrics(
          application.creators,
          application.tiktok_url!,
        );
        return { applicationId: application.id, ...m };
      }),
    );

    settled.forEach((s, idx) => {
      const app = chunk[idx];
      if (s.status === "fulfilled") {
        results.push({
          applicationId: app.id,
          metrics: {
            viewCount: numSafe(s.value.views),
            likeCount: numSafe(s.value.likes),
            commentCount: numSafe(s.value.comments),
            shareCount: numSafe(s.value.shares),
          },
        });
      } else {
        // 取得失敗は今回スキップ（DB更新しない）
        results.push({ applicationId: app.id, metrics: null });
      }
    });
  }

  // --- 差分抽出（undefined/NaN/負数は0に丸める） ---
  const byId = new Map(results.map((r) => [r.applicationId, r.metrics]));
  const diffs: Array<{
    id: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    shareCount: number;
  }> = [];

  for (const app of competition.applications) {
    const m = byId.get(app.id);
    if (!m) continue;

    const next = {
      id: app.id,
      viewCount: numSafe(m.viewCount),
      likeCount: numSafe(m.likeCount),
      commentCount: numSafe(m.commentCount),
      shareCount: numSafe(m.shareCount),
    };

    if (
      toNumber(app.views) !== next.viewCount ||
      toNumber(app.likes) !== next.likeCount ||
      toNumber(app.comments) !== next.commentCount ||
      toNumber(app.shares) !== next.shareCount
    ) {
      diffs.push(next);
    }
  }

  // --- 一括更新 + contests 合計更新（同一トランザクション） ---
  const updatedContest = await bulkUpdateEngagementOptimized(
    competition.id,
    diffs,
  );

  // --- 更新されたcontestを直接返す（applicationsも含まれている） ---
  return { competition: updatedContest };
}

async function fetchContestWithApps(contestId: string) {
  const contest = await prisma.contests.findUnique({
    where: { id: contestId },
    include: CONTEST_INCLUDE,
  });
  if (!contest) throw new Error("contest_not_found_after_update");
  return contest;
}

// パフォーマンスを重視する場合の代替実装
async function bulkUpdateEngagementOptimized(
  contestId: string,
  diffs: Array<{
    id: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    shareCount: number;
  }>,
) {
  return prisma.$transaction(async (tx) => {
    if (diffs.length > 0) {
      try {
        // バッチサイズを制限して一括更新
        const BATCH_SIZE = 10;
        for (let i = 0; i < diffs.length; i += BATCH_SIZE) {
          const batch = diffs.slice(i, i + BATCH_SIZE);

          const batchPromises = batch.map(async (diff) => {
            try {
              return await tx.applications.update({
                where: { id: diff.id },
                data: {
                  views: BigInt(diff.viewCount),
                  likes: BigInt(diff.likeCount),
                  comments: BigInt(diff.commentCount),
                  shares: BigInt(diff.shareCount),
                },
              });
            } catch (error) {
              console.error(`Failed to update application ${diff.id}:`, error);
              throw error;
            }
          });

          await Promise.all(batchPromises);
        }
      } catch (error) {
        console.error("Error in optimized bulk update:", error);
        throw new Error(
          `Optimized bulk update failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }

    // contests の合計を更新
    try {
      const aggregates = await tx.applications.aggregate({
        where: { contest_id: contestId },
        _sum: {
          views: true,
          likes: true,
          comments: true,
          shares: true,
        },
      });

      // contestsテーブルを更新し、同時にapplicationsも含めて取得
      const updatedContest = await tx.contests.update({
        where: { id: contestId },
        data: {
          views: BigInt(aggregates._sum.views || 0),
          likes: BigInt(aggregates._sum.likes || 0),
          comments: BigInt(aggregates._sum.comments || 0),
          shares: BigInt(aggregates._sum.shares || 0),
          updated_engagement_at: new Date(),
        },
        include: CONTEST_INCLUDE,
      });

      return updatedContest;
    } catch (error) {
      console.error("Error updating contest aggregates:", error);
      throw error;
    }
  });
}

/** TikTok メトリクス取得 */
export async function fetchCreatorVideoMetrics(
  creator: creators,
  videoId: string,
): Promise<VideoMetrics> {
  const accessToken = await getValidTikTokAccessToken(creator);
  if (!videoId) throw new Error("invalid_tiktok_url");

  const res: Response = await fetch(
    `https://open.tiktokapis.com/v2/video/query/?fields=${FIELDS.join(",")}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters: { video_ids: [videoId] } }),
    },
  );

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`video_metrics_failed(${res.status}): ${err}`);
  }

  const data = await res.json();

  return {
    id: data.data.videos?.[0]?.id,
    views: data.data.videos?.[0]?.view_count ?? undefined,
    likes: data.data.videos?.[0]?.like_count ?? undefined,
    comments: data.data.videos?.[0]?.comment_count ?? undefined,
    shares: data.data.videos?.[0]?.share_count ?? undefined,
  };
}

// 比較用に安全に number 化
function toNumber(v: unknown): number {
  if (v == null) return 0;
  if (typeof v === "bigint") return Number(v);
  if (typeof v === "number") return v;
  if (typeof v === "string") return Number(v);
  return Number(v as number) || 0;
}

// NOT NULL に耐性を持たせるサニタイズ
function numSafe(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}
