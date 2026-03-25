"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function createPortalCustomer() {
    const userId = await requireAuth();

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { stripe_customer_id: true },
    });

    if (!user?.stripe_customer_id) return { error: "Nenhuma assinatura ativa." };

    const portal = await stripe.billingPortal.sessions.create({
        customer: user.stripe_customer_id,
        return_url: `${process.env.NEXTAUTH_URL}/dashboard/plans`,
    });

    return { url: portal.url };
}