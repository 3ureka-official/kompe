import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

// Supabase（サービスロール）: RLSを気にせずサーバ側で安全に書き込み
function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

type Body = {
  creatorId?: string;
  returnUrl?: string;
};

export async function POST(req: Request) {
  try {
    // 1) 入力取得
    const body = (await req.json()) as Body;
    const creatorId = body.creatorId;
    const fallbackReturnBase =
      process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;
    const returnUrl =
      body.returnUrl ?? `${fallbackReturnBase}/settings/payouts`;

    if (!creatorId) {
      return NextResponse.json(
        { error: "creatorId is required" },
        { status: 400 },
      );
    }

    const supabase = getAdminSupabase();

    // 2) 既存の接続アカウントを探す
    const { data: existing, error: exErr } = await supabase
      .from("stripe_connect_accounts")
      .select("id, stripe_account_id")
      .eq("creator_id", creatorId)
      .maybeSingle();

    if (exErr) {
      console.error(exErr);
      return NextResponse.json(
        { error: "failed to read stripe_connect_accounts" },
        { status: 500 },
      );
    }

    // 3) なければStripe Expressアカウントを作成
    let accountId = existing?.stripe_account_id;
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "JP",
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },
        },
        metadata: { creator_id: creatorId },
      });
      accountId = account.id;

      // DBに保存（creator_id一意でupsert）
      const { error: upErr } = await supabase
        .from("stripe_connect_accounts")
        .upsert(
          { creator_id: creatorId, stripe_account_id: accountId },
          { onConflict: "creator_id" },
        );
      if (upErr) {
        console.error(upErr);
        return NextResponse.json(
          { error: "failed to upsert stripe_connect_accounts" },
          { status: 500 },
        );
      }
    }

    // 4) オンボーディング用リンクを発行
    const link = await stripe.accountLinks.create({
      account: accountId!,
      type: "account_onboarding",
      refresh_url: `${returnUrl}?refresh=1`,
      return_url: `${returnUrl}?complete=1`,
    });

    return NextResponse.json({ url: link.url, accountId }, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e?.message ?? "internal_error" },
      { status: 500 },
    );
  }
}
