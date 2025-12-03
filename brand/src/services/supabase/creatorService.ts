import { supabase } from "@/lib/supabase";
import { Creator } from "@/types/Creator";
import { refreshAccessToken } from "../tiktok/tokenService";

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
