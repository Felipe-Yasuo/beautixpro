import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SubscriptionButton } from "./subscription-button";

const plans = [
    {
        name: "Basic",
        price: "R$ 29,90",
        period: "/mês",
        priceId: process.env.STRIPE_BASIC_PRICE_ID!,
        features: [
            "Agendamento online",
            "Até 5 serviços cadastrados",
            "Painel de gestão",
            "Link público do salão",
        ],
    },
    {
        name: "Professional",
        price: "R$ 59,90",
        period: "/mês",
        priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
        features: [
            "Tudo do Basic",
            "Serviços ilimitados",
            "Relatórios e métricas",
            "Suporte prioritário",
        ],
    },
];

export async function GridPlans() {
    const session = await auth();

    const subscription = session?.user?.id
        ? await prisma.subscription.findUnique({
            where: { userId: session.user.id },
        })
        : null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => {
                const isCurrentPlan = subscription?.plan === plan.name.toUpperCase();

                return (
                    <div
                        key={plan.name}
                        className={`border p-8 flex flex-col gap-6 ${isCurrentPlan
                            ? "border-[#c9a84c]"
                            : "border-[#c9a84c22] hover:border-[#c9a84c44] transition-colors"
                            }`}
                    >
                        {isCurrentPlan && (
                            <span className="text-[#c9a84c] text-[10px] tracking-widest uppercase border border-[#c9a84c33] px-2 py-0.5 w-fit">
                                ✦ Plano atual
                            </span>
                        )}

                        <div>
                            <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-2">
                                {plan.name}
                            </p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-light text-[#f0ead6]">
                                    {plan.price}
                                </span>
                                <span className="text-[#3a3028] text-sm">{plan.period}</span>
                            </div>
                        </div>

                        <ul className="flex flex-col gap-3">
                            {plan.features.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-3 text-[#5a5045] text-sm"
                                >
                                    <span className="text-[#c9a84c]">✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <SubscriptionButton
                            priceId={plan.priceId}
                            hasSubscription={!!subscription}
                        />
                    </div>
                );
            })}
        </div>
    );
}