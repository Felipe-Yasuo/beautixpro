import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function resolvePlan(priceId: string): "BASIC" | "PROFESSIONAL" {
    return priceId === process.env.STRIPE_PROFESSIONAL_PRICE_ID
        ? "PROFESSIONAL"
        : "BASIC";
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
    );

    const priceId = subscription.items.data[0].price.id;
    const plan = resolvePlan(priceId);
    const userId = session.metadata?.userId;

    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    await prisma.subscription.upsert({
        where: { userId },
        create: {
            status: subscription.status,
            plan,
            priceId,
            userId,
        },
        update: {
            status: subscription.status,
            plan,
            priceId,
        },
    });
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
    const userId = subscription.metadata?.userId;

    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    await prisma.subscription.updateMany({
        where: { userId },
        data: { status: subscription.status },
    });
}

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json({ error: "Assinatura ausente." }, { status: 400 });
    }

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

    try {
        switch (event.type) {
            case "checkout.session.completed":
                await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
                break;

            case "customer.subscription.updated":
            case "customer.subscription.deleted":
                await handleSubscriptionChange(event.data.object as Stripe.Subscription);
                break;
        }
    } catch {
        return NextResponse.json(
            { error: "Erro ao processar evento do webhook." },
            { status: 500 }
        );
    }

    return NextResponse.json({ received: true });
}