"use client";

import { signIn } from "next-auth/react";
import { register } from "./_actions/register";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth();

    if (session?.user) {
        redirect("/dashboard");
    }

    const [mode, setMode] = useState<"login" | "register">("login");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        if (mode === "register") {
            const result = await register(formData);
            if (result?.error) {
                setError(result.error);
                setLoading(false);
                return;
            }
        }

        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (res?.error) {
            setError("E-mail ou senha inválidos.");
            setLoading(false);
            return;
        }

        router.push("/dashboard");
    }

    async function handleGoogle() {
        await signIn("google", { redirectTo: "/dashboard" });
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
                        className={`flex-1 py-2 text-xs tracking-widest uppercase transition-colors cursor-pointer ${mode === "login"
                            ? "bg-[#c9a84c] text-black"
                            : "text-[#5a5045] hover:text-[#c9a84c]"
                            }`}
                    >
                        Entrar
                    </button>
                    <button
                        onClick={() => setMode("register")}
                        className={`flex-1 py-2 text-xs tracking-widest uppercase transition-colors cursor-pointer ${mode === "register"
                            ? "bg-[#c9a84c] text-black"
                            : "text-[#5a5045] hover:text-[#c9a84c]"
                            }`}
                    >
                        Cadastrar
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    {mode === "register" && (
                        <input
                            name="name"
                            type="text"
                            placeholder="Seu nome"
                            className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                        />
                    )}
                    <input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                    />

                    {error && (
                        <p className="text-red-400 text-xs text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#c9a84c] text-black py-3 text-xs tracking-widest uppercase hover:bg-[#e8c97a] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Cadastrar"}
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