import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export function Hero() {
    return (
        <div>
            <section className="relative flex items-end min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] overflow-hidden">
                <Image
                    src="/hairdresser-hero.webp"
                    alt="Profissional BeautixPro"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/30" />

                <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-5 sm:px-6 md:px-12 lg:px-16 pb-10 sm:pb-12 md:pb-16 lg:pb-20 2xl:pb-24">
                    <div className="flex flex-col gap-4 md:gap-6 2xl:gap-8 max-w-[85vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5.5rem] font-bold leading-[1.1]">
                            <span className="italic text-gradient-gold">
                                Encontre os melhores profissionais de beleza
                            </span>{" "}
                            <span className="text-foreground">em um único local!</span>
                        </h1>

                        <p className="text-muted-foreground text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed max-w-md lg:max-w-lg 2xl:max-w-xl">
                            Conectamos você aos melhores profissionais de beleza da sua cidade.
                            Agendamento online, rápido e sem complicação.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 md:gap-4">
                            <Link
                                href="#saloes"
                                className="bg-primary text-primary-foreground px-6 md:px-8 2xl:px-10 py-3 sm:py-2.5 2xl:py-3.5 text-sm md:text-base 2xl:text-lg font-semibold rounded-full hover:bg-primary/90 transition-colors text-center"
                            >
                                Encontrar Salão
                            </Link>
                            <Link
                                href="/login"
                                className="border border-white/20 text-foreground px-6 md:px-8 2xl:px-10 py-3 sm:py-2.5 2xl:py-3.5 text-sm md:text-base 2xl:text-lg font-medium rounded-full hover:border-primary/50 hover:text-primary transition-colors text-center"
                            >
                                Sou Profissional
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="border-y border-border/50 bg-secondary/50">
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-16 2xl:gap-20 py-5 sm:py-6 md:py-8 2xl:py-10 max-w-screen-2xl mx-auto px-5">
                    <div className="text-center">
                        <p className="text-foreground text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold">500+</p>
                        <p className="text-muted-foreground text-[9px] sm:text-[10px] md:text-xs 2xl:text-sm uppercase tracking-wider">Salões</p>
                    </div>
                    <div className="text-center">
                        <p className="text-foreground text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold">12k+</p>
                        <p className="text-muted-foreground text-[9px] sm:text-[10px] md:text-xs 2xl:text-sm uppercase tracking-wider">Agendamentos</p>
                    </div>
                    <div className="text-center">
                        <p className="text-foreground text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold inline-flex items-center gap-1">
                            4.9
                            <Star className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8 fill-primary text-primary" />
                        </p>
                        <p className="text-muted-foreground text-[9px] sm:text-[10px] md:text-xs 2xl:text-sm uppercase tracking-wider">Avaliação</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
