import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface DateStepProps {
    selectedDate: Date | null;
    onDateChange: (date: Date) => void;
}

// Gera os próximos 8 dias a partir de hoje
function nextDays(count: number): Date[] {
    const days: Date[] = [];
    const base = new Date();
    base.setHours(0, 0, 0, 0);
    for (let i = 0; i < count; i++) {
        const d = new Date(base);
        d.setDate(base.getDate() + i);
        days.push(d);
    }
    return days;
}

export function DateStep({ selectedDate, onDateChange }: DateStepProps) {
    const days = nextDays(8);

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {days.map((day) => {
                const isSelected =
                    selectedDate &&
                    selectedDate.getDate() === day.getDate() &&
                    selectedDate.getMonth() === day.getMonth();

                return (
                    <button
                        key={day.toISOString()}
                        type="button"
                        onClick={() => onDateChange(day)}
                        className="flex flex-col items-center gap-1 rounded-[12px] py-4 transition-colors"
                        style={
                            isSelected
                                ? { backgroundColor: "var(--clima-accent-soft)", border: "1px solid var(--clima-accent)" }
                                : { backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }
                        }
                    >
                        <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--clima-text-muted)" }}>
                            {format(day, "EEE", { locale: ptBR })}
                        </span>
                        <span className="font-serif" style={{ fontSize: "26px", color: "var(--clima-text)" }}>
                            {format(day, "dd")}
                        </span>
                        <span className="text-[11px] capitalize" style={{ color: "var(--clima-text-muted)" }}>
                            {format(day, "MMM", { locale: ptBR })}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}