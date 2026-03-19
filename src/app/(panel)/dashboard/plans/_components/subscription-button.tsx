"use client";

import { useState } from "react";
import { createSubscription } from "../_actions/create-subscription";
import { createPortalCustomer } from "../_actions/create-portal-customer";

interface SubscriptionButtonProps {
    priceId: string;
    hasSubscription: boolean;
}

export function SubscriptionButton({
    priceId,
    hasSubscription,
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

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="w-full bg-[#c9a84c] text-black py-3 text-xs tracking-widest uppercase hover:bg-[#e8c97a] transition-colors disabled:opacity-50 cursor-pointer"
        >
            {loading ? "Aguarde..." : hasSubscription ? "Gerenciar plano" : "Assinar agora"}
        </button>
    );
}