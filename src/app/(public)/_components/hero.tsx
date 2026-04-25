import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative">
            {/* Foto fullbleed cinematográfica */}
            <div className="relative flex min-h-[75vh] items-end overflow-hidden lg:min-h-[88vh]">
                <Image
                    src="/hairdresser-hero.webp"
                    alt="Ateliê de beleza"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="100vw"
                />

                {/* Mobile: vinheta vertical — escurece base pra texto, foto vira atmosfera no topo */}
                <div className="absolute inset-0 bg-linear-to-t from-surface-lowest via-surface-lowest/90 to-surface-lowest/20 lg:hidden" />

                {/* Desktop: vinheta lateral cinematográfica */}
                <div className="absolute inset-0 hidden bg-linear-to-r from-surface-lowest via-surface-lowest/85 to-surface-lowest/10 lg:block" />

                {/* Vinheta superior fina pra integrar com header */}
                <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-surface-lowest/80 to-transparent" />

                {/* Vinheta inferior — desce pra próxima seção */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-surface-lowest via-surface-lowest/60 to-transparent" />

                {/* Halo dourado discreto atrás da tipografia */}
                <div
                    className="pointer-events-none absolute left-0 top-1/2 h-150 w-225 -translate-y-1/2 opacity-40"
                    style={{
                        background:
                            "radial-gradient(ellipse at left center, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.04) 35%, transparent 70%)",
                    }}
                />

                {/* Conteúdo */}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 lg:px-12 lg:pb-32">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-gold" />
                            <span className="label-overline text-gold">
                                Convite ao agendamento · 2026
                            </span>
                        </div>

                        <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-on-surface sm:text-6xl lg:text-7xl xl:text-8xl">
                            <span className="italic text-on-surface">Encontre o</span>
                            <br />
                            <span className="text-gradient-gold font-bold">ateliê</span>
                            <span className="italic text-on-surface"> que</span>
                            <br />
                            <span className="italic text-on-surface-variant">entende você.</span>
                        </h1>

                        <p className="mt-8 max-w-xl font-serif text-base italic text-on-surface-variant sm:text-lg">
                            Uma curadoria de profissionais e estúdios de beleza,
                            agendados em segundos, confirmados em tempo real.
                        </p>

                        <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                            <Link href="#atelies" className="btn-primary text-center">
                                Explorar ateliês
                            </Link>
                            <Link
                                href="/login"
                                className="font-serif text-sm italic text-on-surface-variant underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold sm:ml-2"
                            >
                                Sou um profissional →
                            </Link>
                        </div>

                        {/* Assinatura editorial discreta */}
                        <p className="mt-16 hidden font-serif text-xs italic tracking-wide text-on-surface-variant lg:block">
                            — fotografia editorial · BeautixPro Curadoria
                        </p>
                    </div>
                </div>
            </div>

            {/* Tira de promessas — separa hero da próxima seção */}
            <div className="relative z-10 border-y border-outline-variant bg-surface-low">
                <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-px bg-outline-variant sm:flex-row">
                    <Promise label="Curadoria" value="Profissionais selecionados" />
                    <Promise label="Reserva" value="Agende em 60 segundos" />
                    <Promise label="Confirmação" value="Resposta em tempo real" accent />
                </div>
            </div>
        </section>
    );
}

function Promise({
    label,
    value,
    accent,
}: {
    label: string;
    value: string;
    accent?: boolean;
}) {
    return (
        <div className="flex-1 bg-surface-low px-6 py-8 lg:px-10">
            <p className="label-overline text-gold">{label}</p>
            <p
                className={`mt-2 font-serif text-lg ${accent ? "text-gold italic" : "text-on-surface"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}
