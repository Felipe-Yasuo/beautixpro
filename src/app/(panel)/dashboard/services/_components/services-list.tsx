"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { DialogService } from "./dialog-service";
import { deleteService } from "../_actions/delete-service";

interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
    status: boolean;
}

interface ServicesListProps {
    services: Service[];
}

export function ServicesList({ services }: ServicesListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleDelete(id: string) {
        setDeletingId(id);
        await deleteService(id);
        setDeletingId(null);
    }

    if (services.length === 0) {
        return (
            <p className="text-[#3a3028] text-xs tracking-widest uppercase text-center py-20">
                Nenhum serviço cadastrado ainda.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {services.map((service) => (
                <div
                    key={service.id}
                    className="flex items-center justify-between border border-[#c9a84c22] px-6 py-4 hover:border-[#c9a84c44] transition-colors"
                >
                    <div className="flex items-center gap-6">
                        <div>
                            <p className="text-[#f0ead6] text-sm">{service.name}</p>
                            <p className="text-[#3a3028] text-xs mt-0.5">
                                {service.duration} min
                            </p>
                        </div>
                        <span
                            className={`text-[10px] tracking-widest uppercase px-2 py-0.5 border ${service.status
                                    ? "text-[#c9a84c] border-[#c9a84c33]"
                                    : "text-[#3a3028] border-[#3a302833]"
                                }`}
                        >
                            {service.status ? "Ativo" : "Inativo"}
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <p className="text-[#c9a84c] text-sm">
                            R$ {(service.price / 100).toFixed(2)}
                        </p>

                        <div className="flex items-center gap-3">
                            <DialogService
                                service={service}
                                trigger={
                                    <button className="text-[#5a5045] hover:text-[#c9a84c] transition-colors cursor-pointer">
                                        <Pencil size={15} />
                                    </button>
                                }
                            />

                            <button
                                onClick={() => handleDelete(service.id)}
                                disabled={deletingId === service.id}
                                className="text-[#5a5045] hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}