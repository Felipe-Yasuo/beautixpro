import { getInfoUser } from "@/lib/services/get-info-user";
import { getUserPlan } from "@/lib/services/get-plan";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileForm } from "./profile-form";

export async function Profile() {
    const [user, plan] = await Promise.all([
        getInfoUser(),
        getUserPlan(),
    ]);

    if (!user) {
        return (
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--clima-text-subtle)" }}>
                Usuário não encontrado.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-8" style={{ padding: "34px 40px 48px" }}>
            <div>
                <h1
                    className="font-serif font-normal"
                    style={{ fontSize: "clamp(36px, 4vw, 50px)", color: "var(--clima-text)" }}
                >
                    Perfil
                </h1>
                <p className="mt-2 text-[16px]" style={{ color: "var(--clima-text-muted)" }}>
                    Gerencie as informações do seu ateliê e horários de atendimento.
                </p>
            </div>

            <ProfileAvatar image={user.image} name={user.name} />

            <ProfileForm user={user} isProfessional={plan === "PROFESSIONAL"} />
        </div>
    );
}