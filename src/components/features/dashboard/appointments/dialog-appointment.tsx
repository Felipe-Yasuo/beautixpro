"use client";

import { useState } from "react";
import { cancelAppointment } from "@/lib/actions/cancel-appointment";
import { formatBRL } from "@/lib/formatters";
import type { Appointment as DomainAppointment } from "@/types/domain";

type Appointment = Pick<DomainAppointment, "id" | "name" | "email" | "phone" | "time" | "service">;

interface DialogAppointmentProps {
    appointment: Appointment;
}

export function DialogAppointment({ appointment }: DialogAppointmentProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleCancel() {
        setLoading(true);
        await cancelAppointment(appointment.id);
        setLoading(false);
        setOpen(false);
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="cursor-pointer text-xs uppercase tracking-widest hover:underline"
                style={{ color: "var(--clima-accent)" }}
            >
                Ver detalhes
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />

                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="dialog-appointment-title"
                        className="relative z-10 mx-4 w-full max-w-md rounded-[10px] p-8 shadow-2xl"
                        style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
                    >
                        <h2
                            id="dialog-appointment-title"
                            className="font-serif font-normal"
                            style={{ fontSize: "24px", color: "var(--clima-text)", marginBottom: "24px" }}
                        >
                            Detalhes do agendamento
                        </h2>

                        <div className="flex flex-col gap-4">
                            <div className="pb-4" style={{ borderBottom: "1px solid var(--clima-border)" }}>
                                <p
                                    className="mb-2 text-xs uppercase tracking-widest"
                                    style={{ color: "var(--clima-accent)" }}
                                >
                                    Cliente
                                </p>
                                <p className="text-sm" style={{ color: "var(--clima-text)" }}>{appointment.name}</p>
                                <p className="mt-1 text-xs" style={{ color: "var(--clima-text-muted)" }}>{appointment.email}</p>
                                <p className="mt-1 text-xs" style={{ color: "var(--clima-text-muted)" }}>{appointment.phone}</p>
                            </div>

                            <div className="pb-4" style={{ borderBottom: "1px solid var(--clima-border)" }}>
                                <p
                                    className="mb-2 text-xs uppercase tracking-widest"
                                    style={{ color: "var(--clima-accent)" }}
                                >
                                    Serviço
                                </p>
                                <p className="text-sm" style={{ color: "var(--clima-text)" }}>{appointment.service.name}</p>
                                <p className="mt-1 text-xs" style={{ color: "var(--clima-text-muted)" }}>
                                    {appointment.service.duration} min · R$ {formatBRL(appointment.service.price)}
                                </p>
                            </div>

                            <div>
                                <p
                                    className="mb-2 text-xs uppercase tracking-widest"
                                    style={{ color: "var(--clima-accent)" }}
                                >
                                    Horário
                                </p>
                                <p className="font-serif" style={{ fontSize: "19px", color: "var(--clima-text)" }}>
                                    {appointment.time}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="flex-1 cursor-pointer rounded-[6px] py-3 text-xs uppercase tracking-widest transition-colors"
                                style={{ border: "1px solid var(--clima-border-strong)", color: "var(--clima-text-muted)" }}
                            >
                                Fechar
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={loading}
                                className="flex-1 cursor-pointer rounded-[6px] py-3 text-xs uppercase tracking-widest text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                                style={{ border: "1px solid rgba(239,68,68,0.3)" }}
                            >
                                {loading ? "Cancelando..." : "Cancelar agendamento"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}