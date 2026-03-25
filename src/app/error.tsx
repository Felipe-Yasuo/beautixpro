"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="flex flex-col items-center text-center max-w-md gap-6">
                <div className="w-16 h-16 rounded-full border border-[#c9a84c33] bg-[#c9a84c0d] flex items-center justify-center">
                    <span className="text-[var(--gold)] text-2xl font-light">!</span>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-[var(--gold)] text-xs tracking-widest uppercase">
                        Algo deu errado
                    </p>
                    <h1 className="text-2xl font-light text-foreground">
                        Ocorreu um erro inesperado
                    </h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Não foi possível carregar esta página. Tente novamente ou volte para o início.
                    </p>
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <button
                        onClick={reset}
                        className="bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Tentar novamente
                    </button>
                    <Link
                        href="/"
                        className="border border-border text-muted-foreground px-6 py-2.5 text-sm font-medium hover:border-primary hover:text-foreground transition-colors"
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
