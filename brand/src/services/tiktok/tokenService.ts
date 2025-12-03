export async function refreshAccessToken(refresh_token: string) {
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
