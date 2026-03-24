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
        <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2">
            <input
                name="description"
                type="text"
                placeholder="Novo lembrete..."
                required
                className="flex-1 bg-[var(--surface-low)] border border-[var(--outline)] rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-primary text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
            >
                {loading ? "·" : "+"}
            </button>
        </form>
    );
}