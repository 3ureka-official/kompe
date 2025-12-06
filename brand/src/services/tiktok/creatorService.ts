import { TikTokUserInfo } from "@/types/TikTok";
import { supabase } from "@/lib/supabase";

const USER_FIELDS = ["avatar_url", "username", "display_name"] as const;

/** クリエイター情報取得 */
export async function fetchCreatorInfo(
  accessToken: string,
  userId: string,
): Promise<TikTokUserInfo> {
  const res: Response = await fetch(
    `https://open.tiktokapis.com/v2/user/info/?fields=${USER_FIELDS.join(",")}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`user_metrics_failed(${res.status}): ${err}`);
  }

  const data = await res.json();

  console.log(data.data.user);

  await supabase
    .from("creators")
    .update({
      username: data.data.user?.username ?? undefined,
      display_name: data.data.user?.display_name ?? undefined,
      avatar_url: data.data.user?.avatar_url ?? undefined,
    })
    .eq("tiktok_union_id", userId)
    .select()
    .single();

  console.log(data.data.user);

  return {
    username: data.data.user?.username ?? undefined,
    display_name: data.data.user?.display_name ?? undefined,
    avatar_url: data.data.user?.avatar_url ?? undefined,
  };
}
