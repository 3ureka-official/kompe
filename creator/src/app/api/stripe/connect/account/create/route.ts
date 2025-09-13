export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST() {
  // 1) セッション取得（唯一のソース）
  const session = await auth();
  if (!session?.user?.creator_id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // 2) クリエイターIDはセッション拡張から取得（必須）
  const creatorId = session.user.creator_id;

  // 3) クリエイター存在チェック
  const creator = await prisma.creators.findUnique({
    where: { id: creatorId },
    select: { id: true },
  });
  if (!creator) {
    return NextResponse.json({ error: "creator_not_found" }, { status: 404 });
  }

  // 4) 既存の Stripe Connect アカウントを探す（1:1）
  const existing = await prisma.stripe_connect_accounts.findUnique({
    where: { creator_id: creatorId },
    select: { stripe_account_id: true },
  });

  // 5) 無ければ作成（idempotent 運用：creator_id が UNIQUE）
  if (existing)
    return NextResponse.json(
      { error: "account_already_exists" },
      { status: 400 },
    );

  const account = await stripe.accounts.create({
    country: "JP",
    type: "express",
    business_type: "individual",
    capabilities: {
      transfers: { requested: true },
    },
    business_profile: {
      support_url: "www.google.com",
      product_description: "動画制作の報酬受け取り（個人）",
    },
    metadata: { creator_id: creatorId },
  });

  // 6) Onboarding Link 発行（必要項目のみ収集したいなら collection_options を調整）
  const link = await stripe.accountLinks.create({
    account: account.id,
    type: "account_onboarding",
    refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/mypage`,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/mypage`,
  });

  return NextResponse.json({ url: link.url }, { status: 200 });
}
