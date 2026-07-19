"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DialogAppointment } from "./dialog-appointment";
import { parseTime, formatTime } from "@/lib/schedule";
import type { Appointment, Employee as DomainEmployee } from "@/types/domain";

type Employee = Pick<DomainEmployee, "id" | "name" | "times">;

interface AppointmentsListProps {
    appointments: Appointment[];
    times: string[];
    employees: Employee[];
    selectedEmployeeId?: string;
    isProfessional: boolean;
}

type SlotInfo = { appointment: Appointment; isStart: boolean; totalSlots: number };

function buildSlotMap(appointments: Appointment[]): Record<string, SlotInfo> {
    const map: Record<string, SlotInfo> = {};

    for (const apt of appointments) {
        const startMinutes = parseTime(apt.time);
        const totalSlots = Math.ceil(apt.service.duration / 30);

        for (let i = 0; i < totalSlots; i++) {
            const slotTime = formatTime(startMinutes + i * 30);
            map[slotTime] = { appointment: apt, isStart: i === 0, totalSlots };
        }
    }

    return map;
}

export function AppointmentsList({
    appointments,
    times,
    employees,
    selectedEmployeeId,
    isProfessional,
}: AppointmentsListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleEmployeeChange(employeeId: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("employeeId", employeeId);
        router.push(`?${params.toString()}`);
    }

    const sortedTimes = [...times].sort((a, b) => parseTime(a) - parseTime(b));
    const slotMap = useMemo(() => buildSlotMap(appointments), [appointments]);

    return (
        <div className="flex flex-col">
            {isProfessional && employees.length > 0 && (
                <div className="px-4 py-4 sm:px-6" style={{ borderBottom: "1px solid var(--clima-border)" }}>
                    <select
                        value={selectedEmployeeId ?? employees[0]?.id}
                        onChange={(e) => handleEmployeeChange(e.target.value)}
                        aria-label="Selecionar funcionário"
                        className="cursor-pointer rounded-[6px] px-4 py-2.5 text-sm outline-none transition-colors"
                        style={{
                            backgroundColor: "var(--clima-surface)",
                            border: "1px solid var(--clima-border-strong)",
                            color: "var(--clima-text)",
                            fontWeight: 500,
                        }}
                    >
                        {employees.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {sortedTimes.length === 0 ? (
                <p className="py-10 text-center text-sm" style={{ color: "var(--clima-text-muted)" }}>
                    {isProfessional
                        ? "Nenhum horário configurado para este funcionário."
                        : "Nenhum horário configurado. Configure seus horários no perfil."}
                </p>
            ) : (
                sortedTimes.map((time, index) => {
                    const slot = slotMap[time];
                    if (slot && !slot.isStart) return null;
                    const isLast = index === sortedTimes.length - 1;

                    return (
                        <div
                            key={time}
                            className="grid grid-cols-[96px_1fr]"
                            style={{ borderBottom: !isLast ? "1px solid var(--clima-border)" : "none" }}
                        >
                            <div className="flex items-start px-4 py-4 sm:px-6">
                                <span className="font-serif" style={{ fontSize: "19px", color: "var(--clima-text)" }}>
                                    {time}
                                </span>
                            </div>

                            <div className="min-w-0 py-3 pr-4 sm:pr-6">
                                {slot ? (
                                    <div
                                        className="rounded-[6px] p-3 sm:p-4"
                                        style={{
                                            backgroundColor: "var(--clima-accent-soft)",
                                            borderLeft: "3px solid var(--clima-accent)",
                                            minHeight: slot.totalSlots > 1 ? `${slot.totalSlots * 56}px` : "auto",
                                        }}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="min-w-0">
                                                <p
                                                    className="truncate"
                                                    style={{ fontSize: "14.5px", fontWeight: 600, color: "var(--clima-text)" }}
                                                >
                                                    {slot.appointment.name}
                                                </p>
                                                <p
                                                    className="mt-0.5 truncate"
                                                    style={{ fontSize: "13px", color: "var(--clima-text-muted)" }}
                                                >
                                                    {slot.appointment.service.name}
                                                </p>
                                            </div>
                                            <span
                                                className="shrink-0 uppercase"
                                                style={{ fontSize: "10px", letterSpacing: "0.1em", color: "var(--clima-accent)" }}
                                            >
                                                Confirmado
                                            </span>
                                        </div>

                                        <div className="mt-2">
                                            <DialogAppointment appointment={slot.appointment} />
                                        </div>
                                    </div>
                                ) : (
                                    <p
                                        className="py-1 font-serif italic"
                                        style={{ fontSize: "17px", color: "var(--clima-text-subtle)" }}
                                    >
                                        Disponível
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}