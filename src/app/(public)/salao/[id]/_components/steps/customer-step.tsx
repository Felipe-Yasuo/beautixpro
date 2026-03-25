import type { FieldErrors } from "../../_hooks/useScheduleForm";

const INPUT_CLASS =
    "w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors";

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
        <>
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Nome completo:</label>
                <input
                    type="text"
                    placeholder="Digite seu nome completo..."
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    onBlur={(e) => onValidateField("name", e.target.value)}
                    className={INPUT_CLASS}
                />
                {fieldErrors.name && <p className="text-destructive text-xs">{fieldErrors.name}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Email:</label>
                <input
                    type="email"
                    placeholder="Digite seu email..."
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    onBlur={(e) => onValidateField("email", e.target.value)}
                    className={INPUT_CLASS}
                />
                {fieldErrors.email && <p className="text-destructive text-xs">{fieldErrors.email}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Telefone:</label>
                <input
                    type="tel"
                    placeholder="(XX) XXXXX-XXXX"
                    value={phone}
                    onChange={(e) => onPhoneChange(e.target.value)}
                    onBlur={(e) => onValidateField("phone", e.target.value)}
                    className={INPUT_CLASS}
                />
                {fieldErrors.phone && <p className="text-destructive text-xs">{fieldErrors.phone}</p>}
            </div>
        </>
    );
}
