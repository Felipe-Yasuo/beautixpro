import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="flex flex-col items-center text-center max-w-md gap-6">
                <p className="text-[8rem] font-light leading-none text-[#c9a84c18] select-none">
                    404
                </p>

                <div className="flex flex-col gap-2 -mt-4">
                    <p className="text-[var(--gold)] text-xs tracking-widest uppercase">
                        Página não encontrada
                    </p>
                    <h1 className="text-2xl font-light text-foreground">
                        Esta página não existe
                    </h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        O endereço que você acessou pode ter sido removido ou digitado incorretamente.
                    </p>
                </div>

                <Link
                    href="/"
                    className="bg-primary text-primary-foreground px-8 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors mt-2"
                >
                    Voltar ao início
                </Link>
            </div>
        </div>
    );
}
