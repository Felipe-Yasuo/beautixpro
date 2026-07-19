"use client";

import { useState } from "react";
import { Clock, ChevronRight, Trash2, UserPlus } from "lucide-react";
import { createEmployee } from "@/lib/actions/create-employee";
import { deleteEmployee } from "@/lib/actions/delete-employee";
import { updateEmployeeTimes } from "@/lib/actions/update-employee-times";
import { TimePickerModal } from "./time-picker-modal";
import type { Employee as DomainEmployee } from "@/types/domain";

type Employee = Pick<DomainEmployee, "id" | "name" | "times">;

interface EmployeesSectionProps {
    employees: Employee[];
    isProfessional: boolean;
}

function pluralize(count: number, singular: string, plural: string): string {
    return count === 1 ? singular : plural;
}

const LABEL_CLASS = "text-[11px] font-semibold uppercase tracking-[0.16em]";

export function EmployeesSection({ employees, isProfessional }: EmployeesSectionProps) {
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [newName, setNewName] = useState("");
    const [timesModal, setTimesModal] = useState<Employee | null>(null);
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [savingTimes, setSavingTimes] = useState(false);

    function openTimesModal(employee: Employee) {
        setTimesModal(employee);
        setSelectedTimes(employee.times);
    }

    function toggleTime(time: string) {
        setSelectedTimes((prev) =>
            prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
        );
    }

    async function handleSaveTimes() {
        if (!timesModal) return;
        setSavingTimes(true);
        await updateEmployeeTimes(timesModal.id, selectedTimes);
        setSavingTimes(false);
        setTimesModal(null);
    }

    async function handleCreate() {
        setError("");
        setLoading(true);

        const formData = new FormData();
        formData.append("name", newName);
        const result = await createEmployee(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
            return;
        }

        setNewName("");
        setLoading(false);
    }

    async function handleDelete(id: string) {
        setDeletingId(id);
        await deleteEmployee(id);
        setDeletingId(null);
    }

    if (!isProfessional) {
        return (
            <div className="flex flex-col gap-1.5">
                <label className={LABEL_CLASS} style={{ color: "var(--clima-text-muted)" }}>Funcionários</label>
                <div
                    className="flex items-center justify-between rounded-[6px] px-4 py-3"
                    style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border-strong)" }}
                >
                    <span className="text-sm" style={{ color: "var(--clima-text-subtle)" }}>
                        Exclusivo do plano Professional
                    </span>
                    <a href="/dashboard/plans" className="text-xs uppercase tracking-widest hover:underline" style={{ color: "var(--clima-accent)" }}>
                        Fazer upgrade →
                    </a>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-3">
                <label className={LABEL_CLASS} style={{ color: "var(--clima-text-muted)" }}>Funcionários</label>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Nome do funcionário"
                        className="flex-1 rounded-[6px] px-4 py-3 text-[15px] outline-none transition-colors"
                        style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border-strong)", color: "var(--clima-text)" }}
                    />
                    <button
                        type="button"
                        onClick={handleCreate}
                        disabled={loading || !newName.trim()}
                        className="btn-profile-save flex shrink-0 items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <UserPlus size={14} />
                        <span>{loading ? "..." : "Adicionar"}</span>
                    </button>
                </div>

                {error && <p className="text-xs text-red-500">{error}</p>}

                {employees.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {employees.map((employee) => (
                            <div
                                key={employee.id}
                                className="flex flex-col gap-3 rounded-[6px] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <div
                                        className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full"
                                        style={{ backgroundColor: "var(--clima-accent-soft)" }}
                                    >
                                        <span className="font-serif" style={{ fontSize: "14px", color: "var(--clima-accent)" }}>
                                            {employee.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="truncate text-[14.5px]" style={{ color: "var(--clima-text)" }}>
                                        {employee.name}
                                    </span>
                                </div>

                                <div className="flex shrink-0 items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => openTimesModal(employee)}
                                        className="flex cursor-pointer items-center gap-1.5 rounded-[4px] px-2 py-1 text-[13px] transition-colors"
                                        style={{ color: "var(--clima-text-muted)" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--clima-surface-2)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                    >
                                        <Clock size={13} />
                                        <span className="whitespace-nowrap">
                                            {employee.times.length > 0
                                                ? `${employee.times.length} ${pluralize(employee.times.length, "horário", "horários")}`
                                                : "Definir horários"}
                                        </span>
                                        <ChevronRight size={13} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(employee.id)}
                                        disabled={deletingId === employee.id}
                                        aria-label={`Excluir funcionário ${employee.name}`}
                                        className="cursor-pointer transition-colors disabled:opacity-50"
                                        style={{ color: "var(--clima-text-subtle)" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--clima-accent)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--clima-text-subtle)")}
                                    >
                                        <Trash2 size={14} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {employees.length === 0 && (
                    <p className="py-4 text-center text-xs" style={{ color: "var(--clima-text-subtle)" }}>
                        Nenhum funcionário cadastrado ainda.
                    </p>
                )}
            </div>

            {timesModal && (
                <TimePickerModal
                    title={`Horários — ${timesModal.name}`}
                    selectedTimes={selectedTimes}
                    savingTimes={savingTimes}
                    onToggleTime={toggleTime}
                    onSave={handleSaveTimes}
                    onClose={() => setTimesModal(null)}
                />
            )}
        </>
    );
}