"use client";

import { useState } from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { register } from "../_actions/register";
import Image from "next/image";
import Link from "next/link";

const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
});

const registerSchema = loginSchema.extend({
    name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
});

type FieldErrors = Partial<Record<string, string>>;

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
    const [showPassword, setShowPassword] = useState(false);
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
        <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
            <div className="flex flex-1">
                {/* Left - Image */}
                <div className="hidden lg:flex relative w-[55%]">
                    <Image
                        src="/atriz.png"
                        alt="Profissional de beleza"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />

                    {/* Logo */}
                    <Link
                        href="/"
                        className="absolute top-8 left-8 2xl:top-10 2xl:left-10 z-10 font-serif text-2xl 2xl:text-3xl text-[#c9a84c]"
                    >
                        BeautixPro
                    </Link>

                    {/* Bottom text */}
                    <div className="absolute bottom-12 left-8 2xl:bottom-16 2xl:left-10 z-10">
                        <p className="text-[#c9a84c] text-xs 2xl:text-sm tracking-[0.3em] uppercase mb-4">
                            Excelência em Beleza
                        </p>
                        <h2 className="font-serif text-5xl xl:text-6xl 2xl:text-7xl text-white leading-tight">
                            Defina Sua{" "}
                            <span className="italic text-[#c9a84c]">Arte.</span>
                        </h2>
                    </div>
                </div>

                {/* Right - Form */}
                <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 2xl:px-20">
                    <div className="w-full max-w-md 2xl:max-w-lg">
                        {/* Mobile logo */}
                        <Link
                            href="/"
                            className="lg:hidden block font-serif text-3xl text-[#c9a84c] mb-10"
                        >
                            BeautixPro
                        </Link>

                        <h1 className="font-serif text-3xl sm:text-4xl 2xl:text-5xl text-white mb-2 2xl:mb-3">
                            {isRegister ? "Crie sua Conta" : "Bem-vindo de Volta"}
                        </h1>
                        <p className="text-[#5a5045] text-xs 2xl:text-sm tracking-[0.15em] uppercase mb-10 2xl:mb-12">
                            {isRegister
                                ? "Preencha seus dados para começar"
                                : "Insira suas credenciais para acessar o painel"}
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 2xl:gap-8">
                            {isRegister && (
                                <div className="flex flex-col gap-1.5 2xl:gap-2">
                                    <label className="text-[#5a5045] text-[10px] 2xl:text-xs tracking-[0.2em] uppercase">
                                        Nome Completo
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Seu nome"
                                        onBlur={(e) => validateField("name", e.target.value)}
                                        className="bg-transparent border-b border-[#c9a84c33] text-[#f0ead6] pb-3 text-sm 2xl:text-base outline-none focus:border-[#c9a84c] placeholder:text-[#2a2420] transition-colors"
                                    />
                                    {fieldErrors.name && (
                                        <p className="text-red-400 text-xs 2xl:text-sm">{fieldErrors.name}</p>
                                    )}
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5 2xl:gap-2">
                                <label className="text-[#5a5045] text-[10px] 2xl:text-xs tracking-[0.2em] uppercase">
                                    E-mail Profissional
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="nome@estudio.com"
                                    onBlur={(e) => validateField("email", e.target.value)}
                                    className="bg-transparent border-b border-[#c9a84c33] text-[#f0ead6] pb-3 text-sm 2xl:text-base outline-none focus:border-[#c9a84c] placeholder:text-[#2a2420] transition-colors"
                                />
                                {fieldErrors.email && (
                                    <p className="text-red-400 text-xs 2xl:text-sm">{fieldErrors.email}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5 2xl:gap-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[#5a5045] text-[10px] 2xl:text-xs tracking-[0.2em] uppercase">
                                        Senha
                                    </label>
                                    {!isRegister && (
                                        <button
                                            type="button"
                                            className="text-[#c9a84c] text-[10px] 2xl:text-xs tracking-[0.15em] uppercase hover:text-[#e8c97a] transition-colors"
                                        >
                                            Esqueceu a senha?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        onBlur={(e) => validateField("password", e.target.value)}
                                        className="w-full bg-transparent border-b border-[#c9a84c33] text-[#f0ead6] pb-3 text-sm 2xl:text-base outline-none focus:border-[#c9a84c] placeholder:text-[#2a2420] transition-colors pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 top-0 text-[#5a5045] hover:text-[#c9a84c] transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {fieldErrors.password && (
                                    <p className="text-red-400 text-xs 2xl:text-sm">{fieldErrors.password}</p>
                                )}
                            </div>

                            {serverError && (
                                <p className="text-red-400 text-xs 2xl:text-sm text-center">{serverError}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 bg-[#c9a84c] text-black py-3.5 2xl:py-4 text-xs 2xl:text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#e8c97a] transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                {loading
                                    ? "Aguarde..."
                                    : isRegister
                                      ? "Criar Conta"
                                      : "Entrar"}
                            </button>
                        </form>

                        <div className="flex items-center gap-4 w-full my-6 2xl:my-8">
                            <div className="flex-1 h-px bg-[#c9a84c22]" />
                            <span className="text-[#3a3028] text-xs 2xl:text-sm">ou</span>
                            <div className="flex-1 h-px bg-[#c9a84c22]" />
                        </div>

                        <button
                            onClick={handleGoogle}
                            className="w-full flex items-center justify-center gap-3 border border-[#c9a84c33] text-[#c9a84c] py-3 2xl:py-3.5 text-xs 2xl:text-sm tracking-[0.15em] uppercase hover:bg-[#c9a84c11] transition-colors cursor-pointer"
                        >
                            Continuar com Google
                        </button>

                        <div className="text-center mt-8 2xl:mt-10">
                            <p className="text-[#5a5045] text-xs 2xl:text-sm tracking-[0.1em] uppercase">
                                {isRegister
                                    ? "Já tem uma conta?"
                                    : "Novo na plataforma?"}
                            </p>
                            <button
                                onClick={() => {
                                    setMode(isRegister ? "login" : "register");
                                    setFieldErrors({});
                                    setServerError("");
                                }}
                                className="text-[#c9a84c] text-xs 2xl:text-sm tracking-[0.15em] uppercase mt-1.5 hover:text-[#e8c97a] transition-colors cursor-pointer"
                            >
                                {isRegister ? "Entrar" : "Criar uma Conta"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-[#c9a84c15] px-8 py-5 2xl:py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[#3a3028] text-[10px] 2xl:text-xs tracking-[0.15em] uppercase">
                    &copy; 2024 BeautixPro. Todos os direitos reservados.
                </p>
                <div className="flex items-center gap-6">
                    <span className="text-[#3a3028] text-[10px] 2xl:text-xs tracking-[0.15em] uppercase hover:text-[#5a5045] transition-colors cursor-pointer">
                        Política de Privacidade
                    </span>
                    <span className="text-[#3a3028] text-[10px] 2xl:text-xs tracking-[0.15em] uppercase hover:text-[#5a5045] transition-colors cursor-pointer">
                        Termos de Uso
                    </span>
                    <span className="text-[#3a3028] text-[10px] 2xl:text-xs tracking-[0.15em] uppercase hover:text-[#5a5045] transition-colors cursor-pointer">
                        Política de Cookies
                    </span>
                </div>
            </footer>
        </div>
    );
}
