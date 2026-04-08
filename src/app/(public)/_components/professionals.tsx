import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, ArrowRight } from "lucide-react";
import { getProfessionals } from "../_data-access/get-professionals";

export async function Professionals() {
    const professionals = await getProfessionals();

    return (
        <section id="saloes" className="py-8 md:py-12">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-gradient-gold px-5 sm:px-6 md:px-12 mb-6 md:mb-8">
                Profissionais disponíveis
            </h2>

            {professionals.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-12 px-6">
                    Nenhum salão disponível no momento.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-5 sm:px-6 md:px-12">
                    {professionals.map((pro) => {
                        const services = pro.employees.flatMap((e) => e.services);

                        return (
                            <div
                                key={pro.id}
                                className="group bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-gold flex flex-col"
                            >
                                <div className="relative aspect-4/5 overflow-hidden bg-muted">
                                    <Image
                                        src={pro.image || "/foto.webp"}
                                        alt={pro.name ?? "Salão"}
                                        fill
                                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    />
                                    <button
                                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/70 hover:text-primary transition-colors"
                                        aria-label="Favoritar"
                                    >
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="p-4 flex flex-col gap-3 flex-1">
                                    <div>
                                        <p className="font-serif text-foreground font-semibold text-sm">
                                            {pro.name}
                                        </p>
                                        {pro.address && (
                                            <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1">
                                                <MapPin className="w-3 h-3 text-primary shrink-0" />
                                                <span className="truncate">{pro.address}</span>
                                            </p>
                                        )}
                                    </div>

                                    {services.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {services.slice(0, 3).map((service) => (
                                                <span
                                                    key={service.name}
                                                    className="bg-secondary text-muted-foreground text-[10px] tracking-wider uppercase px-2 py-0.5 rounded"
                                                >
                                                    {service.name}
                                                </span>
                                            ))}
                                            {services.length > 3 && (
                                                <span className="text-primary text-[10px] tracking-wider uppercase border border-primary/30 bg-primary/5 px-2 py-0.5 rounded">
                                                    +{services.length - 3} serviços
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    <Link
                                        href={`/salao/${pro.id}`}
                                        className="mt-auto w-full bg-primary text-primary-foreground py-2.5 text-sm font-medium text-center hover:bg-primary/90 transition-colors rounded-lg flex items-center justify-center gap-2"
                                    >
                                        Agendar horário
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
