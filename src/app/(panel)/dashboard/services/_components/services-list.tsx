"use client";

import { useState } from "react";
import { Pencil, Trash2, Scissors, Sparkles, Leaf, Brush } from "lucide-react";
import { DialogService } from "./dialog-service";
import { deleteService } from "../_actions/delete-service";
import { formatBRL } from "@/lib/formatters";

interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
    status: boolean;
    employee: { id: string; name: string };
}

interface Employee {
    id: string;
    name: string;
}

interface ServicesListProps {
    services: Service[];
    employees: Employee[];
    isProfessional: boolean;
    atLimit: boolean;
}

const SERVICE_ICONS = [Scissors, Sparkles, Leaf, Brush] as const;
const PAGE_SIZE = 4;


export function ServicesList({ services, employees, isProfessional, atLimit }: ServicesListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(
        employees[0]?.id ?? ""
    );

    const filtered = isProfessional && selectedEmployeeId
        ? services.filter((s) => s.employee.id === selectedEmployeeId)
        : services;

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
    const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId);

    async function handleDelete(id: string) {
        setDeletingId(id);
        await deleteService(id);
        setDeletingId(null);
    }

    function UpgradeLink() {
        return (
            <a href="/dashboard/plans" className="btn-primary text-[10px] px-4 py-2.5">
                Fazer upgrade
            </a>
        );
    }

    function NewServiceButton({ employeeId }: { employeeId?: string }) {
        return (
            <DialogService
                employeeId={employeeId}
                trigger={
                    <button className="btn-primary flex items-center gap-2 text-sm px-4 py-2.5">
                        + Novo Serviço
                    </button>
                }
            />
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {isProfessional && (
                <div className="flex items-center justify-between gap-4">
                    <select
                        value={selectedEmployeeId}
                        onChange={(e) => {
                            setSelectedEmployeeId(e.target.value);
                            setPage(0);
                        }}
                        aria-label="Filtrar por funcionário"
                        className="bg-[var(--surface-low)] border border-[var(--outline-variant)] text-[var(--on-surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--gold)] transition-colors cursor-pointer rounded-lg"
                    >
                        {employees.length === 0 && (
                            <option value="">Nenhum funcionário cadastrado</option>
                        )}
                        {employees.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>

                    {!atLimit && selectedEmployee && <NewServiceButton employeeId={selectedEmployeeId} />}
                    {atLimit && <UpgradeLink />}
                </div>
            )}

            {!isProfessional && (
                <div className="flex justify-end">
                    {!atLimit ? <NewServiceButton /> : <UpgradeLink />}
                </div>
            )}

            {filtered.length === 0 ? (
                <p className="text-[var(--on-surface-dim)] text-xs tracking-widest uppercase text-center py-20">
                    {isProfessional && employees.length === 0
                        ? "Cadastre um funcionário no perfil primeiro."
                        : "Nenhum serviço cadastrado ainda."}
                </p>
            ) : (
                <div className="flex flex-col gap-0 border border-[var(--outline)] bg-[var(--surface-low)]">
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] px-6 py-4 border-b border-[var(--outline)]">
                        <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)]">Nome do Serviço</span>
                        <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)]">Duração</span>
                        <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)]">Status</span>
                        <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)]">Preço</span>
                        <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)] text-right">Ações</span>
                    </div>

                    {paginated.map((service, i) => {
                        const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                        return (
                            <div
                                key={service.id}
                                className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] px-6 py-5 border-b border-[var(--outline)] last:border-b-0 hover:bg-[var(--surface-high)] transition-colors items-center"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#1f1a0e] border border-[var(--outline-variant)] flex items-center justify-center shrink-0">
                                        <Icon size={16} className="text-[var(--gold)]" />
                                    </div>
                                    <span className="text-[var(--on-surface)] text-sm font-medium">
                                        {service.name}
                                    </span>
                                </div>

                                <span className="text-[var(--on-surface-variant)] text-sm">
                                    {service.duration} min
                                </span>

                                <div>
                                    <span className={`text-[10px] tracking-widest uppercase px-3 py-1 flex items-center gap-1.5 w-fit ${
                                        service.status
                                            ? "bg-[#c9a84c22] text-[var(--gold)] border border-[#c9a84c44]"
                                            : "bg-[#ffffff08] text-[var(--on-surface-dim)] border border-[#ffffff15]"
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${service.status ? "bg-[var(--gold)]" : "bg-[var(--on-surface-dim)]"}`} />
                                        {service.status ? "Ativo" : "Inativo"}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-[var(--on-surface-variant)] text-xs">R$</span>
                                    <span className="text-[var(--gold)] font-semibold ml-1">
                                        {formatBRL(service.price)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 justify-end">
                                    <DialogService
                                        service={service}
                                        employeeId={service.employee.id}
                                        trigger={
                                            <button
                                                aria-label={`Editar serviço ${service.name}`}
                                                className="text-[var(--on-surface-dim)] hover:text-[var(--gold)] transition-colors cursor-pointer"
                                            >
                                                <Pencil size={14} aria-hidden="true" />
                                            </button>
                                        }
                                    />
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        disabled={deletingId === service.id}
                                        aria-label={`Excluir serviço ${service.name}`}
                                        className="text-[var(--on-surface-dim)] hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        <Trash2 size={14} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--outline)]">
                        <span className="text-[10px] tracking-widest uppercase text-[var(--on-surface)]">
                            Exibindo {paginated.length} de {filtered.length} serviços
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                disabled={page === 0}
                                aria-label="Página anterior"
                                className="w-8 h-8 border border-[var(--outline)] flex items-center justify-center text-[var(--on-surface-dim)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-sm"
                            >
                                <span aria-hidden="true">‹</span>
                            </button>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                disabled={page >= totalPages - 1}
                                aria-label="Próxima página"
                                className="w-8 h-8 bg-[var(--gold)] flex items-center justify-center text-black hover:bg-[var(--gold-hover)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-sm"
                            >
                                <span aria-hidden="true">›</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}