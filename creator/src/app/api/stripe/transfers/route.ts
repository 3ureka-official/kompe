// app/api/contests/[id]/transfers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { TransferSchema } from "@/models/stripe/transfer";

export const runtime = "nodejs";

interface ValidationError {
  name: string;
  message: string;
  inner?: Array<{ path: string; message: string }>;
  path?: string;
}

function formatYupError(err: ValidationError) {
  if (err?.name !== "ValidationError")
    return [{ message: String(err?.message ?? "validation error") }];
  return err.inner?.length
    ? err.inner.map((e) => ({ path: e.path, message: e.message }))
    : [{ path: err.path, message: err.message }];
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json().catch(() => ({}));
    const body = TransferSchema.parse(raw);

    // 1) 認証（Bearer 必須）
    const session = await auth();
    if (!session?.user?.creator_id)
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    // 2) 送金先アカウント解決
    const connectedAccount = await prisma.stripe_connect_accounts.findUnique({
      where: {
        creator_id: session?.user?.creator_id,
      },
    });

    if (!connectedAccount) {
      return NextResponse.json(
        { error: "creator_has_no_connected_account" },
        { status: 409 },
      );
    }

    // 3) コンテスト取得
    const contest = await prisma.contests.findUnique({
      where: {
        id: body.contestId,
      },
      include: {
        applications: {
          where: {
            tiktok_url: { not: null },
          },
          orderBy: {
            views: "desc",
          },
        },
      },
    });

    if (!contest) {
      return NextResponse.json({ error: "contest_not_found" }, { status: 404 });
    }

    // 4) 応募者のランク取得
    const rank = contest.applications.findIndex(
      (application) => application.creator_id === session?.user?.creator_id,
    );
    if (rank === -1) {
      return NextResponse.json({ error: "rank_not_found" }, { status: 404 });
    }

    const amount = contest.prize_distribution[rank];
    if (!amount) {
      return NextResponse.json({ error: "amount_not_found" }, { status: 404 });
    }

    // 3) Stripe Transfer を作成（route.ts で直に呼ぶ）
    const idempotencyKey = `contest:${body.contestId}:app:${body.applicationId}:creator:${session?.user?.creator_id}:amt:${amount}`;

    const tr = await stripe.transfers.create(
      {
        amount: Number(amount),
        currency: "jpy",
        destination: connectedAccount.stripe_account_id,
        transfer_group: body.contestId,
        description: `Contest ${body.contestId} award`,
        metadata: {
          contestId: body.contestId,
          applicationId: body.applicationId,
          creatorId: session?.user?.creator_id,
        },
      },
      { idempotencyKey },
    );

    // 4) DBに記録（重複は upsert で防止）
    await prisma.contest_transfers.create({
      data: {
        brand_id: contest.brand_id,
        creator_id: session?.user?.creator_id,
        contest_id: body.contestId,
        application_id: body.applicationId,
        stripe_transfer_id: tr.id,
        destination_account: connectedAccount.stripe_account_id,
        currency: "jpy" as const,
        amount: Number(amount),
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("error", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        {
          error: "validation_error",
          details: formatYupError(error as ValidationError),
        },
        { status: 400 },
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorCode = (error as { code?: string })?.code;
    const status = errorCode === "insufficient_funds" ? 409 : 400;

    return NextResponse.json(
      { error: errorMessage ?? "bad_request" },
      { status },
    );
  }
}
