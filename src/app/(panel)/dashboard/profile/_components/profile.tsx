import { getInfoUser } from "../_data-access/get-info-user";
import { getUserPlan } from "@/app/(panel)/dashboard/_data-access/get-plan";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileForm } from "./profile-form";

export async function Profile() {
    const [user, plan] = await Promise.all([
        getInfoUser(),
        getUserPlan(),
    ]);

    if (!user) {
        return (
            <p className="text-[var(--on-surface-dim)] text-xs tracking-widest uppercase">
                Usuário não encontrado.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-8 p-8">
            <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-serif font-bold text-[var(--on-surface)]">
                    Perfil
                </h1>
                <p className="text-[var(--on-surface-variant)] text-sm xl:text-base 2xl:text-lg mt-2">
                    Gerencie as informações do seu ateliê e horários de atendimento.
                </p>
            </div>

            <ProfileAvatar image={user.image} name={user.name} />

            <ProfileForm
                user={user}
                isProfessional={plan === "PROFESSIONAL"}
            />
        </div>
    );
}