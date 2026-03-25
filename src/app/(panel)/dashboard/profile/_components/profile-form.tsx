"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import { ChevronRight } from "lucide-react";
import { updateProfile } from "../_actions/update-profile";
import { updateUserTimes } from "../_actions/update-user-times";
import { EmployeesSection } from "./employees-section";
import { TimePickerModal } from "./time-picker-modal";
import { extractFieldErrors } from "@/lib/schemas";

const profileSchema = z.object({
    name: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
    address: z.string().min(5, "Endereço deve ter ao menos 5 caracteres"),
    phone: z
        .string()
        .min(10, "Telefone inválido")
        .regex(/^[\d\s()\-+]+$/, "Telefone inválido"),
    status: z.enum(["true", "false"]),
    timeZone: z.string().min(1, "Selecione o fuso horário"),
});

type ProfileFields = z.infer<typeof profileSchema>;
type FieldErrors = Partial<Record<keyof ProfileFields, string>>;

const TIMEZONES = [
    { value: "America/Sao_Paulo", label: "Brasília (GMT-3)" },
    { value: "America/Manaus", label: "Manaus (GMT-4)" },
    { value: "America/Belem", label: "Belém (GMT-3)" },
    { value: "America/Fortaleza", label: "Fortaleza (GMT-3)" },
    { value: "America/Recife", label: "Recife (GMT-3)" },
    { value: "America/Cuiaba", label: "Cuiabá (GMT-4)" },
    { value: "America/Porto_Velho", label: "Porto Velho (GMT-4)" },
    { value: "America/Boa_Vista", label: "Boa Vista (GMT-4)" },
    { value: "America/Rio_Branco", label: "Rio Branco (GMT-5)" },
    { value: "America/Noronha", label: "Fernando de Noronha (GMT-2)" },
] as const;

interface Employee {
    id: string;
    name: string;
    times: string[];
}

interface ProfileFormProps {
    user: {
        name?: string | null;
        phone?: string | null;
        address?: string | null;
        status: boolean;
        timeZone?: string | null;
        times: string[];
        employees: Employee[];
    };
    isProfessional: boolean;
}


function pluralize(count: number, singular: string, plural: string): string {
    return count === 1 ? singular : plural;
}

const LABEL_CLASS = "text-[var(--gold)] text-xs tracking-widest uppercase";

const INPUT_CLASS =
    "bg-[var(--surface-low)] border border-[var(--outline-variant)] text-[var(--on-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)] placeholder:text-[var(--on-surface-dim)] transition-colors w-full rounded-lg";

const INPUT_ERROR_CLASS =
    "bg-[var(--surface-low)] border border-red-500 text-[var(--on-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)] placeholder:text-[var(--on-surface-dim)] transition-colors w-full rounded-lg";

const SELECT_CLASS =
    "bg-[var(--surface-low)] border border-[var(--outline-variant)] text-[var(--on-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)] transition-colors cursor-pointer w-full rounded-lg";

