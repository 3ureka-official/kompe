import { creators } from "@prisma/client";
import { getValidTikTokAccessToken } from "./creatorService";
import prisma from "@/lib/prisma";

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
];

const CONCURRENCY = 5;

export async function getTikTokMetrics(contestId: string) {
  try {
    const now = new Date();

    // 開催中のみ
    const competition = await prisma.contests.findFirst({
      where: {
        id: contestId,
        contest_start_date: { lte: now },
        contest_end_date: { gte: now },
      },
      include: {
        brands: true,
        applications: {
          include: {
            creators: true,
            contest_transfers: true,
          },
        },
        contests_assets: true,
        contests_inspirations: true,
      },
    });

    if (!competition) {
      throw new Error("contest_not_found");
    }

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

    // 並列制御（CONCURRENCYごとにバッチ）
    for (let i = 0; i < competition.applications.length; i += CONCURRENCY) {
      const chunk = competition.applications.slice(i, i + CONCURRENCY);
      const settled = await Promise.allSettled(
        chunk.map(async (application) => {
          const metrics = await fetchCreatorVideoMetrics(
            application.creators,
            application.tiktok_url!,
          );
          return {
            applicationId: application.id,
            tiktokUrl: application.tiktok_url!,
            ...metrics,
          };
        }),
      );
      settled.forEach((settledResult, idx) => {
        const application = chunk[idx];
        if (settledResult.status === "fulfilled") {
          results.push({
            applicationId: application.id,
            metrics: {
              viewCount: settledResult.value.views ?? 0,
              likeCount: settledResult.value.likes ?? 0,
              commentCount: settledResult.value.comments ?? 0,
              shareCount: settledResult.value.shares ?? 0,
            },
          });
        } else {
          results.push({
            applicationId: application.id,
            metrics: {
              viewCount: 0,
              likeCount: 0,
              commentCount: 0,
              shareCount: 0,
            },
          });
        }
      });
    }

    return {
      competition: competition,
      metrics: results,
    };
  } catch (e: any) {
    console.error("[metrics:update:applications] failed:", e);
    const msg = typeof e?.message === "string" ? e.message : "unknown_error";
    throw new Error(msg);
  }
}

/**
 * クリエイターの動画一覧から、欲しい video_ids のメトリクスだけ拾って返す
 */
export async function fetchCreatorVideoMetrics(
  creator: creators,
  videoId: string,
): Promise<VideoMetrics> {
  const accessToken = await getValidTikTokAccessToken(creator);

  if (!videoId) {
    throw new Error("invalid_tiktok_url");
  }

  const res: Response = await fetch(
    `https://open.tiktokapis.com/v2/video/query/?fields=${FIELDS.join(",")}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filters: {
          video_ids: [videoId],
        },
      }),
    },
  );

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`video_metrics_failed(${res.status}): ${err}`);
  }

  const data = await res.json();

  return {
    id: data.data.videos[0].id,
    views: data.data.videos[0].view_count ?? undefined,
    likes: data.data.videos[0].like_count ?? undefined,
    comments: data.data.videos[0].comment_count ?? undefined,
    shares: data.data.videos[0].share_count ?? undefined,
  };
}
