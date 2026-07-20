"use client";

import { useScheduleForm } from "@/hooks/use-schedule-form";
import { useAvailableSlots } from "@/hooks/use-available-slots";
import type { Employee } from "@/hooks/use-schedule-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ScheduleWizard } from "./schedule-wizard";

interface ScheduleReservationProps {
    user: { id: string; employees: Employee[] };
}

export function ScheduleReservation({ user }: ScheduleReservationProps) {
    const form = useScheduleForm({ user });
    const { bookedTimes } = useAvailableSlots({
        employeeId: form.selectedEmployee?.id ?? null,
        selectedDate: form.selectedDate,
        serviceDuration: form.selectedService?.duration ?? 0,
    });

    const summary = [
        { label: "Serviço", value: form.selectedService?.name },
        { label: "Data", value: form.selectedDate ? format(form.selectedDate, "EEE dd/MMM", { locale: ptBR }) : undefined },
        { label: "Profissional", value: form.selectedEmployee?.name },
        { label: "Horário", value: form.selectedTime },
    ];

    return (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
                <div className="sticky top-12">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-6" style={{ backgroundColor: "var(--clima-accent)" }} />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--clima-accent)" }}>
                            Sua reserva
                        </span>
                    </div>
                    <h2 className="mt-4 font-serif font-normal" style={{ fontSize: "clamp(32px, 3.4vw, 44px)", lineHeight: 1.1, color: "var(--clima-text)" }}>
                        Cada detalhe,
                        <br />
                        escolhido por você.
                    </h2>
                    <p className="mt-6 max-w-sm text-sm leading-relaxed" style={{ color: "var(--clima-text-muted)" }}>
                        Preencha as etapas ao lado para reservar seu horário. A confirmação
                        chega assim que o salão aprovar.
                    </p>

                    {!form.success && (
                        <div
                            className="mt-8 flex flex-col rounded-[10px] overflow-hidden"
                            style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
                        >
                            {summary.map((row, i) => (
                                <div
                                    key={row.label}
                                    className="flex items-center justify-between px-5 py-4"
                                    style={{ borderTop: i === 0 ? "none" : "1px solid var(--clima-border)" }}
                                >
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--clima-text-subtle)" }}>
                                        {row.label}
                                    </span>
                                    <span className="text-[14px]" style={{ color: row.value ? "var(--clima-text)" : "var(--clima-text-subtle)" }}>
                                        {row.value ?? "—"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </aside>

            <div className="lg:col-span-8">
                <ScheduleWizard form={form} bookedTimes={bookedTimes} user={user} />
            </div>
        </div>
    );
}