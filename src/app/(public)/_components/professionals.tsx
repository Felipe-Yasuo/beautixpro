import Image from "next/image";
import Link from "next/link";
import { getProfessionals } from "../_data-access/get-professionals";

export async function Professionals() {
    const professionals = await getProfessionals();

    return (
        <section id="saloes" className="px-12 py-20">
            <div className="flex flex-col gap-2 mb-12 text-center">
                <h2 className="text-3xl font-bold text-foreground">
                    Profissionais disponíveis
                </h2>
            </div>

            {professionals.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-20">
                    Nenhum salão disponível no momento.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {professionals.map((pro) => (
                        <div
                            key={pro.id}
                            className="bg-card border border-border hover:border-primary/50 transition-colors flex flex-col rounded-lg overflow-hidden"
                        >

                            <div className="relative w-full h-44">
                                <Image
                                    src={pro.image ?? "/foto.png"}
                                    alt={pro.name ?? "Salão"}
                                    fill
                                    className="object-cover object-top"
                                />
                                {pro.subscription?.plan === "PROFESSIONAL" && (
                                    <span className="absolute top-3 right-3 text-primary text-[10px] tracking-widest uppercase bg-card border border-primary/30 px-2 py-0.5 rounded-sm">
                                        ✦ Premium
                                    </span>
                                )}
                            </div>

                            <div className="p-5 flex flex-col gap-4">
                                <div>
                                    <p className="text-foreground font-semibold">{pro.name}</p>
                                    {pro.address && (
                                        <p className="text-muted-foreground text-sm mt-0.5">{pro.address}</p>
                                    )}
                                </div>

                                {pro.services.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {pro.services.map((service) => (
                                            <span
                                                key={service.name}
                                                className="text-muted-foreground text-[10px] tracking-widest uppercase border border-border px-2 py-1 rounded-sm"
                                            >
                                                {service.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <Link
                                    href={`/salao/${pro.id}`}
                                    className="w-full bg-primary text-primary-foreground py-3 text-sm font-medium text-center hover:bg-primary/90 transition-colors rounded-md flex items-center justify-center gap-2"
                                >
                                    Agendar horário →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}