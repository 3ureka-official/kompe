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
    orderBy: { created_at: "asc" as const },
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
  const competitionHead = await prisma.contests.findFirst({
    where: { id: contestId },
    select: { id: true, updated_engagement_at: true },
  });
  if (!competitionHead) throw new Error("contest_not_found");

  // スロットル（前回から15分未満ならそのまま返す）
  if (
    competitionHead.updated_engagement_at &&
    now.getTime() - new Date(competitionHead.updated_engagement_at).getTime() <
      FIFTEEN_MIN_MS
  ) {
    const competition = await fetchContestWithApps(contestId);
    return { competition };
  }

  // 更新に必要な最小限のデータ（applications + creators）
  const target = await prisma.contests.findUnique({
    where: { id: competitionHead.id },
    select: {
      id: true,
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
  if (!target) throw new Error("contest_not_found");

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

  for (let i = 0; i < target.applications.length; i += CONCURRENCY) {
    const chunk = target.applications.slice(i, i + CONCURRENCY);
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

  for (const app of target.applications) {
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
  await bulkUpdateEngagement(competitionHead.id, diffs);

  // --- 更新後の最新値を applications を含んだ contest として返す ---
  const competition = await fetchContestWithApps(competitionHead.id);
  return { competition };
}

async function fetchContestWithApps(contestId: string) {
  const contest = await prisma.contests.findUnique({
    where: { id: contestId },
    include: CONTEST_INCLUDE,
  });
  if (!contest) throw new Error("contest_not_found_after_update");
  return contest;
}

async function bulkUpdateEngagement(
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
      const payload = JSON.stringify(diffs);
      // COALESCE で NOT NULL カラムにも安全に反映
      await tx.$executeRawUnsafe(
        `
        WITH data AS (
          SELECT * FROM jsonb_to_recordset($1::jsonb)
          AS x(id uuid, viewCount bigint, likeCount bigint, commentCount bigint, shareCount bigint)
        )
        UPDATE applications a
        SET
          views    = COALESCE(d.viewCount,    0),
          likes    = COALESCE(d.likeCount,    0),
          comments = COALESCE(d.commentCount, 0),
          shares   = COALESCE(d.shareCount,   0)
        FROM data d
        WHERE a.id = d.id
        `,
        payload,
      );
    }

    // contests の合計（NULL回避のため COALESCE(SUM(...), 0)）
    await tx.$executeRawUnsafe(
      `
      UPDATE contests c
      SET
        views    = COALESCE((SELECT SUM(a.views)    FROM applications a WHERE a.contest_id = $1::uuid), 0)::bigint,
        likes    = COALESCE((SELECT SUM(a.likes)    FROM applications a WHERE a.contest_id = $1::uuid), 0)::bigint,
        comments = COALESCE((SELECT SUM(a.comments) FROM applications a WHERE a.contest_id = $1::uuid), 0)::bigint,
        shares   = COALESCE((SELECT SUM(a.shares)   FROM applications a WHERE a.contest_id = $1::uuid), 0)::bigint,
        updated_engagement_at = NOW()
      WHERE c.id = $1::uuid
      `,
      contestId,
    );
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
  return Number(v as any) || 0;
}

// NOT NULL に耐性を持たせるサニタイズ
function numSafe(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}
