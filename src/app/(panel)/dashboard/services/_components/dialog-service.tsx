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
    trigger: React.ReactNode;
}

export function DialogService({ service, trigger }: DialogServiceProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div onClick={() => setOpen(true)} className="cursor-pointer">
                {trigger}
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-[#0f0f0f] border border-[#c9a84c33] p-8 w-full max-w-md mx-4 z-10">
                        <h2 className="text-xl font-light text-[#f0ead6] mb-6">
                            {service ? "Editar serviço" : "Novo serviço"}
                        </h2>

                        <DialogServiceForm
                            service={service}
                            onClose={() => setOpen(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}