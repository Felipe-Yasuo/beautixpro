"use client";

import { useState, useRef } from "react";
import { z } from "zod";
import { createReminder } from "../../_actions/create-reminder";
import { toast } from "sonner";

const reminderSchema = z.object({
    description: z.string().min(1, "Digite um lembrete"),
});

export function ReminderForm() {
    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    function validateDescription(value: string) {
        const result = reminderSchema.shape.description.safeParse(value);
        setFieldError(result.success ? "" : result.error.issues[0]?.message ?? "");
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const validation = reminderSchema.safeParse({
            description: formData.get("description") as string,
        });

        if (!validation.success) {
            setFieldError(validation.error.issues[0]?.message ?? "");
            return;
        }

        setFieldError("");
        setLoading(true);

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
        <div className="flex flex-col gap-1">
            <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2">
                <input
                    name="description"
                    type="text"
                    placeholder="Novo lembrete..."
                    onBlur={(e) => validateDescription(e.target.value)}
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
            {fieldError && <p className="text-red-400 text-xs">{fieldError}</p>}
        </div>
    );
}