// Supabase Edge Function: auth_tiktok.ts
// Handles TikTok OAuth callback, stores user + tokens, issues RS256 JWT, and sets a HttpOnly cookie

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  SignJWT,
  importPKCS8,
} from "https://deno.land/x/jose@v4.14.4/index.ts";

// Environment variables
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const PRIVATE_KEY_PEM = Deno.env.get("JWT_PRIVATE_KEY")!;

const TIKTOK_CLIENT_KEY = Deno.env.get("TIKTOK_CLIENT_KEY")!;
const TIKTOK_CLIENT_SECRET = Deno.env.get("TIKTOK_CLIENT_SECRET")!;
const FRONTEND_REDIRECT_URL = Deno.env.get("FRONTEND_REDIRECT_URL")!;

// Initialize Supabase client with service role
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// TikTok token endpoint
const TOKEN_ENDPOINT = "https://open.tiktokapis.com/v2/oauth/token";

serve(async (req) => {
  // Extract authorization code from query
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) {
    return new Response("Missing ?code", { status: 400 });
  }

  console.log("code", code);

  // 1) Exchange code for tokens
  const tokenRes = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: TIKTOK_CLIENT_KEY,
      client_secret: TIKTOK_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    console.error("TikTok token exchange failed", errText);
    return new Response("Token exchange failed", { status: 502 });
  }

  const {
    access_token,
    refresh_token,
    open_id,
    expires_in = 3600,
  } = (await tokenRes.json()).data ?? {};

  if (!open_id) {
    return new Response("Missing open_id", { status: 500 });
  }

  // 2) Store or update user profile
  await supabase.from("creators").upsert({ user_id: open_id });

  // 3) Store or update OAuth tokens securely
  await supabase.from("creator_oauth_tokens").upsert({
    user_id: open_id,
    provider: "tiktok",
    access_token,
    refresh_token,
    expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
  });

  // 4) Issue JWT
  const privateKey = await importPKCS8(PRIVATE_KEY_PEM, "RS256");
  const now = Math.floor(Date.now() / 1000);
  const jwt = await new SignJWT({
    sub: open_id,
    iss: "kompe-tiktok-auth",
    aud: "supabase",
    iat: now,
    exp: now + 3600,
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .sign(privateKey);

  // 5) Set HttpOnly cookie and redirect
  const cookie = [
    `sb-access-token=${jwt}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Max-Age=3600",
  ].join("; ");

  return new Response(null, {
    status: 302,
    headers: {
      Location: FRONTEND_REDIRECT_URL,
      "Set-Cookie": cookie,
    },
  });
});
