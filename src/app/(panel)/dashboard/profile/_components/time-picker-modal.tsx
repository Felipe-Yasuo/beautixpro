"use client";

import { X, Clock } from "lucide-react";
import { ALL_TIMES } from "@/lib/constants";

function pluralize(count: number, singular: string, plural: string): string {
    return count === 1 ? singular : plural;
}

interface TimePickerModalProps {
    selectedTimes: string[];
    savingTimes: boolean;
    onToggleTime: (time: string) => void;
    onSave: () => void;
    onClose: () => void;
}

export function TimePickerModal({
    selectedTimes,
    savingTimes,
    onToggleTime,
    onSave,
    onClose,
}: TimePickerModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="time-picker-title"
                className="relative bg-[var(--surface-low)] border border-[var(--outline-variant)] w-full max-w-lg mx-4 z-10 rounded-xl overflow-hidden"
            >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--gold)]" />

                <div className="flex items-start justify-between p-6 pb-4">
                    <div>
                        <h2 id="time-picker-title" className="text-2xl font-serif font-bold text-[var(--on-surface)]">
                            Horários da clínica
                        </h2>
                        <p className="text-[var(--on-surface-dim)] text-xs tracking-widest uppercase mt-1">
                            Selecione os horários de atendimento
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar modal"
                        className="text-[var(--on-surface-dim)] hover:text-[var(--gold)] transition-colors cursor-pointer mt-1"
                    >
                        <X size={18} aria-hidden="true" />
                    </button>
                </div>

                <div className="px-6 pb-6">
                    <div className="grid grid-cols-5 gap-2">
                        {ALL_TIMES.map((time) => {
                            const isSelected = selectedTimes.includes(time);
                            return (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => onToggleTime(time)}
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
                        onClick={onSave}
                        disabled={savingTimes}
                        className="btn-primary px-6 py-2.5 cursor-pointer rounded-lg disabled:opacity-50"
                    >
                        {savingTimes ? "Salvando..." : "Confirmar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
