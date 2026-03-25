"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex-1 flex items-center justify-center px-6 py-20">
            <div className="flex flex-col items-center text-center max-w-sm gap-6">
                <div className="w-14 h-14 rounded-full border border-[#c9a84c33] bg-[#c9a84c0d] flex items-center justify-center">
                    <span className="text-[var(--gold)] text-xl font-light">!</span>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-[var(--gold)] text-xs tracking-widest uppercase">
                        Erro no painel
                    </p>
                    <h2 className="text-xl font-light text-[var(--on-surface)]">
                        Não foi possível carregar
                    </h2>
                    <p className="text-[var(--on-surface-dim)] text-sm leading-relaxed">
                        Ocorreu um problema ao buscar os dados. Tente novamente ou acesse outra seção.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={reset}
                        className="btn-primary px-5 py-2.5 text-sm rounded-lg"
                    >
                        Tentar novamente
                    </button>
                    <Link
                        href="/dashboard"
                        className="border border-[var(--outline-variant)] text-[var(--on-surface-dim)] px-5 py-2.5 text-sm hover:border-[var(--gold)] hover:text-[var(--on-surface)] transition-colors rounded-lg"
                    >
                        Ir para o início
                    </Link>
                </div>

                {error.digest && (
                    <p className="text-[var(--on-surface-dim)] text-[10px] tracking-widest uppercase">
                        Código: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}
