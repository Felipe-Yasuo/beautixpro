import { getAllServices } from "@/lib/services/get-all-services";
import { getUserPlan, UserPlan } from "@/lib/services/get-plan";
import { getInfoUser } from "@/lib/services/get-info-user";
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
    const employees = user?.employees ?? [];

    return (
        <ServicesList
            services={services}
            employees={employees}
            isProfessional={isProfessional}
            atLimit={atLimit}
        />
    );
}