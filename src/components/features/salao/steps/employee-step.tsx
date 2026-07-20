import type { Employee } from "@/hooks/use-schedule-form";

interface EmployeeStepProps {
    employees: Employee[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export function EmployeeStep({ employees, selectedId, onSelect }: EmployeeStepProps) {
    return (
        <div className="flex flex-col gap-3">
            {employees.map((emp) => {
                const isSelected = selectedId === emp.id;
                return (
                    <button
                        key={emp.id}
                        type="button"
                        onClick={() => onSelect(emp.id)}
                        className="flex items-center justify-between gap-3 rounded-[12px] p-4 text-left transition-colors"
                        style={
                            isSelected
                                ? { backgroundColor: "var(--clima-accent-soft)", border: "1px solid var(--clima-accent)" }
                                : { backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }
                        }
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif"
                                style={{ backgroundColor: "var(--clima-accent-soft)", color: "var(--clima-accent)", fontSize: "14px" }}
                            >
                                {emp.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-serif" style={{ fontSize: "17px", color: "var(--clima-text)" }}>
                                    {emp.name}
                                </p>
                                <p className="text-[13px]" style={{ color: "var(--clima-text-muted)" }}>
                                    Profissional
                                </p>
                            </div>
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