import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-border">
            <Image
                src="/logo.png"
                alt="BeautixPro"
                width={150}
                height={50}
                className="object-contain"
            />

            <nav className="flex items-center gap-6 md:gap-8">
                <Link
                    href="#saloes"
                    className="hidden sm:inline text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                    Profissionais
                </Link>

                <Link
                    href="/login"
                    className="flex items-center gap-2 border border-primary text-primary px-5 py-2 text-sm font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                    Portal do salão
                </Link>
            </nav>
        </header>
    );
}
