"use client";

import { useState } from "react";
import { X, Clock, ChevronRight, Trash2, UserPlus } from "lucide-react";
import { createEmployee } from "../_actions/create-employee";
import { deleteEmployee } from "../_actions/delete-employee";
import { updateEmployeeTimes } from "../_actions/update-employee-times";
import { ALL_TIMES } from "@/lib/constants";

interface Employee {
    id: string;
    name: string;
    times: string[];
}

interface EmployeesSectionProps {
    employees: Employee[];
    isProfessional: boolean;
}

function pluralize(count: number, singular: string, plural: string): string {
    return count === 1 ? singular : plural;
}

const LABEL_CLASS = "text-[var(--gold)] text-xs xl:text-sm tracking-widest uppercase";

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
                <label className={LABEL_CLASS}>Funcionários</label>
                <div className="bg-[var(--surface-low)] border border-[var(--outline-variant)] rounded-lg px-4 py-3 flex items-center justify-between">
                    <span className="text-[var(--on-surface-dim)] text-sm">
                        Exclusivo do plano Professional
                    </span>
                    <a
                        href="/dashboard/plans"
                        className="text-[var(--gold)] text-xs tracking-widest uppercase hover:underline"
                    >
                        Fazer upgrade →
                    </a>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-3">
                <label className={LABEL_CLASS}>Funcionários</label>

                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Nome do funcionário"
                        className="bg-[var(--surface-low)] border border-[var(--outline-variant)] text-[var(--on-surface)] px-4 py-3 xl:py-3.5 text-sm xl:text-base outline-none focus:border-[var(--gold)] placeholder:text-[var(--on-surface-dim)] transition-colors flex-1 rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={handleCreate}
                        disabled={loading || !newName.trim()}
                        className="btn-primary px-4 py-3 flex items-center justify-center gap-2 disabled:opacity-50 rounded-lg shrink-0"
                    >
                        <UserPlus size={15} />
                        <span>{loading ? "..." : "Adicionar"}</span>
                    </button>
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                {employees.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {employees.map((employee) => (
                            <div
                                key={employee.id}
                                className="bg-[var(--surface-low)] border border-[var(--outline-variant)] rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-full bg-[var(--gold-ghost)] border border-[var(--outline-variant)] flex items-center justify-center shrink-0">
                                        <span className="text-[var(--gold)] text-xs font-semibold">
                                            {employee.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-[var(--on-surface)] text-sm xl:text-base truncate">
                                        {employee.name}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => openTimesModal(employee)}
                                        className="flex items-center gap-1.5 text-[var(--on-surface-dim)] hover:text-[var(--gold)] transition-colors text-xs xl:text-sm cursor-pointer"
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
                                        className="text-[var(--on-surface-dim)] hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        <Trash2 size={14} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {employees.length === 0 && (
                    <p className="text-[var(--on-surface-dim)] text-xs text-center py-4">
                        Nenhum funcionário cadastrado ainda.
                    </p>
                )}
            </div>

            {timesModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setTimesModal(null)}
                    />

                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="employee-times-title"
                        className="relative bg-[var(--surface-low)] border border-[var(--outline-variant)] w-full max-w-lg mx-4 z-10 rounded-xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--gold)]" />

                        <div className="flex items-start justify-between p-6 pb-4">
                            <div>
                                <h2 id="employee-times-title" className="text-2xl font-serif font-bold text-[var(--on-surface)]">
                                    Horários — {timesModal.name}
                                </h2>
                                <p className="text-[var(--on-surface-dim)] text-xs tracking-widest uppercase mt-1">
                                    Selecione os horários de atendimento
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setTimesModal(null)}
                                aria-label="Fechar modal"
                                className="text-[var(--on-surface-dim)] hover:text-[var(--gold)] transition-colors cursor-pointer mt-1"
                            >
                                <X size={18} aria-hidden="true" />
                            </button>
                        </div>

                        <div className="px-6 pb-6">
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                {ALL_TIMES.map((time) => {
                                    const isSelected = selectedTimes.includes(time);
                                    return (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => toggleTime(time)}
                                            className={`py-2.5 text-xs tracking-wide border transition-colors cursor-pointer rounded-lg ${
                                                isSelected
                                                    ? "border-[var(--gold)] bg-[var(--gold-ghost)] text-[var(--gold)]"
                                                    : "border-[var(--outline)] text-[var(--on-surface-dim)] hover:border-[var(--gold)] hover:text-[var(--on-surface-variant)]"
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="border-t border-[var(--outline)] px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[var(--on-surface-dim)]">
                                <Clock size={13} />
                                <span className="text-xs">
                                    {selectedTimes.length} {pluralize(selectedTimes.length, "horário selecionado", "horários selecionados")}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleSaveTimes}
                                disabled={savingTimes}
                                className="btn-primary px-6 py-2.5 cursor-pointer rounded-lg disabled:opacity-50"
                            >
                                {savingTimes ? "Salvando..." : "Confirmar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}