import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

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
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `invalid_signature: ${errorMessage}` },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "capability.updated": {
        const capability = event.data.object as Stripe.Capability;
        const account = await stripe.accounts.retrieve(
          capability.account as string,
        );

        if (capability.status !== "active") {
          return NextResponse.json(
            { error: `capability.status is not active` },
            { status: 400 },
          );
        }

        const creatorId =
          (account.metadata?.creator_id as string | undefined) ??
          (account.metadata?.app_creator_id as string | undefined) ??
          null;

        if (creatorId) {
          await prisma.stripe_connect_accounts.upsert({
            where: { creator_id: creatorId },
            create: { creator_id: creatorId, stripe_account_id: account.id },
            update: { stripe_account_id: account.id },
          });
        }
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("connect webhook error:", error);
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }
}
