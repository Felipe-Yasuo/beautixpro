import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section
            className="relative"
            style={{ paddingTop: "clamp(24px, 4vw, 64px)" }}
        >
            <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 pb-20 min-[921px]:grid-cols-[1.05fr_0.95fr] min-[921px]:items-center min-[921px]:gap-16 lg:px-12 lg:pb-28">
                <div className="relative flex flex-col justify-center">
                    <svg
                        className="pointer-events-none absolute z-0"
                        style={{
                            left: "-30px",
                            top: "30px",
                            width: "150px",
                            height: "200px",
                            opacity: 0.35,
                        }}
                        viewBox="0 0 150 200"
                        fill="none"
                    >
                        <path
                            d="M60 10 C30 25 25 45 40 60 C55 75 50 95 30 100"
                            stroke="#a08265"
                            strokeWidth="1.2"
                        />
                        <circle cx="60" cy="10" r="3" stroke="#a08265" strokeWidth="1.2" />
                    </svg>

                    <span className="relative z-10 mb-4 text-[11px] uppercase tracking-[0.42em] text-gold">
                        Beleza | Agendamentos
                    </span>

                    <h1
                        className="relative z-10 font-serif font-normal leading-[1.05] tracking-[-0.01em] text-on-surface"
                        style={{ fontSize: "clamp(44px, 5.6vw, 84px)" }}
                    >
                        Sua beleza,
                        <br />
                        no <span className="italic text-gold">seu</span> horário.
                    </h1>

                    <p className="relative z-10 mt-6 max-w-[460px] text-[17px] leading-[1.6] text-on-surface-variant">
                        Encontre salões e profissionais de beleza com agenda aberta,
                        reserve em segundos e receba a confirmação na hora.
                    </p>

                    <div className="relative z-10 mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                        <Link href="#atelies" className="btn-primary text-center">
                            Agendar agora
                        </Link>
                        <Link
                            href="#como-funciona"
                            className="btn-ghost text-center"
                        >
                            Como funciona
                        </Link>
                    </div>

                    {/* Citação — avatar + aspas + texto itálico */}
                    <div className="relative z-10 mt-10 flex items-start gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                            <Image
                                src="/foto.webp"
                                alt="Cliente BeautixPro"
                                fill
                                className="object-cover"
                                sizes="44px"
                            />
                        </div>
                        <div className="flex gap-1">
                            <span
                                className="font-serif text-gold"
                                style={{ fontSize: "34px", lineHeight: 0.7 }}
                            >
                                &ldquo;
                            </span>
                            <p
                                className="italic text-on-surface-variant"
                                style={{ fontSize: "16px", lineHeight: 1.55 }}
                            >
                                Marquei coloração no caminho do trabalho. Quando
                                <br />
                                cheguei em casa, já estava confirmado.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative min-h-[340px] min-[921px]:min-h-[520px]">
                    <div
                        className="pointer-events-none absolute -top-10 -left-10 h-64 w-64 opacity-45"
                        style={{ background: "#c99a72", borderRadius: "58% 42% 55% 45% / 50% 55% 45% 50%" }}
                    />
                    <div
                        className="pointer-events-none absolute -right-6 -bottom-8 h-40 w-40 opacity-40"
                        style={{ background: "#cdd3bc", borderRadius: "45% 55% 42% 58% / 55% 45% 55% 45%" }}
                    />
                    <div
                        className="pointer-events-none absolute top-1/4 -right-8 h-24 w-24 opacity-35"
                        style={{ background: "#c99a72", borderRadius: "50% 50% 40% 60% / 55% 45% 55% 45%" }}
                    />

                    <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem_2rem_2rem_5rem] border border-gold/30" />

                    <div className="relative h-full min-h-[340px] w-full min-[921px]:min-h-[520px]">
                        <div
                            className="absolute overflow-hidden rounded-[2rem_2rem_2rem_5rem]"
                            style={{
                                top: "-40px",
                                right: "-56px",
                                bottom: "-20px",
                                left: "-10px",
                                width: "calc(100% + 66px)",
                                height: "calc(100% + 60px)",
                            }}
                        >
                            <Image
                                src="/hero.png"
                                alt="Ateliê de beleza"
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 921px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}