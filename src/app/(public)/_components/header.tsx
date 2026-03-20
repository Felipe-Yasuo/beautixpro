import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="flex items-center justify-between px-12 py-4 border-b border-border">
            <Image
                src="/logo.png"
                alt="BeautixPro"
                width={150}
                height={50}
                className="object-contain"
            />

            <nav className="flex items-center gap-8">
                <Link
                    href="#saloes"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                    Profissionais
                </Link>

                <Link
                    href="/login"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    Portal do salão
                </Link>
            </nav>
        </header>
    );
}