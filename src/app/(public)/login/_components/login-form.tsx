"use client";

import { useState } from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { register } from "../_actions/register";

const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
});

const registerSchema = loginSchema.extend({
    name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
});

type FieldErrors = Partial<Record<string, string>>;

const INPUT_CLASS =
    "bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors";

function extractErrors(error: z.ZodError): FieldErrors {
    const errors: FieldErrors = {};
    for (const issue of error.issues) {
        const field = String(issue.path[0]);
        errors[field] ??= issue.message;
    }
    return errors;
}

export function LoginForm() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const isRegister = mode === "register";
    const schema = isRegister ? registerSchema : loginSchema;

    function validateField(field: string, value: string) {
        const fieldSchema = (schema.shape as Record<string, z.ZodTypeAny>)[field];
        if (!fieldSchema) return;
        const result = fieldSchema.safeParse(value);
        setFieldErrors((prev) => ({
            ...prev,
            [field]: result.success ? undefined : result.error.issues[0]?.message,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setServerError("");

        const formData = new FormData(e.currentTarget);
        const raw: Record<string, string> = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
        if (isRegister) raw.name = formData.get("name") as string;

        const validation = schema.safeParse(raw);
        if (!validation.success) {
            setFieldErrors(extractErrors(validation.error));
            return;
        }

        setFieldErrors({});
        setLoading(true);

        if (isRegister) {
            const result = await register(formData);
            if (result?.error) {
                setServerError(result.error);
                setLoading(false);
                return;
            }
        }

        const res = await signIn("credentials", {
            email: raw.email,
            password: raw.password,
            redirect: false,
        });

        if (res?.error) {
            setServerError("E-mail ou senha inválidos.");
            setLoading(false);
            return;
        }

        router.push("/dashboard");
    }

    async function handleGoogle() {
        await signIn("google", { callbackUrl: "/dashboard" });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
            <div className="border border-[#c9a84c33] p-10 flex flex-col items-center gap-8 w-full max-w-md">
                <div className="text-center">
                    <h1 className="font-serif text-4xl text-[#c9a84c]">BeautixPro</h1>
                    <p className="text-[#5a5045] text-sm mt-2 tracking-widest uppercase">
                        Área do profissional
                    </p>
                </div>

                <div className="flex w-full border border-[#c9a84c33]">
                    <button
                        onClick={() => setMode("login")}
                        className={`flex-1 py-2 text-xs tracking-widest uppercase transition-colors cursor-pointer ${
                            mode === "login"
                                ? "bg-[#c9a84c] text-black"
                                : "text-[#5a5045] hover:text-[#c9a84c]"
                        }`}
                    >
                        Entrar
                    </button>
                    <button
                        onClick={() => setMode("register")}
                        className={`flex-1 py-2 text-xs tracking-widest uppercase transition-colors cursor-pointer ${
                            isRegister
                                ? "bg-[#c9a84c] text-black"
                                : "text-[#5a5045] hover:text-[#c9a84c]"
                        }`}
                    >
                        Cadastrar
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    {isRegister && (
                        <div className="flex flex-col gap-1">
                            <input
                                name="name"
                                type="text"
                                placeholder="Seu nome"
                                onBlur={(e) => validateField("name", e.target.value)}
                                className={INPUT_CLASS}
                            />
                            {fieldErrors.name && (
                                <p className="text-red-400 text-xs">{fieldErrors.name}</p>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <input
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            onBlur={(e) => validateField("email", e.target.value)}
                            className={INPUT_CLASS}
                        />
                        {fieldErrors.email && (
                            <p className="text-red-400 text-xs">{fieldErrors.email}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <input
                            name="password"
                            type="password"
                            placeholder="Senha"
                            onBlur={(e) => validateField("password", e.target.value)}
                            className={INPUT_CLASS}
                        />
                        {fieldErrors.password && (
                            <p className="text-red-400 text-xs">{fieldErrors.password}</p>
                        )}
                    </div>

                    {serverError && (
                        <p className="text-red-400 text-xs text-center">{serverError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#c9a84c] text-black py-3 text-xs tracking-widest uppercase hover:bg-[#e8c97a] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Aguarde..." : isRegister ? "Cadastrar" : "Entrar"}
                    </button>
                </form>

                <div className="flex items-center gap-4 w-full">
                    <div className="flex-1 h-px bg-[#c9a84c22]" />
                    <span className="text-[#3a3028] text-xs">ou</span>
                    <div className="flex-1 h-px bg-[#c9a84c22]" />
                </div>

                <button
                    onClick={handleGoogle}
                    className="w-full flex items-center justify-center gap-3 border border-[#c9a84c33] text-[#c9a84c] py-3 text-xs tracking-widest uppercase hover:bg-[#c9a84c11] transition-colors cursor-pointer"
                >
                    Continuar com Google
                </button>
            </div>
        </div>
    );
}