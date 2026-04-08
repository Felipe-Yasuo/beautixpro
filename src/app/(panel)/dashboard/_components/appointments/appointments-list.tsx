"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DialogAppointment } from "./dialog-appointment";
import { parseTime, formatTime } from "@/lib/schedule";

interface Appointment {
    id: string;
    name: string;
    email: string;
    phone: string;
    time: string;
    service: { name: string; price: number; duration: number };
    employee: { id: string; name: string };
}

interface Employee {
    id: string;
    name: string;
    times: string[];
}

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

    const sortedTimes = [...times].sort(
        (a, b) => parseTime(a) - parseTime(b)
    );

    const slotMap = useMemo(() => buildSlotMap(appointments), [appointments]);

    return (
        <div className="flex flex-col">
            {isProfessional && employees.length > 0 && (
                <div className="px-4 sm:px-6 py-4 border-b border-[var(--outline)]">
                    <select
                        value={selectedEmployeeId ?? employees[0]?.id}
                        onChange={(e) => handleEmployeeChange(e.target.value)}
                        aria-label="Selecionar funcionário"
                        className="bg-[var(--surface-high)] border border-[var(--outline-variant)] text-[var(--on-surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--gold)] transition-colors cursor-pointer rounded-lg"
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
                <p className="text-muted-foreground text-sm text-center py-10">
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
                            className={`flex gap-0 ${!isLast ? "border-b border-[var(--outline)]" : ""}`}
                        >
                            <div className="w-14 sm:w-20 xl:w-24 2xl:w-28 shrink-0 flex items-start pt-4 pl-3 sm:pl-6">
                                <span className="text-muted-foreground text-xs sm:text-sm xl:text-base 2xl:text-lg font-medium">{time}</span>
                            </div>

                            <div className="w-px bg-[var(--outline)] mx-1 sm:mx-2 self-stretch" />

                            <div className="flex-1 py-3 pr-3 sm:pr-4 min-w-0">
                                {slot ? (
                                    <div
                                        className="rounded-lg border border-[var(--outline)] bg-linear-to-r from-[#3a2f0b] to-[var(--surface-lowest)] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                                        style={{
                                            minHeight: slot.totalSlots > 1 ? `${slot.totalSlots * 64}px` : "auto",
                                        }}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                                                <span className="text-primary text-xs sm:text-sm 2xl:text-base font-bold">
                                                    {slot.appointment.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-foreground text-sm sm:text-lg xl:text-xl 2xl:text-2xl font-bold truncate">
                                                    {slot.appointment.name}
                                                </p>
                                                <p className="text-muted-foreground text-xs sm:text-base xl:text-lg 2xl:text-xl mt-0.5 truncate">
                                                    {slot.appointment.service.name}
                                                </p>
                                                {slot.totalSlots > 1 && (
                                                    <p className="text-primary/60 text-xs sm:text-sm xl:text-base 2xl:text-lg mt-1 flex items-center gap-1">
                                                        ⏱ Duração: {slot.appointment.service.duration} min
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="shrink-0 self-end sm:self-center">
                                            <DialogAppointment appointment={slot.appointment} />
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground/40 text-xs sm:text-sm xl:text-base 2xl:text-lg italic py-3 pl-2">
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