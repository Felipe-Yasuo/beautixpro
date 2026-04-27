import Link from "next/link";

export function Manifesto() {
    return (
        <section className="relative border-t border-outline-variant overflow-hidden bg-surface-high">

            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent" />

            <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-150 w-225 -translate-x-1/2 -translate-y-1/2 opacity-25"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.05) 35%, transparent 70%)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center lg:px-12 lg:py-32">
                <div className="flex items-center justify-center gap-3">
                    <span className="h-px w-10 bg-gold" />
                    <span className="label-overline text-gold">Manifesto</span>
                    <span className="h-px w-10 bg-gold" />
                </div>

                <h2 className="mt-8 font-serif text-5xl leading-[1.05] tracking-tight text-on-surface sm:text-6xl lg:text-7xl">
                    <span className="italic text-on-surface-variant">Beleza não é</span>
                    <br />
                    <span className="italic text-on-surface">serviço. É</span>{" "}
                    <span className="text-gradient-gold font-bold">ritual</span>
                    <span className="italic text-on-surface">.</span>
                </h2>

                <p className="mx-auto mt-10 max-w-2xl font-serif text-base italic leading-relaxed text-on-surface-variant lg:text-lg">
                    Acreditamos no tempo dedicado, na escolha cuidadosa e na confiança
                    construída entre você e o profissional. Por isso curamos cada ateliê
                    que entra na nossa plataforma.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="#atelies" className="btn-primary">
                        Encontre seu ateliê
                    </Link>
                </div>
            </div>
        </section>
    );
}
