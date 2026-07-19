"use client";

import { Trash2 } from "lucide-react";
import { deleteReminder } from "@/lib/actions/delete-reminder";
import { toast } from "sonner";
import { useState } from "react";
import type { Reminder } from "@/types/domain";

interface ReminderListProps {
    reminders: Reminder[];
}

export function ReminderList({ reminders }: ReminderListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleDelete(id: string) {
        setDeletingId(id);
        const result = await deleteReminder(id);
        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Lembrete removido!");
        }
        setDeletingId(null);
    }

    if (reminders.length === 0) {
        return (
            <p className="py-6 text-center text-sm" style={{ color: "var(--clima-text-subtle)" }}>
                Nenhum lembrete registrado...
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {reminders.map((reminder) => (
                <div
                    key={reminder.id}
                    className="group flex items-center justify-between rounded-[6px] px-4 py-3 transition-colors"
                    style={{ backgroundColor: "var(--clima-accent-soft)" }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: "var(--clima-accent)" }}
                        />
                        <p className="text-sm leading-snug" style={{ color: "var(--clima-text)" }}>
                            {reminder.description}
                        </p>
                    </div>
                    <button
                        onClick={() => handleDelete(reminder.id)}
                        disabled={deletingId === reminder.id}
                        aria-label={`Excluir lembrete: ${reminder.description}`}
                        className="ml-4 cursor-pointer opacity-0 transition-colors group-hover:opacity-100 disabled:opacity-50"
                        style={{ color: "var(--clima-text-subtle)" }}
                    >
                        <Trash2 size={14} aria-hidden="true" />
                    </button>
                </div>
            ))}
        </div>
    );
}