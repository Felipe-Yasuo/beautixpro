"use client";

import { useState, useRef } from "react";
import { createReminder } from "../../_actions/create-reminder";
import { toast } from "sonner";

export function ReminderForm() {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await createReminder(formData);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Lembrete criado!");
            formRef.current?.reset();
        }

        setLoading(false);
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input
                name="description"
                type="text"
                placeholder="Adicionar lembrete..."
                required
                className="flex-1 border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer"
            >
                {loading ? "..." : "+"}
            </button>
        </form>
    );
}