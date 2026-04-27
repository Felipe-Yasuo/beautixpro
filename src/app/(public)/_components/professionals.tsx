import Image from "next/image";
import Link from "next/link";
import { getProfessionals } from "../_data-access/get-professionals";

export async function Professionals() {
    const professionals = await getProfessionals();

    return (
        <section
            id="atelies"
            className="relative border-t border-outline-variant bg-surface-lowest"
        >
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">

                <header className="mb-16 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-gold" />
                            <span className="label-overline text-gold">
                                Ateliês da semana
                            </span>
                        </div>
                        <h2 className="mt-6 font-serif text-5xl italic leading-tight text-on-surface lg:text-6xl">
                            Nossa
                            <br />
                            <span className="text-gradient-gold not-italic font-bold">
                                curadoria
                            </span>
                            .
                        </h2>
                    </div>
                    <p className="max-w-sm font-serif text-base italic text-on-surface-variant lg:col-span-4 lg:text-right">
                        Estúdios e profissionais escolhidos pela qualidade do trabalho
                        e do atendimento.
                    </p>
                </header>

                {professionals.length === 0 ? (
                    <div className="border border-outline-variant px-8 py-20 text-center">
                        <p className="label-overline mb-4">Em breve</p>
                        <h3 className="font-serif text-3xl italic text-on-surface">
                            Nossa curadoria está
                            <br />
                            em formação.
                        </h3>
                        <p className="mt-6 text-sm text-on-surface-variant">
                            Volte em breve para conhecer os primeiros ateliês.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                        {professionals.map((pro) => {
                            const services = pro.employees.flatMap((e) => e.services);
                            const isPremium = pro.subscription?.plan === "PROFESSIONAL";

                            return (
                                <article
                                    key={pro.id}
                                    className="group flex flex-col"
                                >

                                    <div className="relative aspect-4/5 w-full overflow-hidden">
                                        <div className="absolute inset-0 z-20 border border-gold/40 transition-colors duration-300 group-hover:border-gold" />
                                        <div
                                            className="absolute -inset-px z-10 border border-gold/15 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"
                                            style={{ transform: "translate(6px, 6px)" }}
                                        />
                                        <Image
                                            src={pro.image || "/foto.webp"}
                                            alt={pro.name ?? "Ateliê"}
                                            fill
                                            className="object-cover object-top grayscale-15 transition-all duration-500 group-hover:grayscale-0"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 z-10 bg-linear-to-t from-surface-lowest/70 via-transparent to-transparent" />

                                        {isPremium && (
                                            <span className="absolute right-3 top-3 z-30 label-overline bg-surface-lowest/80 px-2 py-1 text-gold backdrop-blur-sm">
                                                ★ Premium
                                            </span>
                                        )}
                                    </div>


                                    <div className="mt-6 flex flex-1 flex-col">
                                        <h3 className="font-serif text-2xl italic text-on-surface">
                                            {pro.name}
                                        </h3>
                                        {pro.address && (
                                            <p className="mt-1 font-serif text-sm italic text-on-surface-variant">
                                                {pro.address}
                                            </p>
                                        )}

                                        {services.length > 0 && (
                                            <ul className="mt-5 flex flex-col border-t border-outline-variant">
                                                {services.slice(0, 3).map((service) => (
                                                    <li
                                                        key={service.name}
                                                        className="border-b border-outline-variant py-2 font-serif text-sm text-on-surface"
                                                    >
                                                        {service.name}
                                                    </li>
                                                ))}
                                                {services.length > 3 && (
                                                    <li className="py-2 label-overline text-gold">
                                                        + {services.length - 3} outros serviços
                                                    </li>
                                                )}
                                            </ul>
                                        )}

                                        <Link
                                            href={`/salao/${pro.id}`}
                                            className="btn-ghost mt-6 text-center"
                                        >
                                            Reservar
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
