// services-list.tsx
"use client";

import { useState } from "react";
import { Pencil, Trash2, Scissors, Sparkles, Leaf, Brush } from "lucide-react";
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

const SERVICE_ICONS = [Scissors, Sparkles, Leaf, Brush];

const PAGE_SIZE = 4;

export function ServicesList({ services }: ServicesListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [page, setPage] = useState(0);

    const totalPages = Math.ceil(services.length / PAGE_SIZE);
    const paginated = services.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

    async function handleDelete(id: string) {
        setDeletingId(id);
        await deleteService(id);
        setDeletingId(null);
    }

    if (services.length === 0) {
        return (
            <p className="text-[var(--on-surface-dim)] text-xs tracking-widest uppercase text-center py-20">
                Nenhum serviço cadastrado ainda.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-0 border border-[var(--outline)] bg-[var(--surface-low)]">
            {/* Cabeçalho da tabela */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] px-6 py-4 border-b border-[var(--outline)]">
                <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)]">
                    Nome do Serviço
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)]">
                    Duração
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)]">
                    Status
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)]">
                    Preço
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)] text-right">
                    Ações
                </span>
            </div>

            {/* Linhas */}
            {paginated.map((service, i) => {
                const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];

                return (
                    <div
                        key={service.id}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] px-6 py-5 border-b border-[var(--outline)] last:border-b-0 hover:bg-[var(--surface-low)] transition-colors items-center"
                    >
                        {/* Nome + ícone */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#1f1a0e] border border-[var(--outline-variant)] flex items-center justify-center shrink-0">
                                <Icon size={16} className="text-[var(--gold)]" />
                            </div>
                            <span className="text-[var(--on-surface)] text-sm font-medium">
                                {service.name}
                            </span>
                        </div>

                        {/* Duração */}
                        <span className="text-[var(--on-surface-variant)] text-sm">
                            {service.duration} min
                        </span>

                        {/* Status */}
                        <div>
                            <span
                                className={`text-[10px] tracking-widest uppercase px-3 py-1 flex items-center gap-1.5 w-fit ${service.status
                                    ? "bg-[#c9a84c22] text-[var(--gold)] border border-[#c9a84c44]"
                                    : "bg-[#ffffff08] text-[var(--on-surface-dim)] border border-[#ffffff15]"
                                    }`}
                            >
                                <span
                                    className={`w-1.5 h-1.5 rounded-full ${service.status ? "bg-[var(--gold)]" : "bg-[var(--on-surface-dim)]"
                                        }`}
                                />
                                {service.status ? "Ativo" : "Inativo"}
                            </span>
                        </div>

                        {/* Preço */}
                        <div>
                            <span className="text-[var(--on-surface-variant)] text-xs">R$</span>
                            <span className="text-[var(--gold)] font-semibold ml-1">
                                {(service.price / 100).toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        {/* Ações */}
                        <div className="flex items-center gap-3 justify-end">
                            <DialogService
                                service={service}
                                trigger={
                                    <button className="text-[var(--on-surface-dim)] hover:text-[var(--gold)] transition-colors cursor-pointer">
                                        <Pencil size={14} />
                                    </button>
                                }
                            />
                            <button
                                onClick={() => handleDelete(service.id)}
                                disabled={deletingId === service.id}
                                className="text-[var(--on-surface-dim)] hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Rodapé com paginação */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--outline)]">
                <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)]">
                    Exibindo {paginated.length} de {services.length} serviços
                </span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="w-8 h-8 border border-[var(--outline)] flex items-center justify-center text-[var(--on-surface-dim)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-sm"
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={page >= totalPages - 1}
                        className="w-8 h-8 bg-[var(--gold)] flex items-center justify-center text-black hover:bg-[var(--gold-hover)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-sm"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}