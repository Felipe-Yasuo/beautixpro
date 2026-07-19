export function HowItWorks() {
    return (
        <section id="como-funciona" className="relative">
            {/* Bloco de foto */}
            <div className="relative h-[420px] w-full overflow-hidden">
                <img
                    src="/manicure.png"
                    alt="Manicure em andamento"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ filter: "saturate(0.9)" }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(43,33,27,0.72) 0%, rgba(43,33,27,0.28) 55%, rgba(43,33,27,0.1) 100%)",
                    }}
                />

                <div className="absolute inset-x-0 top-16 text-center">
                    <span
                        className="mb-4 block text-[11px] uppercase tracking-[0.42em]"
                        style={{ color: "rgba(255,248,240,0.85)" }}
                    >
                        Como funciona
                    </span>
                    <h2
                        className="mx-auto px-6 font-serif font-normal"
                        style={{
                            fontSize: "clamp(30px, 3.8vw, 48px)",
                            color: "#fff8f0",
                        }}
                    >
                        Três passos, nenhuma ligação.
                    </h2>
                </div>
            </div>

            {/* Card de passos sobreposto */}
            <div className="relative px-6 pb-24 lg:px-12 lg:pb-32">
                <div
                    className="relative z-10 mx-auto grid max-w-[1080px] grid-cols-1 rounded-[4px] bg-[#fffaf3] shadow-2xl sm:grid-cols-3"
                    style={{ marginTop: "-150px" }}
                >
                    <Step
                        number="01/"
                        title="Escolha o salão"
                        text="Explore profissionais, serviços, preços e horários perto de você."
                    />
                    <Step
                        number="02/"
                        title="Reserve o horário"
                        text="Serviço, data e horário em menos de um minuto. Sem criar conta."
                        divider
                    />
                    <Step
                        number="03/"
                        title="Pronto, confirmado"
                        text="O salão aprova em tempo real e você recebe o aviso na hora."
                        divider
                    />
                </div>
            </div>
        </section>
    );
}

function Step({
    number,
    title,
    text,
    divider,
}: {
    number: string;
    title: string;
    text: string;
    divider?: boolean;
}) {
    return (
        <div
            className={`px-9 py-11 text-center ${divider ? "sm:border-l" : ""}`}
            style={divider ? { borderLeft: "1px dashed #d9c3ae" } : undefined}
        >
            <p className="font-serif text-gold" style={{ fontSize: "20px" }}>
                {number}
            </p>
            <h3
                className="mt-2 font-serif font-normal text-on-surface"
                style={{ fontSize: "23px" }}
            >
                {title}
            </h3>
            <p
                className="mx-auto mt-3 max-w-[26ch] text-on-surface-variant"
                style={{ fontSize: "14px", lineHeight: 1.6 }}
            >
                {text}
            </p>
        </div>
    );
}