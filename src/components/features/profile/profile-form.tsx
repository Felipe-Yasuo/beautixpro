"use client";

import { useState, useCallback, useRef } from "react";
import { z } from "zod";
import { ChevronRight, Clock } from "lucide-react";
import { updateProfile } from "@/lib/actions/update-profile";
import { updateUserTimes } from "@/lib/actions/update-user-times";
import { EmployeesSection } from "./employees-section";
import { TimePickerModal } from "./time-picker-modal";
import { extractFieldErrors } from "@/lib/validations/utils";
import { profileSchema } from "@/lib/validations/profile";
import type { Employee as DomainEmployee } from "@/types/domain";

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

type Employee = Pick<DomainEmployee, "id" | "name" | "times">;

interface ProfileFormProps {
    user: {
        name?: string | null;
        phone?: string | null;
        address?: string | null;
        addressNumber?: string | null;
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

const LABEL_CLASS = "text-[11px] font-semibold uppercase tracking-[0.16em]";

function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const ddd = digits.slice(0, 2);
    const part1 = digits.length > 10 ? digits.slice(2, 7) : digits.slice(2, 6);
    const part2 = digits.length > 10 ? digits.slice(7) : digits.slice(6);

    if (!digits) return "";
    if (digits.length <= 2) return `(${ddd}`;
    if (digits.length <= 6) return `(${ddd}) ${digits.slice(2)}`;
    return `(${ddd}) ${part1}-${part2}`;
}

function fieldStyle(hasError?: boolean): React.CSSProperties {
    return {
        backgroundColor: "var(--clima-surface)",
        border: `1px solid ${hasError ? "#ef4444" : "var(--clima-border-strong)"}`,
        color: "var(--clima-text)",
        fontSize: "15px",
    };
}

export function ProfileForm({ user, isProfessional }: ProfileFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [success, setSuccess] = useState(false);
    const [phone, setPhone] = useState(formatPhone(user.phone ?? ""));

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
            addressNumber: formData.get("addressNumber") as string,
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

    function handleCancel() {
        formRef.current?.reset();
        setPhone(formatPhone(user.phone ?? ""));
        setSelectedTimes(user.times);
        setFieldErrors({});
        setServerError("");
        setSuccess(false);
    }

    const timesLabel = selectedTimes.length > 0
        ? `${selectedTimes.length} ${pluralize(selectedTimes.length, "horário selecionado", "horários selecionados")}`
        : "Clique aqui para selecionar horários";

    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLASS} style={{ color: "var(--clima-text-muted)" }}>Nome do salão</label>
                    <input
                        name="name"
                        type="text"
                        defaultValue={user.name ?? ""}
                        placeholder="Nome do seu salão"
                        onBlur={(e) => validateField("name", e.target.value)}
                        className="w-full rounded-[6px] px-4 py-3 outline-none transition-colors"
                        style={fieldStyle(!!fieldErrors.name)}
                    />
                    {fieldErrors.name && <p className="text-xs text-red-500">{fieldErrors.name}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLASS} style={{ color: "var(--clima-text-muted)" }}>Endereço completo</label>
                    <input
                        name="address"
                        type="text"
                        defaultValue={user.address ?? ""}
                        placeholder="Digite o endereço do ateliê..."
                        onBlur={(e) => validateField("address", e.target.value)}
                        className="w-full rounded-[6px] px-4 py-3 outline-none transition-colors"
                        style={fieldStyle(!!fieldErrors.address)}
                    />
                    {fieldErrors.address && <p className="text-xs text-red-500">{fieldErrors.address}</p>}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                        <label className={LABEL_CLASS} style={{ color: "var(--clima-text-muted)" }}>Número</label>
                        <input
                            name="addressNumber"
                            type="text"
                            inputMode="numeric"
                            defaultValue={user.addressNumber ?? ""}
                            placeholder="Ex: 123, S/N"
                            onBlur={(e) => validateField("addressNumber", e.target.value)}
                            className="w-full rounded-[6px] px-4 py-3 outline-none transition-colors"
                            style={fieldStyle(!!fieldErrors.addressNumber)}
                        />
                        {fieldErrors.addressNumber && <p className="text-xs text-red-500">{fieldErrors.addressNumber}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className={LABEL_CLASS} style={{ color: "var(--clima-text-muted)" }}>Telefone</label>
                        <input
                            name="phone"
                            type="tel"
                            inputMode="numeric"
                            value={phone}
                            onChange={(e) => setPhone(formatPhone(e.target.value))}
                            placeholder="(43) 99800-8265"
                            onBlur={(e) => validateField("phone", e.target.value)}
                            className="w-full rounded-[6px] px-4 py-3 outline-none transition-colors"
                            style={fieldStyle(!!fieldErrors.phone)}
                        />
                        {fieldErrors.phone && <p className="text-xs text-red-500">{fieldErrors.phone}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                        <label className={LABEL_CLASS} style={{ color: "var(--clima-text-muted)" }}>Status do salão</label>
                        <select
                            name="status"
                            defaultValue={user.status ? "true" : "false"}
                            className="w-full cursor-pointer rounded-[6px] px-4 py-3 outline-none transition-colors"
                            style={fieldStyle()}
                        >
                            <option value="true">Ativo (salão aberto)</option>
                            <option value="false">Inativo (salão fechado)</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className={LABEL_CLASS} style={{ color: "var(--clima-text-muted)" }}>Fuso horário</label>
                        <select
                            name="timeZone"
                            defaultValue={user.timeZone ?? "America/Sao_Paulo"}
                            className="w-full cursor-pointer rounded-[6px] px-4 py-3 outline-none transition-colors"
                            style={fieldStyle()}
                        >
                            {TIMEZONES.map((tz) => (
                                <option key={tz.value} value={tz.value}>{tz.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={{ borderTop: "1px solid var(--clima-border)", paddingTop: "20px" }} />

                {!isProfessional && (
                    <div className="flex flex-col gap-1.5">
                        <label className={LABEL_CLASS} style={{ color: "var(--clima-text-muted)" }}>
                            Configurar horários do salão
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowTimesModal(true)}
                            className="flex w-full cursor-pointer items-center justify-between rounded-[6px] px-4 py-3 text-left text-sm transition-colors"
                            style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border-strong)", color: "var(--clima-text-muted)" }}
                        >
                            <span className="flex items-center gap-2">
                                <Clock size={14} />
                                {timesLabel}
                            </span>
                            <ChevronRight size={16} style={{ color: "var(--clima-accent)" }} className="shrink-0" />
                        </button>
                    </div>
                )}

                {isProfessional && (
                    <EmployeesSection employees={user.employees} isProfessional={isProfessional} />
                )}

                {serverError && <p className="text-xs text-red-500">{serverError}</p>}
                {success && (
                    <p className="text-xs uppercase tracking-widest" style={{ color: "var(--clima-accent)" }}>
                        Perfil atualizado com sucesso!
                    </p>
                )}

                <div className="mt-2 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="cursor-pointer rounded-[6px] px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-colors"
                        style={{ border: "1px solid var(--clima-border-strong)", color: "var(--clima-text-muted)" }}
                    >
                        Cancelar
                    </button>
                    <button type="submit" disabled={loading} className="btn-profile-save">
                        {loading ? "Salvando..." : "Salvar alterações"}
                    </button>
                </div>
            </form>

            {showTimesModal && (
                <TimePickerModal
                    title="Horários do salão"
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