"use client";

import { useState } from "react";
import { Pencil, Trash2, Scissors, Sparkles, Leaf, Brush } from "lucide-react";
import { DialogService } from "./dialog-service";
import { deleteService } from "@/lib/actions/delete-service";
import { formatBRL } from "@/lib/formatters";
import type { Service, Employee as DomainEmployee } from "@/types/domain";

type Employee = Pick<DomainEmployee, "id" | "name">;

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
    const activeEmployeeId = isProfessional ? selectedEmployeeId : undefined;

    async function handleDelete(id: string) {
        setDeletingId(id);
        await deleteService(id);
        setDeletingId(null);
    }

    function UpgradeLink() {
        return (
            <a href="/dashboard/plans" className="btn-service-new">
                Fazer upgrade
            </a>
        );
    }

    function NewServiceButton({ employeeId }: { employeeId?: string }) {
        return (
            <DialogService
                employeeId={employeeId}
                trigger={<button className="btn-service-new">+ Novo serviço</button>}
            />
        );
    }

    const canCreate = isProfessional ? !!selectedEmployee : true;

    return (
        <div className="flex flex-col gap-6 sm:gap-8" style={{ padding: "34px 40px 48px" }}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1
                        className="font-serif font-normal"
                        style={{ fontSize: "clamp(36px, 4vw, 46px)", color: "var(--clima-text)" }}
                    >
                        Serviços
                    </h1>
                    <p className="mt-2 max-w-sm text-[15px] leading-relaxed" style={{ color: "var(--clima-text-muted)" }}>
                        Gerencie o catálogo do seu ateliê. Defina preços, durações e a
                        disponibilidade de cada experiência.
                    </p>
                </div>

                {!atLimit && canCreate && <NewServiceButton employeeId={activeEmployeeId} />}
                {atLimit && <UpgradeLink />}
            </div>

            {/* Filtro + contador */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {isProfessional && employees.length > 0 && (
                    <select
                        value={selectedEmployeeId}
                        onChange={(e) => {
                            setSelectedEmployeeId(e.target.value);
                            setPage(0);
                        }}
                        aria-label="Filtrar por funcionário"
                        className="cursor-pointer rounded-[6px] px-4 py-2.5 text-[14px] outline-none transition-colors"
                        style={{
                            backgroundColor: "var(--clima-surface)",
                            border: "1px solid var(--clima-border-strong)",
                            color: "var(--clima-text)",
                        }}
                    >
                        {employees.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                )}

                <span className="text-[13px] sm:ml-auto" style={{ color: "var(--clima-text-muted)" }}>
                    {filtered.length} {filtered.length === 1 ? "serviço cadastrado" : "serviços cadastrados"}
                </span>
            </div>

            {/* Lista */}
            {filtered.length === 0 ? (
                <p
                    className="py-20 text-center text-xs uppercase tracking-widest"
                    style={{ color: "var(--clima-text-subtle)" }}
                >
                    {isProfessional && employees.length === 0
                        ? "Cadastre um funcionário no perfil primeiro."
                        : "Nenhum serviço cadastrado ainda."}
                </p>
            ) : (
                <div
                    className="flex flex-col overflow-hidden rounded-[10px]"
                    style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
                >
                    {paginated.map((service, i) => {
                        const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                        return (
                            <div
                                key={service.id}
                                className="last:border-b-0"
                                style={{ borderBottom: "1px solid var(--clima-border)" }}
                            >
                                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] items-center gap-3 px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px]"
                                            style={{ backgroundColor: "var(--clima-accent-soft)" }}
                                        >
                                            <Icon size={18} style={{ color: "var(--clima-accent)" }} />
                                        </div>
                                        <div>
                                            <p className="font-serif" style={{ fontSize: "19px", color: "var(--clima-text)" }}>
                                                {service.name}
                                            </p>
                                            <p className="font-serif" style={{ fontSize: "15px", color: "var(--clima-accent)" }}>
                                                R$ {formatBRL(service.price)}
                                            </p>
                                        </div>
                                    </div>

                                    <span style={{ fontSize: "13.5px", color: "var(--clima-text-muted)" }}>
                                        {service.duration} min
                                    </span>

                                    <div>
                                        <span
                                            className="flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-widest"
                                            style={
                                                service.status
                                                    ? { backgroundColor: "rgba(31,138,91,0.12)", color: "#1f8a5b" }
                                                    : { backgroundColor: "var(--clima-surface-2)", color: "var(--clima-text-subtle)" }
                                            }
                                        >
                                            <span
                                                className="h-1.5 w-1.5 rounded-full"
                                                style={{ backgroundColor: service.status ? "#1f8a5b" : "var(--clima-text-subtle)" }}
                                            />
                                            {service.status ? "Ativo" : "Inativo"}
                                        </span>
                                    </div>

                                    <div />

                                    <div className="flex items-center justify-end gap-1">
                                        <DialogService
                                            service={service}
                                            employeeId={service.employee.id}
                                            trigger={
                                                <button
                                                    aria-label={`Editar serviço ${service.name}`}
                                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[6px] transition-colors"
                                                    style={{ color: "var(--clima-text-muted)" }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--clima-surface-2)")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                                >
                                                    <Pencil size={14} aria-hidden="true" />
                                                </button>
                                            }
                                        />
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            disabled={deletingId === service.id}
                                            aria-label={`Excluir serviço ${service.name}`}
                                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[6px] transition-colors disabled:opacity-50"
                                            style={{ color: "var(--clima-text-muted)" }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = "var(--clima-accent-soft)";
                                                e.currentTarget.style.color = "var(--clima-accent)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "transparent";
                                                e.currentTarget.style.color = "var(--clima-text-muted)";
                                            }}
                                        >
                                            <Trash2 size={14} aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div
                        className="flex items-center justify-between px-6 py-4"
                        style={{ backgroundColor: "var(--clima-surface)" }}
                    >
                        <span
                            className="text-[11px] uppercase tracking-widest"
                            style={{ color: "var(--clima-text-muted)" }}
                        >
                            Exibindo {paginated.length} de {filtered.length} serviços
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                disabled={page === 0}
                                aria-label="Página anterior"
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[6px] text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-30"
                                style={{ border: "1px solid var(--clima-border-strong)", color: "var(--clima-text-muted)" }}
                                onMouseEnter={(e) => {
                                    if (page === 0) return;
                                    e.currentTarget.style.backgroundColor = "var(--clima-accent-soft)";
                                    e.currentTarget.style.borderColor = "var(--clima-accent)";
                                    e.currentTarget.style.color = "var(--clima-accent)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.borderColor = "var(--clima-border-strong)";
                                    e.currentTarget.style.color = "var(--clima-text-muted)";
                                }}
                            >
                                <span aria-hidden="true">‹</span>
                            </button>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                disabled={page >= totalPages - 1}
                                aria-label="Próxima página"
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[6px] text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-30"
                                style={{ backgroundColor: "var(--clima-accent-soft)", color: "var(--clima-accent)" }}
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