import { getAllServices } from "../_data-access/get-all-services";
import { getUserPlan } from "@/lib/get-plan";
import { DialogService } from "./dialog-service";
import { ServicesList } from "./services-list";

const SERVICE_LIMITS = {
    FREE: 3,
    BASIC: 10,
    PROFESSIONAL: Infinity,
};

export async function ServiceContent() {
    const [services, plan] = await Promise.all([
        getAllServices(),
        getUserPlan(),
    ]);

    const limit = SERVICE_LIMITS[plan];
    const atLimit = services.length >= limit;
    const limitLabel = limit === Infinity ? "∞" : limit;

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

                <div className="flex flex-col items-end gap-2">
                    {limit !== Infinity && (
                        <span className={`text-xs tracking-widest uppercase ${atLimit
                                ? "text-red-400"
                                : "text-[var(--on-surface-dim)]"
                            }`}>
                            {services.length}/{limitLabel} serviços
                        </span>
                    )}

                    {atLimit ? (
                        <a
                            href="/dashboard/plans"
                            className="btn-primary text-[10px] px-4 py-2.5"
                        >
                            Fazer upgrade
                        </a>
                    ) : (
                        <DialogService
                            trigger={
                                <button className="btn-primary flex items-center gap-2">
                                    + Novo Serviço
                                </button>
                            }
                        />
                    )}
                </div>
            </div>

            <ServicesList services={services} />
        </div>
    );
}