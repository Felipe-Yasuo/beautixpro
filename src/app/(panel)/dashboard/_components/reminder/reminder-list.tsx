"use client";

import { Trash2 } from "lucide-react";
import { deleteReminder } from "../../_actions/delete-reminder";
import { toast } from "sonner";
import { useState } from "react";

interface Reminder {
    id: string;
    description: string;
}

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
            <p className="text-muted-foreground/50 text-sm text-center py-6">
                Nenhum lembrete registrado...
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {reminders.map((reminder) => (
                <div
                    key={reminder.id}
                    className="flex items-center justify-between bg-[var(--surface-low)] border border-[var(--outline)] rounded-lg px-4 py-3 group hover:border-primary/30 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <p className="text-sm text-foreground leading-snug">{reminder.description}</p>
                    </div>
                    <button
                        onClick={() => handleDelete(reminder.id)}
                        disabled={deletingId === reminder.id}
                        aria-label={`Excluir lembrete: ${reminder.description}`}
                        className="text-muted-foreground/30 hover:text-destructive transition-colors disabled:opacity-50 cursor-pointer ml-4 opacity-0 group-hover:opacity-100"
                    >
                        <Trash2 size={14} aria-hidden="true" />
                    </button>
                </div>
            ))}
        </div>
    );
}