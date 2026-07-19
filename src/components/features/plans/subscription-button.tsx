"use client";

import { useState } from "react";
import { createSubscription } from "@/lib/actions/create-subscription";
import { createPortalCustomer } from "@/lib/actions/create-portal-customer";

interface SubscriptionButtonProps {
    priceId: string;
    hasSubscription: boolean;
    isCurrentPlan: boolean;
    isPro: boolean;
}

export function SubscriptionButton({
    priceId,
    hasSubscription,
    isCurrentPlan,
    isPro,
}: SubscriptionButtonProps) {
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        setLoading(true);
        if (hasSubscription) {
            const result = await createPortalCustomer();
            if (result?.url) window.location.href = result.url;
        } else {
            const result = await createSubscription(priceId);
            if (result?.url) window.location.href = result.url;
        }
        setLoading(false);
    }

    const label = loading ? "Aguarde..." : isCurrentPlan ? "Gerenciar plano" : "Assinar agora";

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="w-full cursor-pointer rounded-[6px] py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors disabled:opacity-50"
            style={
                isCurrentPlan || isPro
                    ? { backgroundColor: "var(--clima-accent)", color: "#fff" }
                    : { border: "1px solid var(--clima-border-strong)", color: "var(--clima-text-muted)" }
            }
            onMouseEnter={(e) => {
                if (isCurrentPlan || isPro) {
                    e.currentTarget.style.backgroundColor = "var(--clima-accent-hover)";
                } else {
                    e.currentTarget.style.borderColor = "var(--clima-accent)";
                    e.currentTarget.style.color = "var(--clima-accent)";
                }
            }}
            onMouseLeave={(e) => {
                if (isCurrentPlan || isPro) {
                    e.currentTarget.style.backgroundColor = "var(--clima-accent)";
                } else {
                    e.currentTarget.style.borderColor = "var(--clima-border-strong)";
                    e.currentTarget.style.color = "var(--clima-text-muted)";
                }
            }}
        >
            {label}
        </button>
    );
}