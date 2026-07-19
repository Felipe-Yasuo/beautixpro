import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-[#2b211b14] bg-surface-lowest/90 backdrop-blur-[8px]">
            <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-[18px] lg:px-12">
                <Link href="/" className="flex flex-col leading-none">
                    <span className="font-serif text-on-surface text-[24px] tracking-[0.3em] leading-none">
                        BEAUTIX
                    </span>
                    <span className="mt-2 text-on-surface-dim text-[10px] tracking-[0.5em] lowercase">
                        pro | agenda
                    </span>
                </Link>

                <nav className="hidden min-[920px]:flex items-center justify-center gap-9">
                    <Link
                        href="#atelies"
                        className="text-[#6f5642] text-xs tracking-[0.14em] uppercase transition-colors hover:text-gold"
                    >
                        Salões
                    </Link>
                    <Link
                        href="#como-funciona"
                        className="text-[#6f5642] text-xs tracking-[0.14em] uppercase transition-colors hover:text-gold"
                    >
                        Como funciona
                    </Link>
                    <Link
                        href="#planos"
                        className="text-[#6f5642] text-xs tracking-[0.14em] uppercase transition-colors hover:text-gold"
                    >
                        Planos
                    </Link>
                    <Link
                        href="#duvidas"
                        className="text-[#6f5642] text-xs tracking-[0.14em] uppercase transition-colors hover:text-gold"
                    >
                        Dúvidas
                    </Link>
                </nav>

                <div className="flex items-center justify-end gap-6">
                    <Link
                        href="/login"
                        className="hidden sm:inline text-[#6f5642] text-xs tracking-[0.1em] uppercase transition-colors hover:text-on-surface"
                    >
                        Entrar
                    </Link>
                    <Link
                        href="/login"
                        className="rounded-[3px] bg-gold px-5 py-3 text-[11px] font-semibold tracking-[0.14em] text-on-gold uppercase transition-colors hover:bg-gold-container"
                    >
                        <span className="sm:hidden">Profissional</span>
                        <span className="hidden sm:inline">Sou profissional</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}