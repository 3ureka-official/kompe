"use server";

import { NextResponse } from "next/server";

export async function GET() {
  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_key: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    response_type: "code",
    scope: "user.info.basic",
    state,
  });

  return NextResponse.redirect(
    `https://www.tiktok.com/v2/auth/authorize/?${params}`,
    302,
  );
}
