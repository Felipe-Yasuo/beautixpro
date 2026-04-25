import Image from "next/image";
import { getInfoSchedule } from "../_data-access/get-info-schedule";
import { ScheduleForm } from "./schedule-form";

interface ScheduleContentProps {
    userId: string;
}

export async function ScheduleContent({ userId }: ScheduleContentProps) {
    const user = await getInfoSchedule(userId);

    if (!user) {
        return (
            <div className="relative flex min-h-screen items-center justify-center bg-surface-lowest px-6">
                <div className="relative z-10 max-w-md text-center">
                    <p className="label-overline mb-4">404 · Atelier</p>
                    <h1 className="font-serif text-4xl italic text-on-surface">
                        Este endereço não existe.
                    </h1>
                    <p className="mt-4 text-sm text-on-surface-variant">
                        Verifique o link ou retorne ao convite original.
                    </p>
                </div>
            </div>
        );
    }

    const totalServices = user.employees.reduce((sum, e) => sum + e.services.length, 0);
    const teamSize = user.employees.length;

    return (
        <div className="relative min-h-screen bg-surface-lowest text-on-surface">
            {/* Noise overlay para atmosfera */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
            />

            {/* Halo dourado radial atrás do hero */}
            <div
                className="pointer-events-none absolute left-1/2 top-0 z-0 h-150 w-225 -translate-x-1/2 opacity-30"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.05) 35%, transparent 70%)",
                }}
            />

            {/* Hero */}
            <header className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-10 lg:px-12 lg:pt-20">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                    {/* Coluna esquerda: tipografia */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-gold" />
                            <span className="label-overline text-gold">
                                Convite ao agendamento
                            </span>
                        </div>

                        <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-on-surface sm:text-6xl lg:text-7xl">
                            <span className="italic text-on-surface-variant">
                                Bem-vindo ao
                            </span>
                            <br />
                            <span className="text-gradient-gold font-bold">
                                {user.name ?? "ateliê"}
                            </span>
                            <span className="text-on-surface">.</span>
                        </h1>

                        {user.address && (
                            <p className="mt-6 max-w-xl font-serif text-base italic text-on-surface-variant sm:text-lg">
                                {user.address}
                            </p>
                        )}

                        {/* Tira de credenciais */}
                        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-outline-variant pt-6">
                            <Credential
                                label="Equipe"
                                value={`${teamSize} ${teamSize === 1 ? "profissional" : "profissionais"}`}
                            />
                            <Divider />
                            <Credential
                                label="Catálogo"
                                value={`${totalServices} ${totalServices === 1 ? "serviço" : "serviços"}`}
                            />
                            <Divider />
                            <Credential label="Reservas" value="Abertas" accent />
                        </div>
                    </div>

                    {/* Coluna direita: foto retrato editorial */}
                    <div className="lg:col-span-5">
                        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden">
                            {/* Moldura dourada fina deslocada */}
                            <div className="absolute inset-0 z-20 border border-gold/40" />
                            <div
                                className="absolute -inset-px z-10 border border-gold/15"
                                style={{ transform: "translate(8px, 8px)" }}
                            />

                            <Image
                                src={user.image ?? "/foto.webp"}
                                alt={user.name ?? "Salão"}
                                fill
                                className="object-cover grayscale-[15%]"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                priority
                            />
                            {/* Overlay sutil dourado */}
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface-lowest/60 via-transparent to-transparent" />
                        </div>

                        {/* Assinatura sob a foto */}
                        <p className="mt-4 text-right font-serif text-xs italic tracking-wide text-on-surface-variant">
                            — atelier de beleza
                        </p>
                    </div>
                </div>
            </header>

            {/* Reserva */}
            <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Resumo (sticky) */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-12">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-6 bg-gold" />
                                <span className="label-overline text-gold">Sua reserva</span>
                            </div>
                            <h2 className="mt-4 font-serif text-3xl italic text-on-surface lg:text-4xl">
                                Cada detalhe,
                                <br />
                                escolhido por você.
                            </h2>
                            <p className="mt-6 max-w-sm text-sm leading-relaxed text-on-surface-variant">
                                Preencha os campos ao lado para reservar seu horário.
                                A confirmação chega assim que o ateliê aprovar.
                            </p>
                        </div>
                    </aside>

                    {/* Form */}
                    <div className="lg:col-span-8">
                        <ScheduleForm user={user} />
                    </div>
                </div>
            </section>

            {/* Rodapé editorial */}
            <footer className="relative z-10 border-t border-outline-variant">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-12">
                    <p className="font-serif text-xs italic text-on-surface-variant">
                        Reservado por <span className="text-gold">BeautixPro</span>
                    </p>
                    <p className="label-overline text-on-surface-variant">
                        © {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </div>
    );
}

function Credential({
    label,
    value,
    accent,
}: {
    label: string;
    value: string;
    accent?: boolean;
}) {
    return (
        <div className="flex flex-col">
            <span className="label-overline">{label}</span>
            <span
                className={`mt-1 font-serif text-base ${accent ? "text-gold italic" : "text-on-surface"
                    }`}
            >
                {value}
            </span>
        </div>
    );
}

function Divider() {
    return <span className="h-8 w-px bg-outline-variant" />;
}
