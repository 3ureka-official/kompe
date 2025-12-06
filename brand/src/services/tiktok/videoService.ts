import { TikTokVideoMetrics } from "@/types/TikTok";

const FIELDS = [
  "id",
  "view_count",
  "like_count",
  "comment_count",
  "share_count",
] as const;

/** TikTok メトリクス取得 */
export async function fetchCreatorVideoMetrics(
  accessToken: string,
  videoId: string,
): Promise<TikTokVideoMetrics> {
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
