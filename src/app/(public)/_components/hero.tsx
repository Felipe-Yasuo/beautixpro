import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative flex items-center justify-between px-12 min-h-[88vh] overflow-hidden">

            {/* Texto */}
            <div className="flex flex-col gap-7 max-w-lg z-10">
                <h1 className="text-6xl font-light leading-[1.1] text-foreground">
                    Encontre os melhores{" "}
                    <span className="text-primary italic">profissionais</span>
                    {" "}em um único local!
                </h1>

                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                    Conectamos você aos melhores profissionais de beleza da sua cidade.
                    Agendamento online, rápido e sem complicação.
                </p>

                <div className="flex items-center gap-4 mt-2">
                    <Link
                        href="#saloes"
                        className="bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Encontrar salão
                    </Link>
                    <Link
                        href="/login"
                        className="border border-border text-primary px-8 py-3 text-sm font-medium hover:border-primary transition-colors"
                    >
                        Sou profissional
                    </Link>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-4 border-t border-border pt-6">
                    <div className="text-center">
                        <p className="text-primary text-2xl font-light">500+</p>
                        <p className="text-muted-foreground text-xs uppercase">Salões</p>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="text-center">
                        <p className="text-primary text-2xl font-light">12k+</p>
                        <p className="text-muted-foreground text-xs uppercase">Agendamentos</p>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="text-center">
                        <p className="text-primary text-2xl font-light">4.9★</p>
                        <p className="text-muted-foreground text-xs uppercase">Avaliação</p>
                    </div>
                </div>
            </div>

            {/* Imagem */}
            <div className="absolute right-0 top-0 h-full w-[55%]">
                <Image
                    src="/hairdresser-hero.png"
                    alt="Profissional BeautixPro"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-background via-background/10 to-transparent" />
            </div>

        </section>
    );
}