import { GridPlans } from "./_components/grid-plans";
import { SubscriptionDetail } from "./_components/subscription-detail";

export default async function PlansPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Assinatura
                </p>
                <h1 className="text-3xl font-light text-[#f0ead6] mt-1">Planos</h1>
            </div>

            <SubscriptionDetail />
            <GridPlans />
        </div>
    );
}