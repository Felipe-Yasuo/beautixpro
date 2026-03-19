import Image from "next/image";
import { getInfoSchedule } from "../_data-access/get-info-schedule";
import { ScheduleForm } from "./schedule-form";

interface ScheduleContentProps {
    userId: string;
}

export async function ScheduleContent({ userId }: ScheduleContentProps) {
    const user = await getInfoSchedule(userId);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-[#3a3028] text-sm tracking-widest uppercase">
                    Salão não encontrado.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] px-12 py-16">
            {/* Info do salão */}
            <div className="flex items-center gap-6 mb-16 pb-8 border-b border-[#c9a84c22]">
                <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                        src={user.image ?? "/foto.png"}
                        alt={user.name ?? "Salão"}
                        fill
                        className="object-cover rounded-full"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-light text-[#f0ead6]">{user.name}</h1>
                    {user.address && (
                        <p className="text-[#3a3028] text-sm mt-1">{user.address}</p>
                    )}
                </div>
            </div>

            {/* Formulário */}
            <ScheduleForm user={user} />
        </div>
    );
}