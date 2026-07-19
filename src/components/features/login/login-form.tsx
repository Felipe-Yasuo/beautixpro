"use client";

import Image from "next/image";
import Link from "next/link";
import { useLoginForm } from "@/hooks/use-login-form";
import { DemoCard } from "./demo-card";

export function LoginForm() {
    const {
        isRegister,
        fieldErrors,
        serverError,
        loading,
        showPassword,
        emailRef,
        passwordRef,
        validateField,
        switchMode,
        fillDemo,
        handleSubmit,
        handleGoogle,
        setShowPassword,
    } = useLoginForm();

    return (
        <div className="flex min-h-screen flex-col bg-surface-lowest">
            <div className="grid flex-1 grid-cols-1 min-[861px]:grid-cols-[1.04fr_0.96fr]">
                <div className="relative h-[320px] min-[861px]:h-auto">
                    <Image
                        src="/atriz.png"
                        alt="Profissional de beleza"
                        fill
                        className="object-cover grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                        }}
                    />

                    <Link
                        href="/"
                        className="absolute top-8 left-8 z-10 font-serif text-[25px] text-[#f6ede3]"
                    >
                        BeautixPro
                    </Link>

                    <div className="absolute bottom-12 left-8 z-10 right-8">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-6 bg-gold" />
                            <span className="text-[11px] uppercase tracking-[0.25em] text-[#f6ede3]">
                                Excelência em beleza
                            </span>
                        </div>
                        <h2
                            className="font-serif leading-tight text-[#f6ede3]"
                            style={{ fontSize: "clamp(38px, 4.4vw, 60px)" }}
                        >
                            Defina sua <span className="italic text-gold">arte.</span>
                        </h2>
                    </div>
                </div>

                {/* Painel do formulário */}
                <div className="flex flex-1 items-center justify-center px-6 py-14 sm:px-12">
                    <div className="w-full max-w-[384px]">
                        <Link
                            href="/"
                            className="mb-8 block font-serif text-2xl text-gold min-[861px]:hidden"
                        >
                            BeautixPro
                        </Link>

                        <h1
                            className="font-serif font-normal text-on-surface"
                            style={{ fontSize: "clamp(34px, 3.4vw, 44px)" }}
                        >
                            {isRegister ? "Crie sua conta" : "Bem-vindo de volta"}
                        </h1>
                        <p className="mt-2 text-[15px] text-on-surface-variant">
                            {isRegister
                                ? "Preencha seus dados para começar."
                                : "Insira suas credenciais para acessar o painel."}
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                            {isRegister && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-on-surface-dim">
                                        Nome completo
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Seu nome"
                                        onBlur={(e) => validateField("name", e.target.value)}
                                        className="input-underline"
                                    />
                                    {fieldErrors.name && (
                                        <p className="text-xs text-red-500">{fieldErrors.name}</p>
                                    )}
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-on-surface-dim">
                                    E-mail profissional
                                </label>
                                <input
                                    ref={emailRef}
                                    name="email"
                                    type="email"
                                    placeholder="nome@estudio.com"
                                    onBlur={(e) => validateField("email", e.target.value)}
                                    className="input-underline"
                                />
                                {fieldErrors.email && (
                                    <p className="text-xs text-red-500">{fieldErrors.email}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-on-surface-dim">
                                        Senha
                                    </label>
                                    {!isRegister && (
                                        <button
                                            type="button"
                                            className="cursor-pointer text-[11px] uppercase tracking-[0.15em] text-gold transition-colors hover:text-gold-container"
                                        >
                                            Esqueceu a senha?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        ref={passwordRef}
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        onBlur={(e) => validateField("password", e.target.value)}
                                        className="input-underline pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 top-0 cursor-pointer text-on-surface-dim transition-colors hover:text-gold"
                                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
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
                                    <p className="text-xs text-red-500">{fieldErrors.password}</p>
                                )}
                            </div>

                            {serverError && (
                                <p className="text-center text-xs text-red-500">{serverError}</p>
                            )}

                            <button type="submit" disabled={loading} className="btn-login">
                                {loading ? "Aguarde..." : isRegister ? "Criar conta" : "Entrar"}
                            </button>
                        </form>

                        {!isRegister && <DemoCard onFill={fillDemo} />}

                        <div className="my-6 flex w-full items-center gap-4">
                            <div className="h-px flex-1 bg-outline-variant" />
                            <span className="text-xs text-on-surface-dim">ou</span>
                            <div className="h-px flex-1 bg-outline-variant" />
                        </div>

                        <button onClick={handleGoogle} className="btn-google">
                            <GoogleIcon />
                            Continuar com Google
                        </button>

                        <div className="mt-8 text-center">
                            <p className="text-xs uppercase tracking-widest text-on-surface-dim">
                                {isRegister ? "Já tem uma conta?" : "Novo na plataforma?"}
                            </p>
                            <button
                                onClick={switchMode}
                                className="mt-1.5 cursor-pointer font-serif transition-colors hover:opacity-80"
                                style={{
                                    fontSize: "19px",
                                    color: "var(--on-surface)",
                                    borderBottom: "1px solid var(--gold)",
                                    paddingBottom: "2px",
                                    fontStyle: "normal",
                                }}
                            >
                                {isRegister ? "Entrar" : "Criar uma conta"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GoogleIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.1 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z" />
            <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6c-2 1.4-4.6 2.2-7.7 2.2-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C9.5 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.6 5.6C41.4 36.5 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5z" />
        </svg>
    );
}