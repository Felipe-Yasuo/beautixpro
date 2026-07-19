import Link from "next/link";

export function Footer() {
    return (
        <footer style={{ backgroundColor: "#241b15", color: "#f6ede3" }}>
            <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-7 p-12">
                <Link href="/" className="flex flex-col leading-none">
                    <span className="font-serif tracking-[0.3em]" style={{ fontSize: "22px", color: "#f6ede3" }}>
                        BEAUTIX
                    </span>
                    <span className="mt-1 tracking-[0.5em]" style={{ fontSize: "9px", color: "rgba(246,237,227,0.5)" }}>
                        pro | agenda
                    </span>
                </Link>

                <nav className="flex flex-wrap items-center gap-7">
                    <FooterLink href="#atelies">Salões</FooterLink>
                    <FooterLink href="#como-funciona">Como funciona</FooterLink>
                    <FooterLink href="#planos">Planos</FooterLink>
                    <FooterLink href="/login">Entrar</FooterLink>
                </nav>

                <p className="text-[12px]" style={{ color: "rgba(246,237,227,0.45)" }}>
                    © {new Date().getFullYear()} BeautixPro · Brasil
                </p>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="footer-link text-[12px] uppercase tracking-[0.1em]">
            {children}
        </Link>
    );
}