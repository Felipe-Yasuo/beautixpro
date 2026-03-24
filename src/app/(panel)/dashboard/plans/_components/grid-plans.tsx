// _components/grid-plans.tsx
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SubscriptionButton } from "./subscription-button";
import { CheckCircle } from "lucide-react";

const plans = [
    {
        name: "Basic",
        label: "Essencial",
        priceDisplay: "29,90",
        period: "/mês",
        priceId: process.env.STRIPE_BASIC_PRICE_ID!,
        features: [
            "Gestão de até 50 clientes mensais",
            "Agenda digital sincronizada",
            "Lembretes via E-mail",
            "Portfólio digital básico",
        ],
    },
    {
        name: "Professional",
        label: "Recomendado",
        priceDisplay: "59,90",
        period: "/mês",
        priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
        features: [
            "Clientes ilimitados",
            "Lembretes automáticos via WhatsApp",
            "Analytics avançado de faturamento",
            { text: "Suporte prioritário 24/7", bold: true },
            "Personalização de Branding",
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
                const isCurrentPlan =
                    subscription?.plan === plan.name.toUpperCase();
                const isPro = plan.name === "Professional";

                return (
                    <div
                        key={plan.name}
                        className={`relative bg-[#141414] rounded-xl flex flex-col gap-6 p-8 border transition-colors ${isCurrentPlan
                                ? "border-[#c9a84c]"
                                : isPro
                                    ? "border-[#c9a84c55] hover:border-[#c9a84c88]"
                                    : "border-[#2a2a2a] hover:border-[#c9a84c33]"
                            }`}
                    >
                        {/* Badge plano atual */}
                        {isCurrentPlan && (
                            <div className="absolute top-4 right-4 bg-[#c9a84c] text-black text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                                <span>✦</span>
                                Plano Atual
                            </div>
                        )}

                        {/* Header */}
                        <div>
                            <p className="text-[#ffffff40] text-[10px] tracking-widest uppercase mb-2">
                                {plan.label}
                            </p>
                            <h2 className={`text-4xl font-serif font-bold ${isPro ? "text-[#c9a84c]" : "text-white"}`}>
                                {plan.name}
                            </h2>
                        </div>

                        {/* Preço */}
                        <div className="flex items-baseline gap-1">
                            <span className="text-[#ffffff60] text-sm">R$</span>
                            <span className={`text-5xl font-bold ${isPro ? "text-[#c9a84c]" : "text-white"}`}>
                                {plan.priceDisplay}
                            </span>
                            <span className="text-[#ffffff40] text-sm">{plan.period}</span>
                        </div>

                        {/* Features */}
                        <ul className="flex flex-col gap-3 flex-1">
                            {plan.features.map((feature, i) => {
                                const text = typeof feature === "string" ? feature : feature.text;
                                const bold = typeof feature === "object" && feature.bold;
                                return (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle
                                            size={16}
                                            className="text-[#c9a84c] shrink-0"
                                        />
                                        <span className={`text-sm ${bold ? "font-semibold text-white" : "text-[#ffffff60]"}`}>
                                            {text}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Botão */}
                        <SubscriptionButton
                            priceId={plan.priceId}
                            hasSubscription={!!subscription}
                            isCurrentPlan={isCurrentPlan}
                            isPro={isPro}
                        />
                    </div>
                );
            })}
        </div>
    );
}