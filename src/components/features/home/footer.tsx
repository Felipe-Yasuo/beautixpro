import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative border-t border-outline-variant bg-surface-lowest">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    <div className="lg:col-span-5">
                        <Link
                            href="/"
                            className="text-gradient-gold font-serif text-3xl italic"
                        >
                            BeautixPro
                        </Link>
                        <p className="mt-4 max-w-xs font-serif text-sm italic text-on-surface-variant">
                            Salões de beleza perto de você.
                            <br />
                            Reservas em segundos, confirmação em tempo real.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 lg:col-span-7">
                        <FooterColumn
                            title="Plataforma"
                            links={[
                                { label: "Salões", href: "#atelies" },
                                { label: "Como funciona", href: "#como-funciona" },
                            ]}
                        />
                        <FooterColumn
                            title="Profissional"
                            links={[
                                { label: "Entrar", href: "/login" },
                                { label: "Criar conta", href: "/login" },
                            ]}
                        />
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-outline-variant pt-8 sm:flex-row sm:items-center">
                    <p className="font-serif text-xs italic text-on-surface-variant">
                        © {new Date().getFullYear()} BeautixPro. Todos os direitos reservados.
                    </p>
                    <p className="label-overline text-on-surface-variant">
                        Feito com cuidado · Brasil
                    </p>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: { label: string; href: string }[];
}) {
    return (
        <div>
            <p className="label-overline text-gold">{title}</p>
            <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            className="font-serif text-sm italic text-on-surface transition-colors hover:text-gold"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
