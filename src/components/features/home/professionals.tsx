import Image from "next/image";
import Link from "next/link";
import { getProfessionals } from "@/lib/services/get-professionals";

const COLUMN_OFFSET = ["", "lg:mt-14", "lg:mt-5"]; // 0 / 56px / 20px

export async function Professionals() {
    const allProfessionals = await getProfessionals();
    const professionals = allProfessionals.slice(0, 3);

    return (
        <section
            id="atelies"
            className="relative mx-auto max-w-[1280px] pb-24 lg:pb-32"
            style={{ paddingTop: "clamp(72px, 9vw, 120px)" }}
        >
            <div className="px-12">
                <div className="mx-auto max-w-[480px] text-center">
                    <span className="mb-4 block text-[11px] uppercase tracking-[0.42em] text-gold">
                        Salões da semana
                    </span>
                    <h2
                        className="font-serif font-normal leading-tight text-on-surface"
                        style={{ fontSize: "clamp(30px, 3.8vw, 50px)" }}
                    >
                        Profissionais selecionados para realçar a sua beleza única.
                    </h2>
                </div>

                {professionals.length === 0 ? (
                    <div className="mt-16 border border-outline-variant px-8 py-20 text-center">
                        <p className="label-overline mb-4">Em breve</p>
                        <h3 className="font-serif text-3xl text-on-surface">
                            Nossa seleção está em formação.
                        </h3>
                        <p className="mt-6 text-sm text-on-surface-variant">
                            Volte em breve para conhecer os primeiros salões.
                        </p>
                    </div>
                ) : (
                    <div className="mt-16 grid grid-cols-1 items-start gap-9 sm:grid-cols-2 lg:grid-cols-3">
                        {professionals.map((pro, i) => {
                            const services = pro.employees.flatMap((e) => e.services);
                            const isPremium = pro.subscription?.plan === "PROFESSIONAL";

                            return (
                                <article
                                    key={pro.id}
                                    className={`group flex flex-col text-left ${COLUMN_OFFSET[i] ?? ""}`}
                                >
                                    <div className="relative aspect-4/5 w-full overflow-hidden rounded-[4px]">
                                        <Image
                                            src={pro.image || "/foto.webp"}
                                            alt={pro.name ?? "Ateliê"}
                                            fill
                                            className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>

                                    <div className="mt-[18px] flex items-start justify-between gap-3">
                                        <h3 className="font-serif text-[26px] font-normal text-on-surface">
                                            {pro.name}
                                        </h3>
                                        {isPremium && (
                                            <span className="mt-2 shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                                                Premium
                                            </span>
                                        )}
                                    </div>

                                    {pro.address && (
                                        <p className="mt-1 text-[13px] text-on-surface-dim">
                                            {pro.address}
                                        </p>
                                    )}

                                    {services.length > 0 && (
                                        <p className="mt-3 text-[14px] leading-[1.6] text-on-surface-variant">
                                            {services.slice(0, 3).map((s) => s.name).join(" · ")}
                                        </p>
                                    )}

                                    <Link
                                        href={`/salao/${pro.id}`}
                                        className="mt-4 text-[11px] uppercase tracking-[0.18em] text-gold underline underline-offset-4 transition-colors hover:text-gold-container"
                                    >
                                        Reservar
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                )}

                {professionals.length > 0 && (
                    <div className="mt-14 flex justify-center">
                        <Link
                            href="/saloes"
                            className="rounded-[3px] border border-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold-container hover:text-on-gold hover:border-gold-container"
                        >
                            Ver todos os salões →
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}