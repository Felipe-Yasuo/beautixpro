import Link from "next/link";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
            <div className="flex items-center justify-between px-5 sm:px-6 md:px-12 lg:px-16 py-4 2xl:py-5 max-w-screen-2xl mx-auto w-full">
                <Link href="/" className="font-serif text-xl sm:text-2xl 2xl:text-3xl italic text-gradient-gold">
                    BeautixPro
                </Link>

                <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
                    <Link
                        href="#saloes"
                        className="hidden sm:inline text-muted-foreground text-sm 2xl:text-base hover:text-primary transition-colors"
                    >
                        Profissionais
                    </Link>

                    <Link
                        href="/login"
                        className="flex items-center gap-2 border border-primary/60 text-primary px-4 sm:px-5 2xl:px-6 py-2 2xl:py-2.5 text-xs sm:text-sm 2xl:text-base font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                        Portal do Salão
                    </Link>
                </nav>
            </div>
        </header>
    );
}
