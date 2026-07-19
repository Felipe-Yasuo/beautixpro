"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function ButtonDate() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dateParam = searchParams.get("date");
    const selected = dateParam ? new Date(dateParam + "T00:00:00") : new Date();

    function handleSelect(date: Date | undefined) {
        if (!date) return;
        const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        router.push(`/dashboard?date=${formatted}`);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className="flex cursor-pointer items-center gap-2 rounded-[6px] px-4 py-2.5 text-sm transition-colors"
                    style={{
                        backgroundColor: "var(--clima-surface)",
                        border: "1px solid var(--clima-border-strong)",
                        color: "var(--clima-text)",
                    }}
                >
                    <CalendarIcon size={14} style={{ color: "var(--clima-accent)" }} />
                    <span>{format(selected, "dd, 'de' MMMM", { locale: ptBR })}</span>
                    <ChevronDown size={14} style={{ color: "var(--clima-text-muted)" }} />
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto p-0"
                style={{ backgroundColor: "var(--clima-surface)", borderColor: "var(--clima-border)" }}
                align="end"
            >
                <Calendar mode="single" selected={selected} onSelect={handleSelect} locale={ptBR} />
            </PopoverContent>
        </Popover>
    );
}