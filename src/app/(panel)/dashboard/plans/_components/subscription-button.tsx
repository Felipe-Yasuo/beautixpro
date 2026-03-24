// _components/subscription-button.tsx
"use client";

import { useState } from "react";
import { createSubscription } from "../_actions/create-subscription";
import { createPortalCustomer } from "../_actions/create-portal-customer";

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

    const label = loading
        ? "Aguarde..."
        : isCurrentPlan
            ? "Gerenciar Plano"
            : "Assinar Agora";

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`w-full py-3.5 text-xs tracking-widest uppercase font-semibold transition-colors disabled:opacity-50 cursor-pointer rounded-lg ${isCurrentPlan || isPro
                ? "bg-[#c9a84c] text-black hover:bg-[#e8c97a]"
                : "border border-[#c9a84c33] text-[#ffffff60] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
        >
            {label}
        </button>
    );
}
