"use client";

import { useState, useRef } from "react";
import { z } from "zod";
import { createReminder } from "@/lib/actions/create-reminder";
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
                    aria-label="Descrição do lembrete"
                    onBlur={(e) => validateDescription(e.target.value)}
                    className="flex-1 rounded-[6px] px-4 py-2.5 text-sm outline-none transition-colors"
                    style={{
                        backgroundColor: "var(--clima-surface)",
                        border: "1px solid var(--clima-border-strong)",
                        color: "var(--clima-text)",
                    }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    aria-label="Adicionar lembrete"
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[6px] text-lg font-bold text-white transition-colors disabled:opacity-50"
                    style={{ backgroundColor: "var(--clima-accent)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--clima-accent-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--clima-accent)")}
                >
                    <span aria-hidden="true">{loading ? "·" : "+"}</span>
                </button>
            </form>
            {fieldError && <p className="text-xs text-red-500">{fieldError}</p>}
        </div>
    );
}