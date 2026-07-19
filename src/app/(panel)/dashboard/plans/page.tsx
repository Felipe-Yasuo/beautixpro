import { GridPlans } from "@/components/features/plans/grid-plans";
import { SubscriptionDetail } from "@/components/features/plans/subscription-detail";

export default async function PlansPage() {
    return (
        <div className="flex flex-col gap-8" style={{ padding: "34px 40px 48px" }}>
            <div>
                <h1
                    className="font-serif font-normal"
                    style={{ fontSize: "clamp(36px, 4vw, 50px)", color: "var(--clima-text)" }}
                >
                    Assinaturas &amp; Planos
                </h1>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed" style={{ color: "var(--clima-text-muted)" }}>
                    Escolha a experiência que melhor se adapta ao seu salão. Mude de plano
                    a qualquer momento para desbloquear novas ferramentas de gestão.
                </p>
            </div>

            <SubscriptionDetail />
            <GridPlans />
        </div>
    );
}