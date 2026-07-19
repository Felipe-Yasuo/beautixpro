"use client";

import { X, Clock } from "lucide-react";
import { ALL_TIMES } from "@/lib/constants";

function pluralize(count: number, singular: string, plural: string): string {
    return count === 1 ? singular : plural;
}

interface TimePickerModalProps {
    title: string;
    selectedTimes: string[];
    savingTimes: boolean;
    onToggleTime: (time: string) => void;
    onSave: () => void;
    onClose: () => void;
}

export function TimePickerModal({
    title,
    selectedTimes,
    savingTimes,
    onToggleTime,
    onSave,
    onClose,
}: TimePickerModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="time-picker-title"
                className="relative z-10 mx-4 w-full max-w-lg overflow-hidden rounded-[10px] shadow-2xl"
                style={{ backgroundColor: "var(--bxp-bg)", border: "1px solid var(--clima-border-strong)" }}
            >
                <div className="flex items-start justify-between p-6 pb-4">
                    <div>
                        <h2 id="time-picker-title" className="font-serif font-normal" style={{ fontSize: "24px", color: "var(--clima-text)" }}>
                            {title}
                        </h2>
                        <p className="mt-1 text-[10.5px] uppercase tracking-widest" style={{ color: "var(--clima-text-muted)" }}>
                            Selecione os horários de atendimento
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar modal"
                        className="mt-1 cursor-pointer transition-colors"
                        style={{ color: "var(--clima-text-muted)" }}
                    >
                        <X size={18} aria-hidden="true" />
                    </button>
                </div>

                <div className="px-6 pb-6">
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {ALL_TIMES.map((time) => {
                            const isSelected = selectedTimes.includes(time);
                            return (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => onToggleTime(time)}
                                    className="cursor-pointer rounded-[6px] py-2.5 text-[13px] font-semibold tracking-wide transition-colors"
                                    style={
                                        isSelected
                                            ? { backgroundColor: "var(--clima-accent-soft)", border: "1px solid var(--clima-accent)", color: "var(--clima-accent)" }
                                            : { backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)", color: "var(--clima-text-muted)" }
                                    }
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div
                    className="flex items-center justify-between px-6 py-4"
                    style={{ borderTop: "1px solid var(--clima-border)" }}
                >
                    <div className="flex items-center gap-2" style={{ color: "var(--clima-text-muted)" }}>
                        <Clock size={13} />
                        <span className="text-xs">
                            {selectedTimes.length} {pluralize(selectedTimes.length, "horário selecionado", "horários selecionados")}
                        </span>
                    </div>
                    <button type="button" onClick={onSave} disabled={savingTimes} className="btn-profile-save">
                        {savingTimes ? "Salvando..." : "Confirmar"}
                    </button>
                </div>
            </div>
        </div>
    );
}