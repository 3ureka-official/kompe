import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  upsertPendingFromSession,
  upsertSucceededFromPI,
} from "@/services/contestPaymentService";
import { updateContestPublic } from "@/services/contestService";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: `invalid_signature: ${e.message}` },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const contestId = session.metadata?.contest_id ?? null;
        const brandId = session.metadata?.brand_id ?? null;

        const paymentIntentId =
          (typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id) ?? null;

        if (!paymentIntentId) {
          throw new Error(
            "payment_intent missing on checkout.session.completed",
          );
        }

        // 台帳の仮登録（pending）
        await upsertPendingFromSession({
          brand_id: brandId,
          contest_id: contestId,
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id: paymentIntentId,
          stripe_charge_id: null,
          transfer_group: session.metadata?.transfer_group ?? "",
          currency: session.currency ?? "jpy",
          amount_gross: session.amount_total ?? 0,
          amount_fee: 0,
          amount_net: 0,
          status: "pending",
          available_on: null,
        });

        break;
      }

      case "charge.updated": {
        const chargeEvt = event.data.object as Stripe.Charge;

        // balance_transaction を API で取り直す（イベント内は ID のことが多い）
        const btId =
          typeof chargeEvt.balance_transaction === "string"
            ? chargeEvt.balance_transaction
            : ((chargeEvt.balance_transaction as any)?.id ?? null);

        if (!btId) {
          // まだ紐付いていない更新ならスキップ（次の updated を待つ）
          break;
        }

        const bt = await stripe.balanceTransactions.retrieve(btId);

        // 対応する Checkout Session を逆引き
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: chargeEvt.payment_intent as string,
          limit: 1,
        });
        const session = sessions.data[0] ?? null;
        const sessionId = session?.id ?? null;
        if (!sessionId) {
          throw new Error("failed to reverse-lookup checkout session for PI");
        }

        const contestId =
          (chargeEvt.metadata?.contest_id ?? session?.metadata?.contest_id) ||
          null;
        const brandId =
          (chargeEvt.metadata?.brand_id ?? session?.metadata?.brand_id) || null;

        await upsertSucceededFromPI({
          brand_id: brandId,
          contest_id: contestId,
          stripe_checkout_session_id: sessionId,
          stripe_payment_intent_id: String(chargeEvt.payment_intent),
          stripe_charge_id: chargeEvt.id,
          transfer_group: chargeEvt.transfer_group ?? "",
          amount_gross: chargeEvt.amount,
          amount_fee: bt.fee ?? 0,
          amount_net: chargeEvt.amount - (bt.fee ?? 0),
          status: "succeeded",
          available_on: bt.available_on
            ? new Date(bt.available_on * 1000)
            : null,
        });

        if (contestId) {
          await updateContestPublic(contestId);
        }

        break;
      }

      default:
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("webhook error:", e);
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }
}
