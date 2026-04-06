import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative flex items-center px-6 md:px-12 flex-1 min-h-0 overflow-hidden">
            <div className="flex flex-col gap-3 md:gap-5 max-w-xl z-10">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-primary">
                    Encontre os melhores profissionais de beleza{" "}
                    <span className="text-foreground">em um único local!</span>
                </h1>

                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-sm">
                    Conectamos você aos melhores profissionais de beleza da sua cidade.
                    Agendamento online, rápido e sem complicação.
                </p>

                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    <Link
                        href="#saloes"
                        className="bg-primary text-primary-foreground px-6 md:px-8 py-2.5 text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
                    >
                        Encontrar Salão
                    </Link>
                    <Link
                        href="/login"
                        className="border border-border text-primary px-6 md:px-8 py-2.5 text-sm font-medium rounded-full hover:border-primary transition-colors"
                    >
                        Sou Profissional
                    </Link>
                </div>

                <div className="flex items-center gap-4 md:gap-6 mt-2 border-t border-border pt-4">
                    <div className="text-center">
                        <p className="text-primary text-lg md:text-2xl font-light">500+</p>
                        <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Salões</p>
                    </div>
                    <div className="w-px h-6 md:h-8 bg-border" />
                    <div className="text-center">
                        <p className="text-primary text-lg md:text-2xl font-light">12k+</p>
                        <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Agendamentos</p>
                    </div>
                    <div className="w-px h-6 md:h-8 bg-border" />
                    <div className="text-center">
                        <p className="text-primary text-lg md:text-2xl font-light">4.9★</p>
                        <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Avaliação</p>
                    </div>
                </div>
            </div>

            <div className="absolute right-0 top-0 h-full w-[40%] md:w-[55%] hidden sm:block">
                <Image
                    src="/hairdresser-hero.webp"
                    alt="Profissional BeautixPro"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent" />
            </div>
        </section>
    );
}
