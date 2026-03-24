import { GridPlans } from "./_components/grid-plans";
import { SubscriptionDetail } from "./_components/subscription-detail";

export default async function PlansPage() {
    return (
        <div className="flex flex-col gap-10 p-8">
            <div>
                <h1 className="text-5xl font-serif font-bold text-white">
                    Assinaturas & Planos
                </h1>
                <p className="text-[#ffffff60] text-sm mt-3 max-w-md leading-relaxed">
                    Escolha a experiência que melhor se adapta ao seu ateliê. Mude de plano a
                    qualquer momento para desbloquear novas ferramentas de gestão.
                </p>
            </div>

            <SubscriptionDetail />
            <GridPlans />
        </div>
    );
}