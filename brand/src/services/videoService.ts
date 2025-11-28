import { supabase } from "@/lib/supabase";
import { getValidTikTokAccessToken } from "@/services/creatorService";
import { Application } from "@/types/Application";
import { ContestWithApplications } from "@/types/Contest";
import { Creator } from "@/types/Creator";

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

export async function getTikTokMetricsAndUpdate(contestId: string): Promise<{
  competition: ContestWithApplications;
}> {
  const now = new Date();

  // まずは存在チェックと updated_engagement_at のみ
  const { data: competition, error: competitionError } = await supabase
    .from("contests")
    .select(
      `
      id,
      updated_engagement_at,
      applications (
        *,
        creators (
          *
        )
      )
    `,
    )
    .eq("id", contestId)
    .single();

  if (competitionError || !competition) {
    throw new Error("contest_not_found");
  }

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
      chunk.map(async (application: Application & { creators: Creator }) => {
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

  // --- 一括更新 + contests 合計更新 ---
  const updatedContest = await bulkUpdateEngagementOptimized(
    competition.id,
    diffs,
  );

  // --- 更新されたcontestを直接返す（applicationsも含まれている） ---
  return { competition: updatedContest };
}

async function fetchContestWithApps(
  contestId: string,
): Promise<ContestWithApplications> {
  const { data: contest, error } = await supabase
    .from("contests")
    .select(
      `
      *,
      applications (
        *,
        creators (*),
        contest_transfers (*)
      ),
      brands (*),
      contests_assets (*),
      contests_inspirations (*),
      sample_products (*)
    `,
    )
    .eq("id", contestId)
    .order("views", { ascending: false, referencedTable: "applications" })
    .single();

  if (error || !contest) {
    throw new Error("contest_not_found_after_update");
  }

  return contest as ContestWithApplications;
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
): Promise<ContestWithApplications> {
  try {
    if (diffs.length > 0) {
      // バッチサイズを制限して一括更新
      const BATCH_SIZE = 10;
      for (let i = 0; i < diffs.length; i += BATCH_SIZE) {
        const batch = diffs.slice(i, i + BATCH_SIZE);

        const batchPromises = batch.map(async (diff) => {
          try {
            const { error } = await supabase
              .from("applications")
              .update({
                views: diff.viewCount,
                likes: diff.likeCount,
                comments: diff.commentCount,
                shares: diff.shareCount,
              })
              .eq("id", diff.id);

            if (error) {
              console.error(`Failed to update application ${diff.id}:`, error);
              throw error;
            }
          } catch (error) {
            console.error(`Failed to update application ${diff.id}:`, error);
            throw error;
          }
        });

        await Promise.all(batchPromises);
      }
    }

    // contests の合計を計算して更新
    const { data: aggregates, error: aggregateError } = await supabase
      .from("applications")
      .select("views, likes, comments, shares")
      .eq("contest_id", contestId);

    if (aggregateError) {
      throw new Error(
        `Failed to calculate aggregates: ${aggregateError.message}`,
      );
    }

    const totals = aggregates.reduce(
      (acc, app) => ({
        views: acc.views + (Number(app.views) || 0),
        likes: acc.likes + (Number(app.likes) || 0),
        comments: acc.comments + (Number(app.comments) || 0),
        shares: acc.shares + (Number(app.shares) || 0),
      }),
      { views: 0, likes: 0, comments: 0, shares: 0 },
    );

    // contestsテーブルを更新
    const { error: updateError } = await supabase
      .from("contests")
      .update({
        views: totals.views,
        likes: totals.likes,
        comments: totals.comments,
        shares: totals.shares,
        updated_engagement_at: new Date().toISOString(),
      })
      .eq("id", contestId);

    if (updateError) {
      throw new Error(`Failed to update contest: ${updateError.message}`);
    }

    // 更新後のデータを取得して返す
    return await fetchContestWithApps(contestId);
  } catch (error) {
    console.error("Error in optimized bulk update:", error);
    throw error;
  }
}
/** TikTok メトリクス取得 */
export async function fetchCreatorVideoMetrics(
  creator: Creator,
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
