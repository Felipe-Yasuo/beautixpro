"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
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
                <button className="flex items-center gap-2 border border-border rounded-md px-4 py-2 text-sm text-foreground hover:border-primary transition-colors cursor-pointer bg-card">
                    <CalendarIcon size={14} className="text-muted-foreground" />
                    {format(selected, "dd/MM/yyyy", { locale: ptBR })}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={handleSelect}
                    locale={ptBR}
                />
            </PopoverContent>
        </Popover>
    );
}