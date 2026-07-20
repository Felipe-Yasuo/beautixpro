import type { FieldErrors } from "@/hooks/use-schedule-form";

interface CustomerStepProps {
    name: string;
    email: string;
    phone: string;
    fieldErrors: FieldErrors;
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
    onValidateField: (field: "name" | "email" | "phone", value: string) => void;
}

const LABEL = "text-[10px] font-semibold uppercase tracking-[0.16em]";

function boxStyle(hasError?: boolean): React.CSSProperties {
    return {
        backgroundColor: "var(--clima-surface)",
        border: `1px solid ${hasError ? "#ef4444" : "var(--clima-border-strong)"}`,
        color: "var(--clima-text)",
    };
}

export function CustomerStep({
    name,
    email,
    phone,
    fieldErrors,
    onNameChange,
    onEmailChange,
    onPhoneChange,
    onValidateField,
}: CustomerStepProps) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className={LABEL} style={{ color: "var(--clima-text-muted)" }}>Nome completo</span>
                <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    onBlur={(e) => onValidateField("name", e.target.value)}
                    className="rounded-[8px] px-4 py-3 text-sm outline-none"
                    style={boxStyle(!!fieldErrors.name)}
                />
                {fieldErrors.name && <p className="text-xs text-red-500">{fieldErrors.name}</p>}
            </label>

            <label className="flex flex-col gap-1.5">
                <span className={LABEL} style={{ color: "var(--clima-text-muted)" }}>E-mail</span>
                <input
                    type="email"
                    placeholder="voce@email.com"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    onBlur={(e) => onValidateField("email", e.target.value)}
                    className="rounded-[8px] px-4 py-3 text-sm outline-none"
                    style={boxStyle(!!fieldErrors.email)}
                />
                {fieldErrors.email && <p className="text-xs text-red-500">{fieldErrors.email}</p>}
            </label>

            <label className="flex flex-col gap-1.5">
                <span className={LABEL} style={{ color: "var(--clima-text-muted)" }}>Telefone</span>
                <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => onPhoneChange(e.target.value)}
                    onBlur={(e) => onValidateField("phone", e.target.value)}
                    className="rounded-[8px] px-4 py-3 text-sm outline-none"
                    style={boxStyle(!!fieldErrors.phone)}
                />
                {fieldErrors.phone && <p className="text-xs text-red-500">{fieldErrors.phone}</p>}
            </label>

            <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className={LABEL} style={{ color: "var(--clima-text-muted)" }}>Observações (opcional)</span>
                <textarea
                    placeholder="Alguma preferência ou observação?"
                    rows={3}
                    className="resize-none rounded-[8px] px-4 py-3 text-sm outline-none"
                    style={boxStyle()}
                />
            </label>
        </div>
    );
}