export function ProfileForm({ user, isProfessional }: ProfileFormProps) {
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [success, setSuccess] = useState(false);

    const [showTimesModal, setShowTimesModal] = useState(false);
    const [selectedTimes, setSelectedTimes] = useState<string[]>(user.times);
    const [savingTimes, setSavingTimes] = useState(false);

    const toggleTime = useCallback((time: string) => {
        setSelectedTimes((prev) =>
            prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
        );
    }, []);

    const handleSaveTimes = useCallback(async () => {
        setSavingTimes(true);
        await updateUserTimes(selectedTimes);
        setSavingTimes(false);
        setShowTimesModal(false);
    }, [selectedTimes]);

    const validateField = useCallback((field: keyof ProfileFields, value: string) => {
        const shape = profileSchema.shape[field] as z.ZodTypeAny;
        const result = shape.safeParse(value);
        setFieldErrors((prev) => ({
            ...prev,
            [field]: result.success ? undefined : (result.error as z.ZodError).issues[0]?.message,
        }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError("");
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const raw = {
            name: formData.get("name") as string,
            address: formData.get("address") as string,
            phone: formData.get("phone") as string,
            status: formData.get("status") as string,
            timeZone: formData.get("timeZone") as string,
        };

        const validation = profileSchema.safeParse(raw);
        if (!validation.success) {
            setFieldErrors(extractFieldErrors(validation.error));
            return;
        }

        setFieldErrors({});
        setLoading(true);

        const result = await updateProfile(formData);
        if (result?.error) {
            setServerError(result.error);
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
    }, []);

    const timesLabel = selectedTimes.length > 0
        ? `${selectedTimes.length} ${pluralize(selectedTimes.length, "horário selecionado", "horários selecionados")}`
        : "Clique aqui para selecionar horários";

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLASS}>Nome do salão</label>
                    <input
                        name="name"
                        type="text"
                        defaultValue={user.name ?? ""}
                        placeholder="Nome do seu salão"
                        onBlur={(e) => validateField("name", e.target.value)}
                        className={fieldErrors.name ? INPUT_ERROR_CLASS : INPUT_CLASS}
                    />
                    {fieldErrors.name && <p className="text-red-400 text-xs">{fieldErrors.name}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLASS}>Endereço completo</label>
                    <input
                        name="address"
                        type="text"
                        defaultValue={user.address ?? ""}
                        placeholder="Digite o endereço da clínica..."
                        onBlur={(e) => validateField("address", e.target.value)}
                        className={fieldErrors.address ? INPUT_ERROR_CLASS : INPUT_CLASS}
                    />
                    {fieldErrors.address && <p className="text-red-400 text-xs">{fieldErrors.address}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLASS}>Telefone</label>
                    <input
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        defaultValue={user.phone ?? ""}
                        placeholder="Apenas números"
                        onBlur={(e) => validateField("phone", e.target.value)}
                        className={fieldErrors.phone ? INPUT_ERROR_CLASS : INPUT_CLASS}
                    />
                    {fieldErrors.phone && <p className="text-red-400 text-xs">{fieldErrors.phone}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLASS}>Status da clínica</label>
                    <select
                        name="status"
                        defaultValue={user.status ? "true" : "false"}
                        className={SELECT_CLASS}
                    >
                        <option value="true">Ativo (clínica aberta)</option>
                        <option value="false">Inativo (clínica fechada)</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLASS}>Fuso horário</label>
                    <select
                        name="timeZone"
                        defaultValue={user.timeZone ?? "America/Sao_Paulo"}
                        className={SELECT_CLASS}
                    >
                        {TIMEZONES.map((tz) => (
                            <option key={tz.value} value={tz.value}>
                                {tz.label}
                            </option>
                        ))}
                    </select>
                </div>

                {!isProfessional && (
                    <div className="flex flex-col gap-1.5">
                        <label className={LABEL_CLASS}>Configurar horários da clínica</label>
                        <button
                            type="button"
                            onClick={() => setShowTimesModal(true)}
                            className="flex items-center justify-between bg-[var(--surface-low)] border border-[var(--outline-variant)] text-[var(--on-surface-dim)] px-4 py-3 text-sm hover:border-[var(--gold)] hover:text-[var(--on-surface)] transition-colors cursor-pointer w-full text-left rounded-lg"
                        >
                            <span>{timesLabel}</span>
                            <ChevronRight size={16} className="text-[var(--gold)] shrink-0" />
                        </button>
                    </div>
                )}

                {isProfessional && (
                    <EmployeesSection
                        employees={user.employees}
                        isProfessional={isProfessional}
                    />
                )}

                {serverError && <p className="text-red-400 text-xs">{serverError}</p>}
                {success && (
                    <p className="text-[var(--gold)] text-xs tracking-widest uppercase">
                        Perfil atualizado com sucesso!
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3.5 disabled:opacity-50 mt-2 rounded-lg"
                >
                    {loading ? "Salvando..." : "Salvar alterações"}
                </button>
            </form>

            {showTimesModal && (
                <TimePickerModal
                    selectedTimes={selectedTimes}
                    savingTimes={savingTimes}
                    onToggleTime={toggleTime}
                    onSave={handleSaveTimes}
                    onClose={() => setShowTimesModal(false)}
                />
            )}
        </>
    );
}