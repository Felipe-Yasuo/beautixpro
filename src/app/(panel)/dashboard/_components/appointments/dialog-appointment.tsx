"use client";

import { useState } from "react";
import { cancelAppointment } from "../../_actions/cancel-appointment";
import { formatBRL } from "@/lib/formatters";

interface Appointment {
    id: string;
    name: string;
    email: string;
    phone: string;
    time: string;
    service: {
        name: string;
        price: number;
        duration: number;
    };
}

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
                className="text-[var(--gold)] text-xs tracking-widest uppercase hover:underline cursor-pointer"
            >
                Ver detalhes
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setOpen(false)}
                    />

                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="dialog-appointment-title"
                        className="relative bg-[var(--surface-lowest)] border border-[var(--outline-variant)] p-8 w-full max-w-md mx-4 z-10"
                    >
                        <h2 id="dialog-appointment-title" className="text-xl font-light text-[var(--on-surface)] mb-6">
                            Detalhes do agendamento
                        </h2>

                        <div className="flex flex-col gap-4">
                            <div className="border-b border-[var(--outline-variant)] pb-4">
                                <p className="text-[var(--gold)] text-xs tracking-widest uppercase mb-3">
                                    Cliente
                                </p>
                                <p className="text-[var(--on-surface)] text-sm">{appointment.name}</p>
                                <p className="text-[var(--on-surface-variant)] text-xs mt-1">{appointment.email}</p>
                                <p className="text-[var(--on-surface-variant)] text-xs mt-1">{appointment.phone}</p>
                            </div>

                            <div className="border-b border-[var(--outline-variant)] pb-4">
                                <p className="text-[var(--gold)] text-xs tracking-widest uppercase mb-3">
                                    Serviço
                                </p>
                                <p className="text-[var(--on-surface)] text-sm">{appointment.service.name}</p>
                                <p className="text-[var(--on-surface-variant)] text-xs mt-1">
                                    {appointment.service.duration} min · R$ {formatBRL(appointment.service.price)}
                                </p>
                            </div>

                            <div>
                                <p className="text-[var(--gold)] text-xs tracking-widest uppercase mb-3">
                                    Horário
                                </p>
                                <p className="text-[var(--on-surface)] text-sm">{appointment.time}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setOpen(false)}
                                className="flex-1 border border-[var(--outline-variant)] text-[var(--on-surface-variant)] py-3 text-xs tracking-widest uppercase hover:border-[var(--gold)] transition-colors cursor-pointer"
                            >
                                Fechar
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={loading}
                                className="flex-1 border border-red-400/30 text-red-400 py-3 text-xs tracking-widest uppercase hover:bg-red-400/10 transition-colors disabled:opacity-50 cursor-pointer"
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