"use client";

import { useState } from "react";
import { DialogServiceForm } from "./dialog-service-form";

interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
    status: boolean;
}

interface DialogServiceProps {
    service?: Service;
    employeeId?: string;
    trigger: React.ReactNode;
}

export function DialogService({ service, employeeId, trigger }: DialogServiceProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div onClick={() => setOpen(true)} className="cursor-pointer">
                {trigger}
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="dialog-service-title"
                        className="relative bg-[var(--surface-lowest)] border border-[var(--outline-variant)] p-8 w-full max-w-md mx-4 z-10"
                    >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#c9a84c]" />

                        <h2 id="dialog-service-title" className="text-2xl font-serif font-bold text-[var(--on-surface)] mb-1">
                            {service ? "Editar serviço" : "Novo serviço"}
                        </h2>
                        <p className="text-[var(--on-surface-dim)] text-xs tracking-widest uppercase mb-6">
                            {service ? "Atualize os detalhes" : "Preencha os detalhes"}
                        </p>

                        <DialogServiceForm
                            service={service}
                            employeeId={employeeId}
                            onClose={() => setOpen(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}