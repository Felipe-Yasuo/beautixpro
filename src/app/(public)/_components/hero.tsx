import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative flex items-center justify-between px-12 min-h-[88vh] overflow-hidden">

            {/* Texto */}
            <div className="flex flex-col gap-7 max-w-lg z-10">
                <h1 className="text-6xl font-light leading-[1.1] text-[#f0ead6]">
                    Eleve sua{" "}
                    <span className="text-[#c9a84c] italic">beleza</span>
                    <br />
                    ao próximo nível
                </h1>

                <p className="text-[#5a5045] text-sm leading-relaxed max-w-sm">
                    Conectamos você aos melhores profissionais de beleza da sua cidade.
                    Agendamento online, rápido e sem complicação.
                </p>

                <div className="flex items-center gap-4 mt-2">
                    <Link
                        href="#saloes"
                        className="bg-[#c9a84c] text-black px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#e8c97a] transition-colors"
                    >
                        Encontrar salão
                    </Link>
                    <Link
                        href="/login"
                        className="border border-[#c9a84c33] text-[#c9a84c] px-8 py-3 text-xs tracking-widest uppercase hover:border-[#c9a84c] transition-colors"
                    >
                        Sou profissional
                    </Link>
                </div>

                {/* Badge */}
                <div className="flex items-center gap-4 mt-4 border-t border-[#c9a84c22] pt-6">
                    <div className="text-center">
                        <p className="text-[#c9a84c] text-2xl font-light">500+</p>
                        <p className="text-[#3a3028] text-xs tracking-widest uppercase">Salões</p>
                    </div>
                    <div className="w-px h-8 bg-[#c9a84c22]" />
                    <div className="text-center">
                        <p className="text-[#c9a84c] text-2xl font-light">12k+</p>
                        <p className="text-[#3a3028] text-xs tracking-widest uppercase">Agendamentos</p>
                    </div>
                    <div className="w-px h-8 bg-[#c9a84c22]" />
                    <div className="text-center">
                        <p className="text-[#c9a84c] text-2xl font-light">4.9★</p>
                        <p className="text-[#3a3028] text-xs tracking-widest uppercase">Avaliação</p>
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
                {/* Gradiente para fundir com o fundo */}
                <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a20] to-transparent" />
            </div>

        </section>
    );
}