import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // TikTok 認証リダイレクトから code と state を取得
  const { code, state } = req.query;

  if (typeof code !== "string" || typeof state !== "string") {
    res.status(400).json({ error: "Missing code or state" });
    return;
  }

  try {
    // Supabase Edge Function に code と state を送信
    const response = await fetch(process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, state }),
    });

    // エラー応答時はそのまま返却
    if (!response.ok) {
      const errorText = await response.text();
      res.status(response.status).json({ error: errorText });
      return;
    }

    // 成功時のレスポンスをパース
    const data = await response.json();

    // 必要に応じて Cookie にセッション情報をセット
    // 例: Supabase のアクセストークンとリフレッシュトークン
    res.setHeader(
      "Set-Cookie",
      `sb-access-token=${data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
    );
    res.setHeader(
      "Set-Cookie",
      `sb-refresh-token=${data.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
    );

    // 最後にアプリのホームなどへリダイレクト
    res.redirect("/");
  } catch (error) {
    console.error("TikTok callback error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
