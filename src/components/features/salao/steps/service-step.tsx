import { formatBRL } from "@/lib/formatters";
import type { AggregatedService } from "@/hooks/use-schedule-form";

function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    const hoursPart = hours > 0 ? `${hours}h ` : "";
    const minutesPart = remainder > 0 ? `${remainder}min` : "";
    return `${hoursPart}${minutesPart}`.trim();
}

interface ServiceStepProps {
    services: AggregatedService[];
    selectedKey: string | null;
    onSelect: (key: string) => void;
}

export function ServiceStep({ services, selectedKey, onSelect }: ServiceStepProps) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((svc) => {
                const isSelected = selectedKey === svc.key;
                return (
                    <button
                        key={svc.key}
                        type="button"
                        onClick={() => onSelect(svc.key)}
                        className="flex items-center justify-between gap-3 rounded-[12px] p-4 text-left transition-colors"
                        style={
                            isSelected
                                ? { backgroundColor: "var(--clima-accent-soft)", border: "1px solid var(--clima-accent)" }
                                : { backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }
                        }
                    >
                        <div>
                            <p className="font-serif" style={{ fontSize: "18px", color: "var(--clima-text)" }}>
                                {svc.name}
                            </p>
                            <p className="mt-1 text-[13px]">
                                <span style={{ color: "var(--clima-accent)", fontWeight: 600 }}>R$ {formatBRL(svc.price)}</span>
                                <span style={{ color: "var(--clima-text-muted)" }}> · {formatDuration(svc.duration)}</span>
                            </p>
                        </div>
                        <RadioDot selected={isSelected} />
                    </button>
                );
            })}
        </div>
    );
}

function RadioDot({ selected }: { selected: boolean }) {
    return (
        <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
            style={{
                border: `1px solid ${selected ? "var(--clima-accent)" : "var(--clima-border-strong)"}`,
                backgroundColor: selected ? "var(--clima-accent)" : "transparent",
            }}
        >
            {selected && <span className="text-[11px] text-white">✓</span>}
        </span>
    );
}