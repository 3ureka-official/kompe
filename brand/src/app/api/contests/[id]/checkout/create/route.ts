import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { getBearer, userClientFromBearer } from "@/lib/supabase";

const FEE_RATE = process.env.CONTEST_TAX_PERCENTAGE
  ? parseFloat(process.env.CONTEST_TAX_PERCENTAGE) / 100 + 1
  : 1.1;

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string; originPath: string }> },
) {
  try {
    const { id: contestId } = await ctx.params;
    const { originPath } = await req.json();

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

    // 2) コンテスト取得
    const { data: contest } = await user
      .from("contests")
      .select("id, brand_id, contest_prizes(amount)")
      .eq("id", contestId)
      .maybeSingle();
    if (!contest)
      return NextResponse.json({ error: "contest_not_found" }, { status: 404 });

    const amountJpy = contest.contest_prizes.reduce(
      (acc, prize) => acc + prize.amount,
      0,
    );
    const resultAmountJpy = Math.floor(amountJpy * FEE_RATE);

    const transferGroup = `contest:${contestId}`;
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/contests/${contestId}?checkout=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}${originPath}`;

    // 3) Checkout Session 作成
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: `コンテスト賞金の支払い（手数料：${process.env.CONTEST_TAX_PERCENTAGE ?? "10"}%）`,
            },
            unit_amount: resultAmountJpy,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        transfer_group: transferGroup,
        metadata: { contest_id: contestId, brand_id: contest.brand_id },
      },
      metadata: {
        contest_id: contestId,
        brand_id: contest.brand_id,
        transfer_group: transferGroup,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session.url)
      return NextResponse.json(
        { error: "failed_to_create_checkout_session" },
        { status: 500 },
      );

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorName = error instanceof Error ? error.name : "";

    const msg =
      errorName === "ValidationError"
        ? "invalid_body"
        : errorMessage || "internal_error";
    const status = msg === "invalid_body" ? 400 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
