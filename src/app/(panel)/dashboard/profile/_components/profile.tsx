import { getInfoUser } from "../_data-access/get-info-user";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileForm } from "./profile-form";

export async function Profile() {
    const user = await getInfoUser();

    if (!user) {
        return (
            <p className="text-[#ffffff30] text-xs tracking-widest uppercase">
                Usuário não encontrado.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-8 p-8">
            <div>
                <h1 className="text-5xl font-serif font-bold text-white">Perfil</h1>
                <p className="text-[#ffffff60] text-sm mt-2">
                    Gerencie as informações do seu ateliê e horários de atendimento.
                </p>
            </div>

            <ProfileAvatar image={user.image} name={user.name} />

            <ProfileForm user={user} />
        </div>
    );
}