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
            <p className="text-muted-foreground text-sm text-center py-8">
                Nenhum lembrete registrado...
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-2 mt-4">
            {reminders.map((reminder) => (
                <div
                    key={reminder.id}
                    className="flex items-center justify-between border border-border rounded-md px-4 py-3 bg-background"
                >
                    <p className="text-sm text-foreground">{reminder.description}</p>
                    <button
                        onClick={() => handleDelete(reminder.id)}
                        disabled={deletingId === reminder.id}
                        className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50 cursor-pointer ml-4"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            ))}
        </div>
    );
}