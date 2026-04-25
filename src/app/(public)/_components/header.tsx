import Link from "next/link";

export function Header() {
    return (
        <header className="fixed top-0 right-0 left-0 z-50 border-b border-outline-variant bg-surface-lowest/70 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-12">
                <Link
                    href="/"
                    className="text-gradient-gold font-serif text-xl italic sm:text-2xl"
                >
                    BeautixPro
                </Link>

                <nav className="flex items-center gap-5 sm:gap-8">
                    <Link
                        href="#atelies"
                        className="label-overline hidden text-on-surface-variant transition-colors hover:text-gold sm:inline"
                    >
                        Ateliês
                    </Link>
                    <Link
                        href="#como-funciona"
                        className="label-overline hidden text-on-surface-variant transition-colors hover:text-gold lg:inline"
                    >
                        Como funciona
                    </Link>
                    <Link
                        href="/login"
                        className="btn-ghost px-3 py-2 text-[0.65rem] sm:px-5 sm:py-3 sm:text-xs"
                    >
                        <span className="sm:hidden">Profissional</span>
                        <span className="hidden sm:inline">Sou profissional</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
