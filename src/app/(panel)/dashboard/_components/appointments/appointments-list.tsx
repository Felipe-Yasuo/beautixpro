"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DialogAppointment } from "./dialog-appointment";

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

    const sortedTimes = [...times].sort((a, b) => {
        const [aH, aM] = a.split(":").map(Number);
        const [bH, bM] = b.split(":").map(Number);
        return aH * 60 + aM - (bH * 60 + bM);
    });

    const slotMap: Record<string, { appointment: Appointment; isStart: boolean; totalSlots: number }> = {};

    appointments.forEach((apt) => {
        const [h, m] = apt.time.split(":").map(Number);
        const startMinutes = h * 60 + m;
        const totalSlots = Math.ceil(apt.service.duration / 30);

        for (let i = 0; i < totalSlots; i++) {
            const slotMinutes = startMinutes + i * 30;
            const slotHour = String(Math.floor(slotMinutes / 60)).padStart(2, "0");
            const slotMin = String(slotMinutes % 60).padStart(2, "0");
            slotMap[`${slotHour}:${slotMin}`] = {
                appointment: apt,
                isStart: i === 0,
                totalSlots,
            };
        }
    });

    return (
        <div className="flex flex-col">
            {/* Filtro de funcionário — só PROFESSIONAL */}
            {isProfessional && employees.length > 0 && (
                <div className="px-6 py-4 border-b border-[var(--outline)]">
                    <select
                        value={selectedEmployeeId ?? employees[0]?.id}
                        onChange={(e) => handleEmployeeChange(e.target.value)}
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
                            <div className="w-20 flex-shrink-0 flex items-start pt-4 pl-6">
                                <span className="text-muted-foreground text-sm font-medium">{time}</span>
                            </div>

                            <div className="w-px bg-[var(--outline)] mx-2 self-stretch" />

                            <div className="flex-1 py-3 pr-4">
                                {slot ? (
                                    <div
                                        className="rounded-lg border border-[var(--outline)] bg-gradient-to-r from-[#3a2f0b] to-[var(--surface-lowest)] p-4 flex items-center justify-between"
                                        style={{
                                            minHeight: slot.totalSlots > 1 ? `${slot.totalSlots * 64}px` : "auto",
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                                                <span className="text-primary text-sm font-bold">
                                                    {slot.appointment.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-foreground text-lg font-bold">
                                                    {slot.appointment.name}
                                                </p>
                                                <p className="text-muted-foreground text-md mt-0.5">
                                                    {slot.appointment.service.name}
                                                </p>
                                                {slot.totalSlots > 1 && (
                                                    <p className="text-primary/60 text-sm mt-1 flex items-center gap-1">
                                                        ⏱ Duração: {slot.appointment.service.duration} min
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <DialogAppointment appointment={slot.appointment} />
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground/40 text-sm italic py-3 pl-2">
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