import { GridPlans } from "./_components/grid-plans";
import { SubscriptionDetail } from "./_components/subscription-detail";

export default async function PlansPage() {
    return (
        <div className="flex flex-col gap-8 sm:gap-10">
            <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--on-surface)]">
                    Assinaturas & Planos
                </h1>
                <p className="text-[var(--on-surface-variant)] text-sm xl:text-base mt-3 max-w-md leading-relaxed">
                    Escolha a experiência que melhor se adapta ao seu salão. Mude de plano a
                    qualquer momento para desbloquear novas ferramentas de gestão.
                </p>
            </div>

            <SubscriptionDetail />
            <GridPlans />
        </div>
    );
}