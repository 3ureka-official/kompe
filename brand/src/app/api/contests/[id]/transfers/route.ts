// app/api/contests/[id]/transfers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { transferSchema } from "@/schema/stripe/transferSchema";
import { getBearer, userClientFromBearer } from "@/lib/supabase";

export const runtime = "nodejs";

function formatYupError(err: any) {
  if (err?.name !== "ValidationError")
    return [{ message: String(err?.message ?? "validation error") }];
  return err.inner?.length
    ? err.inner.map((e: any) => ({ path: e.path, message: e.message }))
    : [{ path: err.path, message: err.message }];
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { id: contestId } = await ctx.params;
    const raw = await req.json().catch(() => ({}));
    const body = await transferSchema.validate(raw, {
      abortEarly: false,
      stripUnknown: true,
    });

    // 1) 認証（Bearer 必須）
    const bearer = getBearer(req);
    if (!bearer)
      return NextResponse.json({ error: "missing_bearer" }, { status: 401 });

    const user = userClientFromBearer(bearer);
    if (!user)
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const {
      data: { user: profile },
    } = await user.auth.getUser();
    if (!profile)
      return NextResponse.json({ error: "not_found_user" }, { status: 404 });

    const { data: brandId } = await user
      .from("users")
      .select("brand_id")
      .eq("id", profile.id)
      .single();

    // 2) 送金先アカウント解決
    const { data: connectedAccount, error } = await user
      .from("stripe_connect_accounts")
      .select("stripe_account_id")
      .eq("creator_id", body.creatorId)
      .maybeSingle();

    if (error) throw error;
    const destination = connectedAccount?.stripe_account_id ?? null;
    if (!destination) {
      return NextResponse.json(
        { error: "creator_has_no_connected_account" },
        { status: 409 },
      );
    }

    // 3) Stripe Transfer を作成（route.ts で直に呼ぶ）
    const idempotencyKey = `contest:${contestId}:app:${body.applicationId}:creator:${body.creatorId}:amt:${body.amountJpy}`;

    const tr = await stripe.transfers.create(
      {
        amount: body.amountJpy,
        currency: "jpy",
        destination,
        transfer_group: contestId,
        description: body.description ?? `Contest ${contestId} award`,
        metadata: {
          contestId,
          applicationId: body.applicationId,
          creatorId: body.creatorId,
        },
      },
      { idempotencyKey },
    );

    // 4) DBに記録（重複は upsert で防止）
    const { error: contestTransferError } = await user
      .from("contest_transfers")
      .upsert(
        {
          brand_id: brandId?.brand_id ?? "",
          contest_id: contestId,
          application_id: body.applicationId,
          creator_id: body.creatorId,
          stripe_transfer_id: tr.id,
          destination_account: destination,
          currency: "jpy",
          amount: body.amountJpy,
        },
        { onConflict: "contest_id,application_id,creator_id" },
      );

    if (contestTransferError) throw contestTransferError;

    return NextResponse.json({ ok: true, transfer: tr });
  } catch (e: any) {
    console.error("error", e);
    if (e?.name === "ValidationError") {
      return NextResponse.json(
        { error: "validation_error", details: formatYupError(e) },
        { status: 400 },
      );
    }
    const status = e?.code === "insufficient_funds" ? 409 : 400;
    return NextResponse.json(
      { error: e?.message ?? "bad_request" },
      { status },
    );
  }
}
