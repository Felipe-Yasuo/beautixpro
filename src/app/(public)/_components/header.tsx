import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="flex items-center justify-between px-12 py-4 border-b border-[#c9a84c22]">
            <Image
                src="/logo.png"
                alt="BeautixPro"
                width={180}
                height={60}
                className="object-contain"
            />

            <nav className="flex items-center gap-8">
                <Link
                    href="#saloes"
                    className="text-[#a09080] text-sm tracking-widest uppercase hover:text-[#c9a84c] transition-colors"
                >
                    Salões
                </Link>

                <Link
                    href="/login"
                    className="flex items-center gap-2 bg-[#c9a84c] text-black px-5 py-2 text-xs tracking-widest uppercase hover:bg-[#e8c97a] transition-colors"
                >
                    Portal do salão
                </Link>
            </nav>
        </header>
    );
}