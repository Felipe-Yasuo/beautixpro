import { getInfoUser } from "../_data-access/get-info-user";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileForm } from "./profile-form";

export async function Profile() {
    const user = await getInfoUser();

    if (!user) {
        return (
            <p className="text-[#3a3028] text-xs tracking-widest uppercase">
                Usuário não encontrado.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-10">
            <div>
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Configurações
                </p>
                <h1 className="text-3xl font-light text-[#f0ead6] mt-1">Perfil</h1>
            </div>

            <ProfileAvatar image={user.image} name={user.name} />

            <ProfileForm user={user} />
        </div>
    );
}