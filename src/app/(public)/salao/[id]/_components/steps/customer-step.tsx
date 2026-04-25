import type { FieldErrors } from "../../_hooks/useScheduleForm";

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
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <Field
                className="sm:col-span-2"
                label="Nome completo"
                placeholder="Como devemos chamá-lo(a)"
                type="text"
                value={name}
                onChange={onNameChange}
                onBlur={(v) => onValidateField("name", v)}
                error={fieldErrors.name}
            />
            <Field
                label="E-mail"
                placeholder="seu@email.com"
                type="email"
                value={email}
                onChange={onEmailChange}
                onBlur={(v) => onValidateField("email", v)}
                error={fieldErrors.email}
            />
            <Field
                label="Telefone"
                placeholder="(00) 00000-0000"
                type="tel"
                value={phone}
                onChange={onPhoneChange}
                onBlur={(v) => onValidateField("phone", v)}
                error={fieldErrors.phone}
            />
        </div>
    );
}

interface FieldProps {
    label: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (v: string) => void;
    onBlur: (v: string) => void;
    error?: string;
    className?: string;
}

function Field({ label, placeholder, type, value, onChange, onBlur, error, className }: FieldProps) {
    return (
        <label className={`flex flex-col ${className ?? ""}`}>
            <span className="label-overline mb-2">{label}</span>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={(e) => onBlur(e.target.value)}
                className="input-underline font-serif text-base"
            />
            {error && (
                <p className="mt-2 font-serif text-xs italic text-destructive">{error}</p>
            )}
        </label>
    );
}
