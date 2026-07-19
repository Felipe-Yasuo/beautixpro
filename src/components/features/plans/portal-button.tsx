"use client";

import { useState } from "react";
import { createPortalCustomer } from "@/lib/actions/create-portal-customer";

export function PortalButton() {
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        setLoading(true);
        const result = await createPortalCustomer();
        if (result?.url) window.location.href = result.url;
        setLoading(false);
    }
    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="shrink-0 cursor-pointer rounded-[6px] px-4 py-2.5 text-[10px] uppercase tracking-widest transition-colors disabled:opacity-50"
            style={{ border: "1px solid var(--clima-border-strong)", color: "var(--clima-text-muted)" }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--clima-accent)";
                e.currentTarget.style.color = "var(--clima-accent)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--clima-border-strong)";
                e.currentTarget.style.color = "var(--clima-text-muted)";
            }}
        >
            {loading ? "Abrindo..." : "Visualizar recibos"}
        </button>
    );
}