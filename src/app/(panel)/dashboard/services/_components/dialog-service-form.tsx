"use client";

import { useState } from "react";
import { z } from "zod";
import { createService } from "../_actions/create-service";
import { updateService } from "../_actions/update-service";

const serviceSchema = z.object({
    name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    price: z
        .string()
        .min(1, "Informe o valor")
        .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Valor inválido"),
    hours: z
        .string()
        .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Horas inválidas"),
    minutes: z
        .string()
        .refine((v) => !isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 59, "Minutos inválidos"),
});

type ServiceFields = z.infer<typeof serviceSchema>;
type FieldErrors = Partial<Record<keyof ServiceFields, string>>;

interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
    status: boolean;
}

interface DialogServiceFormProps {
    service?: Service;
    employeeId?: string;
    onClose: () => void;
}

function extractFieldErrors(error: z.ZodError<ServiceFields>): FieldErrors {
    const errors: FieldErrors = {};
    for (const issue of error.issues) {
        const field = issue.path[0] as keyof ServiceFields;
        errors[field] ??= issue.message;
    }
    return errors;
}

const LABEL_CLASS = "text-[var(--gold)] text-xs tracking-widest uppercase";

const INPUT_CLASS =
    "bg-[var(--surface-high)] border border-[var(--outline-variant)] text-[var(--on-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)] placeholder:text-[var(--on-surface-dim)] transition-colors w-full";

const INPUT_ERROR_CLASS =
    "bg-[var(--surface-high)] border border-red-500 text-[var(--on-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)] placeholder:text-[var(--on-surface-dim)] transition-colors w-full";

const SELECT_CLASS =
    "bg-[var(--surface-lowest)] border border-[var(--outline-variant)] text-[var(--on-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)] transition-colors cursor-pointer w-full";

export function DialogServiceForm({ service, employeeId, onClose }: DialogServiceFormProps) {
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const isEditing = !!service;
    const defaultHours = service ? Math.floor(service.duration / 60) : 0;
    const defaultMinutes = service ? service.duration % 60 : 30;

    function validateField(field: keyof ServiceFields, value: string) {
        const shape = serviceSchema.shape[field] as z.ZodTypeAny;
        const result = shape.safeParse(value);
        setFieldErrors((prev) => ({
            ...prev,
            [field]: result.success ? undefined : (result.error as z.ZodError).issues[0]?.message,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setServerError("");

        const formData = new FormData(e.currentTarget);
        const raw = {
            name: formData.get("name") as string,
            price: formData.get("price") as string,
            hours: formData.get("hours") as string,
            minutes: formData.get("minutes") as string,
        };

        const validation = serviceSchema.safeParse(raw);
        if (!validation.success) {
            setFieldErrors(extractFieldErrors(validation.error));
            return;
        }

        setFieldErrors({});
        setLoading(true);

        const hours = Number(raw.hours);
        const minutes = Number(raw.minutes);
        formData.set("duration", String(hours * 60 + minutes));
        formData.delete("hours");
        formData.delete("minutes");

        const result = isEditing
            ? await updateService(formData)
            : await createService(formData);

        if (result?.error) {
            setServerError(result.error);
            setLoading(false);
            return;
        }

        onClose();
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {service && <input type="hidden" name="id" value={service.id} />}
            <input type="hidden" name="employeeId" value={employeeId ?? ""} />

            <div className="flex flex-col gap-1.5">
                <label className={LABEL_CLASS}>Nome do serviço</label>
                <input
                    name="name"
                    type="text"
                    defaultValue={service?.name}
                    placeholder="Ex: Corte feminino"
                    onBlur={(e) => validateField("name", e.target.value)}
                    className={fieldErrors.name ? INPUT_ERROR_CLASS : INPUT_CLASS}
                />
                {fieldErrors.name && <p className="text-red-400 text-xs">{fieldErrors.name}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
                <label className={LABEL_CLASS}>Valor do serviço (R$)</label>
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={service ? (service.price / 100).toFixed(2) : ""}
                    placeholder="Ex: 120,00"
                    onBlur={(e) => validateField("price", e.target.value)}
                    className={fieldErrors.price ? INPUT_ERROR_CLASS : INPUT_CLASS}
                />
                {fieldErrors.price && <p className="text-red-400 text-xs">{fieldErrors.price}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
                <label className={LABEL_CLASS}>Tempo de duração do serviço</label>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                        <span className="text-[var(--on-surface-dim)] text-xs">Horas</span>
                        <input
                            name="hours"
                            type="number"
                            min="0"
                            max="23"
                            defaultValue={defaultHours}
                            onBlur={(e) => validateField("hours", e.target.value)}
                            className={fieldErrors.hours ? INPUT_ERROR_CLASS : INPUT_CLASS}
                        />
                        {fieldErrors.hours && <p className="text-red-400 text-xs">{fieldErrors.hours}</p>}
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <span className="text-[var(--on-surface-dim)] text-xs">Minutos</span>
                        <input
                            name="minutes"
                            type="number"
                            min="0"
                            max="59"
                            defaultValue={defaultMinutes}
                            onBlur={(e) => validateField("minutes", e.target.value)}
                            className={fieldErrors.minutes ? INPUT_ERROR_CLASS : INPUT_CLASS}
                        />
                        {fieldErrors.minutes && <p className="text-red-400 text-xs">{fieldErrors.minutes}</p>}
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLASS}>Status</label>
                    <select
                        name="status"
                        defaultValue={service.status ? "true" : "false"}
                        className={SELECT_CLASS}
                    >
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                    </select>
                </div>
            )}

            {serverError && <p className="text-red-400 text-xs">{serverError}</p>}

            <div className="flex flex-col gap-2 mt-1">
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3.5 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Salvando..." : isEditing ? "Salvar serviço" : "Cadastrar serviço"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full border border-[var(--outline-variant)] text-[var(--on-surface-dim)] py-3 text-xs tracking-widest uppercase hover:text-[var(--on-surface-variant)] hover:border-[var(--outline)] transition-colors cursor-pointer"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}