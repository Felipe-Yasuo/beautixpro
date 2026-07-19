import Link from "next/link";

type Plan = {
    name: string;
    price: string;
    features: string[];
    cta: string;
    href: string;
    highlighted?: boolean;
};

const PLANS: Plan[] = [
    {
        name: "Free",
        price: "Grátis",
        features: ["1 profissional", "Até 5 serviços", "Página de agendamento", "Agenda online"],
        cta: "Criar conta",
        href: "/login",
    },
    {
        name: "Professional",
        price: "R$ 99",
        features: ["Profissionais ilimitados", "Relatórios de receita", "Múltiplas unidades", "Suporte prioritário"],
        cta: "Assinar Pro",
        href: "/login",
        highlighted: true,
    },
    {
        name: "Basic",
        price: "R$ 49",
        features: ["Até 3 profissionais", "Serviços ilimitados", "Lembretes automáticos", "Suporte por e-mail"],
        cta: "Assinar Basic",
        href: "/login",
    },
];

export function Plans() {
    return (
        <section id="planos" className="bg-surface-low">
            <div
                className="mx-auto max-w-[1280px] px-6 lg:px-12"
                style={{ paddingTop: "clamp(72px, 9vw, 120px)", paddingBottom: "clamp(72px, 9vw, 120px)" }}
            >
                <div className="mb-14 text-center">
                    <span className="mb-4 block text-[11px] uppercase tracking-[0.42em] text-gold">Planos</span>
                    <h2 className="font-serif font-normal text-on-surface" style={{ fontSize: "clamp(30px, 3.8vw, 48px)" }}>
                        Cresça no seu ritmo.
                    </h2>
                    <p className="mt-3 text-[15px] text-on-surface-dim">Sem fidelidade — cancele quando quiser.</p>
                </div>

                <div className="grid grid-cols-1 items-stretch gap-[26px] lg:grid-cols-3">
                    {PLANS.map((plan) => (
                        <PlanCard key={plan.name} plan={plan} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PlanCard({ plan }: { plan: Plan }) {
    const { name, price, features, cta, href, highlighted } = plan;

    if (highlighted) {
        return (
            <div
                className="relative flex flex-col gap-[18px] rounded-[6px] p-10 shadow-2xl"
                style={{ backgroundColor: "#241b15", color: "#f6ede3" }}
            >
                <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.24em]" style={{ color: "#dbb99b" }}>
                        {name}
                    </span>
                    <span
                        className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase"
                        style={{ backgroundColor: "#dbb99b", color: "#241b15" }}
                    >
                        Mais escolhido
                    </span>
                </div>

                <div className="flex items-baseline gap-1">
                    <span className="font-serif" style={{ fontSize: "46px", lineHeight: 0.9, color: "#fff8f0" }}>
                        {price}
                    </span>
                    <span className="text-[13px]" style={{ color: "rgba(246,237,227,0.6)" }}>/mês</span>
                </div>

                <ul className="flex flex-col text-[14px]" style={{ lineHeight: 1.9, color: "rgba(246,237,227,0.8)" }}>
                    {features.map((feature, i) => (
                        <li
                            key={feature}
                            className={i === 0 ? "pt-[18px]" : ""}
                            style={{ borderTop: i === 0 ? "1px dashed rgba(219,185,155,0.35)" : "none" }}
                        >
                            {feature}
                        </li>
                    ))}
                </ul>

                <Link href={href} className="btn-primary mt-2 text-center">
                    {cta}
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[18px] rounded-[6px] p-10" style={{ backgroundColor: "#fffaf3", border: "1px solid #eadfce" }}>
            <span className="text-[11px] uppercase tracking-[0.24em]" style={{ color: "#a08265" }}>
                {name}
            </span>

            <div className="flex items-baseline gap-1">
                <span className="font-serif text-on-surface" style={{ fontSize: "46px", lineHeight: 0.9 }}>
                    {price}
                </span>
                {price !== "Grátis" && <span className="text-[13px]" style={{ color: "#a08265" }}>/mês</span>}
            </div>

            <ul className="flex flex-col text-[14px] text-on-surface-variant" style={{ lineHeight: 1.9 }}>
                {features.map((feature, i) => (
                    <li key={feature} className={i === 0 ? "pt-[18px]" : ""} style={{ borderTop: i === 0 ? "1px dashed #d9c3ae" : "none" }}>
                        {feature}
                    </li>
                ))}
            </ul>

            <Link
                href={href}
                className="mt-2 rounded-[3px] border border-on-surface py-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface transition-colors hover:bg-on-surface hover:text-[#fffaf3]"
            >
                {cta}
            </Link>
        </div>
    );
}