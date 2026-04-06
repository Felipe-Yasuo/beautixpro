import Image from "next/image";
import Link from "next/link";
import { getProfessionals } from "../_data-access/get-professionals";

export async function Professionals() {
    const professionals = await getProfessionals();

    return (
        <section id="saloes" className="shrink-0 pb-2">
            <h2 className="text-lg md:text-2xl font-bold text-foreground px-6 md:px-12 mb-4">
                Profissionais disponíveis
            </h2>

            {professionals.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8 px-6">
                    Nenhum salão disponível no momento.
                </p>
            ) : (
                <div className="flex gap-3 md:gap-4 overflow-x-auto px-6 md:px-12 pb-3 scrollbar-hide">
                    {professionals.map((pro) => {
                        const services = pro.employees.flatMap((e) => e.services);

                        return (
                            <div
                                key={pro.id}
                                className="bg-card border border-border hover:border-primary/50 transition-colors flex flex-col rounded-xl overflow-hidden w-44 md:w-48 shrink-0"
                            >
                                <div className="relative w-full h-28 md:h-32">
                                    <Image
                                        src={pro.image ?? "/foto.webp"}
                                        alt={pro.name ?? "Salão"}
                                        fill
                                        className="object-cover object-top"
                                    />
                                    <button
                                        className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 text-white/70 hover:text-primary transition-colors"
                                        aria-label="Favoritar"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-3 flex flex-col gap-2 flex-1">
                                    <div>
                                        <p className="text-foreground font-semibold text-xs">
                                            {pro.name}
                                        </p>
                                        {pro.address && (
                                            <p className="text-muted-foreground text-[10px] mt-0.5 flex items-center gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="10"
                                                    height="10"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="text-primary shrink-0"
                                                >
                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                </svg>
                                                <span className="truncate">{pro.address}</span>
                                            </p>
                                        )}
                                    </div>

                                    {services.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {services.slice(0, 3).map((service) => (
                                                <span
                                                    key={service.name}
                                                    className="text-muted-foreground text-[8px] tracking-wider uppercase border border-border px-1.5 py-0.5 rounded-sm"
                                                >
                                                    {service.name}
                                                </span>
                                            ))}
                                            {services.length > 3 && (
                                                <span className="text-primary text-[8px] tracking-wider uppercase border border-primary/30 bg-primary/5 px-1.5 py-0.5 rounded-sm">
                                                    +{services.length - 3} serviços
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    <Link
                                        href={`/salao/${pro.id}`}
                                        className="mt-auto w-full bg-primary text-primary-foreground py-2 text-xs font-medium text-center hover:bg-primary/90 transition-colors rounded-lg flex items-center justify-center gap-1.5"
                                    >
                                        Agendar horário
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
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
