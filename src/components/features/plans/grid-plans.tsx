import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SubscriptionButton } from "./subscription-button";
import { CheckCircle2, XCircle } from "lucide-react";

type Feature = { text: string; positive: boolean; bold?: boolean };

const plans: {
    name: string;
    label: string;
    priceDisplay: string;
    period: string;
    priceId: string;
    features: Feature[];
}[] = [
        {
            name: "Basic",
            label: "Essencial",
            priceDisplay: "29,90",
            period: "/mês",
            priceId: process.env.STRIPE_BASIC_PRICE_ID!,
            features: [
                { text: "Até 10 serviços cadastrados", positive: true },
                { text: "Sem acesso aos relatórios", positive: false },
                { text: "Sem registro de funcionários", positive: false },
                { text: "Menos destaque na vitrine", positive: false },
            ],
        },
        {
            name: "Professional",
            label: "Recomendado",
            priceDisplay: "59,90",
            period: "/mês",
            priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
            features: [
                { text: "Serviços ilimitados", positive: true },
                { text: "Lembretes automáticos via WhatsApp", positive: true },
                { text: "Múltiplos funcionários", positive: true },
                { text: "Suporte prioritário 24/7", positive: true, bold: true },
                { text: "Acesso aos relatórios do salão", positive: true },
            ],
        },
    ];

export async function GridPlans() {
    const session = await auth();

    const subscription = session?.user?.id
        ? await prisma.subscription.findUnique({ where: { userId: session.user.id } })
        : null;

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {plans.map((plan) => {
                const isCurrentPlan = subscription?.plan === plan.name.toUpperCase();
                const isPro = plan.name === "Professional";

                return (
                    <div
                        key={plan.name}
                        className="relative flex flex-col gap-6 rounded-[10px] p-8"
                        style={{
                            backgroundColor: "var(--clima-surface)",
                            border: `1px solid ${isCurrentPlan ? "var(--clima-accent)" : "var(--clima-border)"}`,
                        }}
                    >
                        {isCurrentPlan && (
                            <div
                                className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white"
                                style={{ backgroundColor: "var(--clima-accent)" }}
                            >
                                <span>★</span>
                                Plano atual
                            </div>
                        )}

                        <div>
                            <p
                                className="mb-2 text-[10px] uppercase tracking-widest"
                                style={{ color: isPro ? "var(--clima-accent)" : "var(--clima-text-muted)" }}
                            >
                                {plan.label}
                            </p>
                            <h2 className="font-serif text-4xl font-normal" style={{ color: "var(--clima-text)" }}>
                                {plan.name}
                            </h2>
                        </div>

                        <div className="flex items-baseline gap-1">
                            <span className="text-sm" style={{ color: "var(--clima-text-muted)" }}>R$</span>
                            <span className="font-serif text-5xl" style={{ color: "var(--clima-text)" }}>
                                {plan.priceDisplay}
                            </span>
                            <span className="text-sm" style={{ color: "var(--clima-text-muted)" }}>{plan.period}</span>
                        </div>

                        <ul className="flex flex-1 flex-col gap-3">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    {feature.positive ? (
                                        <CheckCircle2 size={16} className="shrink-0" style={{ color: "var(--clima-accent)" }} />
                                    ) : (
                                        <XCircle size={16} className="shrink-0" style={{ color: "var(--clima-text-subtle)" }} />
                                    )}
                                    <span
                                        className="text-sm"
                                        style={{
                                            color: feature.positive ? "var(--clima-text)" : "var(--clima-text-subtle)",
                                            fontWeight: feature.bold ? 600 : 400,
                                        }}
                                    >
                                        {feature.text}
                                    </span>
                                </li>
                            ))}
                        </ul>

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