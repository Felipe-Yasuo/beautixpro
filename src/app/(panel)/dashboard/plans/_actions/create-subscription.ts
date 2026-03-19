"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function createSubscription(priceId: string) {
    const session = await auth();

    if (!session?.user?.id) return { error: "Não autorizado." };

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
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
            where: { id: session.user.id },
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
            userId: session.user.id,
        },
        subscription_data: {
            metadata: {
                userId: session.user.id,
            },
        },
    });

    return { url: checkout.url };
}