"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function ButtonDate() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dateParam = searchParams.get("date");
    const selected = dateParam ? new Date(dateParam + "T00:00:00") : new Date();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) return;
        router.push(`/dashboard?date=${e.target.value}`);
    }

    const formatted = `${selected.getFullYear()}-${String(selected.getMonth() + 1).padStart(2, "0")}-${String(selected.getDate()).padStart(2, "0")}`;

    return (
        <input
            type="date"
            value={formatted}
            onChange={handleChange}
            className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-2 text-sm outline-none focus:border-[#c9a84c] transition-colors cursor-pointer [color-scheme:dark]"
        />
    );
}