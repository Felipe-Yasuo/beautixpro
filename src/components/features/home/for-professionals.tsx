import Link from "next/link";

const APPOINTMENTS = [
    { time: "09:00", label: "Ana Beatriz · Corte & escova", status: "Confirmado" },
    { time: "11:30", label: "Bruno Lima · Barba & navalha", status: "Pendente" },
    { time: "14:30", label: "Carla Souza · Coloração", status: "Confirmado" },
];

export function ForProfessionals() {
    return (
        <section
            className="relative overflow-hidden"
            style={{ backgroundColor: "#241b15", color: "#f6ede3" }}
        >
            {/* Grão overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
            />

            <div
                className="relative mx-auto max-w-[1280px] px-6 lg:px-12"
                style={{ paddingTop: "clamp(72px, 9vw, 128px)", paddingBottom: "clamp(72px, 9vw, 128px)" }}
            >
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
                    {/* Coluna de texto */}
                    <div>
                        <div className="flex items-baseline gap-[14px]">
                            <span className="font-serif text-gold" style={{ fontSize: "26px" }}>
                                02/
                            </span>
                            <span
                                className="text-[11px] font-semibold uppercase tracking-[0.42em]"
                                style={{ color: "rgba(246,237,227,0.6)" }}
                            >
                                Para profissionais
                            </span>
                        </div>

                        <h2
                            className="mt-6 font-serif font-normal"
                            style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.08, color: "#f6ede3" }}
                        >
                            Seu salão inteiro em{" "}
                            <span className="italic" style={{ color: "#dbb99b" }}>
                                um painel
                            </span>
                            .
                        </h2>

                        <p
                            className="mt-6 max-w-[440px]"
                            style={{ fontSize: "16px", lineHeight: 1.65, color: "rgba(246,237,227,0.7)" }}
                        >
                            Agenda em tempo real, serviços, equipe e receita — e uma
                            página de agendamento própria para seus clientes marcarem
                            sozinhos.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <StatPill value="+2.400" label="reservas/mês" />
                            <StatPill value="98%" label="confirmação" />
                        </div>

                        <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                            <Link href="/login" className="btn-primary text-center">
                                Comece grátis
                            </Link>
                            <Link
                                href="#planos"
                                className="link-terracota text-[13px] underline underline-offset-4"
                            >
                                Ver planos →
                            </Link>
                        </div>
                    </div>

                    {/* Coluna do card do painel */}
                    <div
                        className="rounded-[6px] p-7 shadow-2xl"
                        style={{ backgroundColor: "#fffaf3", color: "#2b211b" }}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase" style={{ color: "#a08265" }}>
                                Painel · Hoje
                            </span>
                            <span className="flex items-center gap-1.5 text-[10px] uppercase text-gold">
                                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                                Ao vivo
                            </span>
                        </div>

                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="font-serif" style={{ fontSize: "50px", lineHeight: 1 }}>
                                R$ 1.240
                            </span>
                            <span className="text-[12px] text-gold">+12%</span>
                        </div>
                        <p className="mt-1 text-[11px] uppercase" style={{ color: "#a08265" }}>
                            Receita de hoje
                        </p>

                        <div className="mt-6 flex flex-col">
                            {APPOINTMENTS.map((appt, i) => (
                                <div
                                    key={appt.time}
                                    className="grid grid-cols-[54px_1fr_auto] items-center gap-3 py-4"
                                    style={{ borderTop: i === 0 ? "none" : "1px solid #eadfce" }}
                                >
                                    <span className="font-serif" style={{ fontSize: "17px" }}>
                                        {appt.time}
                                    </span>
                                    <span style={{ fontSize: "13.5px" }}>{appt.label}</span>
                                    <span
                                        className="text-[10px] uppercase"
                                        style={{ color: appt.status === "Confirmado" ? "var(--gold)" : "#a08265" }}
                                    >
                                        {appt.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatPill({ value, label }: { value: string; label: string }) {
    return (
        <div
            className="flex items-baseline gap-2 rounded-full px-[26px] py-[14px]"
            style={{ backgroundColor: "#fffaf3", color: "#2b211b" }}
        >
            <span className="font-serif" style={{ fontSize: "20px" }}>
                {value}
            </span>
            <span className="text-[11px] uppercase" style={{ color: "#a08265" }}>
                {label}
            </span>
        </div>
    );
}