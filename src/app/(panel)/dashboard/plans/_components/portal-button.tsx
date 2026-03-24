// _components/portal-button.tsx
"use client";

import { useState } from "react";
import { createPortalCustomer } from "../_actions/create-portal-customer";

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
            className="border border-[#c9a84c44] text-[#c9a84c] text-[10px] tracking-widest uppercase px-4 py-2.5 hover:bg-[#c9a84c15] transition-colors cursor-pointer disabled:opacity-50 rounded-lg shrink-0"
        >
            {loading ? "Abrindo..." : "Visualizar Recibos"}
        </button>
    );
}