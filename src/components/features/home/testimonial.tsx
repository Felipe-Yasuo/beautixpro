type Testimonial = {
    quote: string;
    name: string;
    time: string;
};

const TESTIMONIALS: Testimonial[] = [
    {
        quote: "Nunca mais fiquei esperando resposta no WhatsApp. Escolhi o horário, confirmou na hora.",
        name: "Sarah Oliveira",
        time: "1 mês",
    },
    {
        quote: "Como dona de salão, o painel organizou minha semana. A agenda de papel aposentou.",
        name: "Emília Reis",
        time: "3 semanas",
    },
    {
        quote: "Achei uma colorista incrível a dois quarteirões de casa. Reservei no intervalo do almoço.",
        name: "Jane Porto",
        time: "2 dias",
    },
];

export function Testimonials() {
    return (
        <section style={{ backgroundColor: "var(--gold)" }}>
            <div
                className="mx-auto max-w-[1280px] px-6 lg:px-12"
                style={{ paddingTop: "clamp(64px, 8vw, 100px)", paddingBottom: "clamp(64px, 8vw, 100px)" }}
            >
                <div className="grid grid-cols-1 gap-[26px] sm:grid-cols-3">
                    {TESTIMONIALS.map((t) => (
                        <TestimonialCard key={t.name} {...t} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ quote, name, time }: Testimonial) {
    return (
        <div className="rounded-[4px] p-9 text-center" style={{ backgroundColor: "#f4ddd2" }}>
            <p className="tracking-[0.3em]" style={{ fontSize: "13px", color: "var(--gold-container)" }}>
                ★★★★★
            </p>

            <p className="mx-auto mt-4 mb-6" style={{ fontSize: "14px", lineHeight: 1.7, color: "#5c4436" }}>
                {quote}
            </p>

            <p className="font-serif tracking-[0.06em] text-on-surface" style={{ fontSize: "17px" }}>
                {name}
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "#a08265" }}>
                — há {time} —
            </p>
        </div>
    );
}