import { getAllServices } from "../_data-access/get-all-services";
import { getUserPlan, UserPlan } from "@/app/(panel)/dashboard/_data-access/get-plan";
import { getInfoUser } from "../../profile/_data-access/get-info-user";
import { ServicesList } from "./services-list";

const SERVICE_LIMITS: Record<UserPlan, number> = {
    FREE: 3,
    BASIC: 10,
    PROFESSIONAL: Infinity,
};

export async function ServiceContent() {
    const [services, plan, user] = await Promise.all([
        getAllServices(),
        getUserPlan(),
        getInfoUser(),
    ]);

    const isProfessional = plan === "PROFESSIONAL";
    const limit = SERVICE_LIMITS[plan];
    const atLimit = services.length >= limit;
    const limitLabel = limit === Infinity ? "∞" : limit;
    const employees = user?.employees ?? [];

    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-5xl font-serif font-bold text-[var(--on-surface)]">
                        Serviços
                    </h1>
                    <p className="text-[var(--on-surface-variant)] text-sm mt-2 max-w-sm leading-relaxed">
                        Gerencie o catálogo de luxo do seu ateliê. Defina preços,
                        durações e a disponibilidade de cada experiência.
                    </p>
                </div>

                {limit !== Infinity && (
                    <span className={`text-xs tracking-widest uppercase mt-2 ${atLimit ? "text-red-400" : "text-[var(--on-surface-dim)]"}`}>
                        {services.length}/{limitLabel} serviços
                    </span>
                )}
            </div>

            <ServicesList
                services={services}
                employees={employees}
                isProfessional={isProfessional}
                atLimit={atLimit}
            />
        </div>
    );
}