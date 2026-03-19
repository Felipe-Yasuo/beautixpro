import Image from "next/image";
import Link from "next/link";
import { getProfessionals } from "../_data-access/get-professionals";

export async function Professionals() {
    const professionals = await getProfessionals();

    return (
        <section id="saloes" className="px-12 py-20">
            <div className="flex flex-col gap-2 mb-12">
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Profissionais verificados
                </p>
                <h2 className="text-4xl font-light text-[#f0ead6]">
                    Salões <span className="text-[#c9a84c] font-semibold">disponíveis</span>
                </h2>
            </div>

            {professionals.length === 0 ? (
                <p className="text-[#3a3028] text-sm tracking-widest uppercase text-center py-20">
                    Nenhum salão disponível no momento.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {professionals.map((pro) => (
                        <div
                            key={pro.id}
                            className="border border-[#c9a84c22] hover:border-[#c9a84c55] transition-colors p-6 flex flex-col gap-5"
                        >
                            {/* Avatar + nome */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 flex-shrink-0">
                                    <Image
                                        src={pro.image ?? "/foto.png"}
                                        alt={pro.name ?? "Salão"}
                                        fill
                                        className="object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    {pro.subscription?.plan === "PROFESSIONAL" && (
                                        <span className="text-[#c9a84c] text-[10px] tracking-widest uppercase border border-[#c9a84c33] px-2 py-0.5 w-fit">
                                            ✦ Premium
                                        </span>
                                    )}
                                    <p className="text-[#f0ead6] font-medium">{pro.name}</p>
                                    {pro.address && (
                                        <p className="text-[#3a3028] text-xs">{pro.address}</p>
                                    )}
                                </div>
                            </div>

                            {/* Serviços */}
                            {pro.services.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {pro.services.map((service) => (
                                        <span
                                            key={service.name}
                                            className="text-[#7a6e62] text-[10px] tracking-widest uppercase border border-[#c9a84c22] px-2 py-1"
                                        >
                                            {service.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Botão */}
                            <Link
                                href={`/salao/${pro.id}`}
                                className="mt-auto text-[#c9a84c] text-xs tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all"
                            >
                                Agendar agora →
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}