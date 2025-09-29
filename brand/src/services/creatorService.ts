import { supabase } from "@/lib/supabase";
import { Creator } from "@/types/Creator";

async function refreshAccessToken(refresh_token: string) {
  const result = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: process.env.NEXT_PUBLIC_AUTH_TIKTOK_ID!,
      client_secret: process.env.NEXT_PUBLIC_AUTH_TIKTOK_SECRET!,
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  const data = await result.json();
  if (!result.ok) throw new Error(`refresh_failed: ${JSON.stringify(data)}`);
  return data as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };
}

export async function getValidTikTokAccessToken(
  creator: Creator,
): Promise<string> {
  if (!creator.refresh_token) throw new Error("no_refresh_token");

  const stillValid =
    creator.access_token &&
    creator.expires_at &&
    new Date(creator.expires_at).getTime() > Date.now() + 60_000;

  if (stillValid) return creator.access_token;

  const refreshed = await refreshAccessToken(creator.refresh_token);
  const newExpires = new Date(Date.now() + refreshed.expires_in * 1000);

  console.log("refreshed", refreshed);
  console.log("newExpires", newExpires);

  try {
    const { error } = await supabase
      .from("creators")
      .update({
        access_token: refreshed.access_token,
        refresh_token: refreshed.refresh_token ?? creator.refresh_token,
        expires_at: newExpires.toISOString(),
      })
      .eq("id", creator.id);

    if (error) {
      throw new Error(`Failed to update creator tokens: ${error.message}`);
    }
  } catch (error) {
    console.log("error", error);
  }

  return refreshed.access_token;
}
