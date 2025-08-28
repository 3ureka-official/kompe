import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  upsertPendingFromSession,
  upsertSucceededFromPI,
} from "@/services/contestPaymentService";

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

        if (!paymentIntentId)
          throw new Error(
            "payment_intent missing on checkout.session.completed",
          );

        await upsertPendingFromSession({
          brand_id: brandId,
          contest_id: contestId,
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id: paymentIntentId,
          stripe_charge_id: null,
          transfer_group: "",
          currency: session.currency ?? "jpy",
          amount_gross: session.amount_total ?? 0,
          amount_fee: 0,
          amount_net: 0,
          status: "pending",
          available_on: new Date(),
        });
      }

      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent;

        const piFull = await stripe.paymentIntents.retrieve(pi.id, {
          expand: ["latest_charge.balance_transaction"],
        });
        const charge = piFull.latest_charge as Stripe.Charge | null;
        const bt =
          charge?.balance_transaction as Stripe.BalanceTransaction | null;

        const sessions = await stripe.checkout.sessions.list({
          payment_intent: pi.id,
          limit: 1,
        });
        const session = sessions.data[0] ?? null;
        const sessionId = session?.id ?? null;
        if (!sessionId) {
          // スキーマ上NOT NULLなら、ここで失敗→Stripe再送に任せるのが安全
          throw new Error("failed to reverse-lookup checkout session for PI");
        }

        const contestId =
          (piFull.metadata?.contest_id ?? session?.metadata?.contest_id) ||
          null;
        const brandId =
          (piFull.metadata?.brand_id ?? session?.metadata?.brand_id) || null;

        await upsertSucceededFromPI({
          brand_id: brandId,
          contest_id: contestId,
          stripe_checkout_session_id: sessionId,
          stripe_payment_intent_id: piFull.id,
          stripe_charge_id: charge?.id ?? null,
          transfer_group: piFull.transfer_group ?? "",
          currency: piFull.currency,
          amount_gross: charge?.amount ?? piFull.amount_received ?? 0,
          amount_fee: bt?.fee ?? 0,
          amount_net: bt?.net ?? piFull.amount_received ?? 0,
          status: "succeeded",
          available_on: bt?.available_on
            ? new Date(bt.available_on * 1000)
            : new Date(),
        });
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
