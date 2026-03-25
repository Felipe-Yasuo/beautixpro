"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function createSubscription(priceId: string) {
    const userId = await requireAuth();

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            email: true,
            name: true,
            stripe_customer_id: true,
        },
    });

    if (!user) return { error: "Usuário não encontrado." };

    let customerId = user.stripe_customer_id;

    if (!customerId) {
        const customer = await stripe.customers.create({
            email: user.email,
            name: user.name ?? undefined,
        });

        customerId = customer.id;

        await prisma.user.update({
            where: { id: userId },
            data: { stripe_customer_id: customerId },
        });
    }

    const checkout = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.NEXTAUTH_URL}/dashboard/plans?success=true`,
        cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/plans?canceled=true`,
        metadata: {
            userId: userId,
        },
        subscription_data: {
            metadata: {
                userId: userId,
            },
        },
    });

    return { url: checkout.url };
}