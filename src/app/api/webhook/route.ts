import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch {
        return NextResponse.json({ error: "Webhook inválido." }, { status: 400 });
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;

            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            const priceId = subscription.items.data[0].price.id;

            const plan =
                priceId === process.env.STRIPE_PROFESSIONAL_PRICE_ID
                    ? "PROFESSIONAL"
                    : "BASIC";

            await prisma.subscription.upsert({
                where: { userId: session.metadata?.userId ?? "" },
                create: {
                    status: subscription.status,
                    plan,
                    priceId,
                    userId: session.metadata?.userId ?? "",
                },
                update: {
                    status: subscription.status,
                    plan,
                    priceId,
                },
            });

            break;
        }

        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription;

            await prisma.subscription.updateMany({
                where: { userId: subscription.metadata?.userId ?? "" },
                data: { status: subscription.status },
            });

            break;
        }
    }

    return NextResponse.json({ received: true });
}