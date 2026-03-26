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
            <div className="flex items-center justify-center min-h-screen bg-background">
                <p className="text-muted-foreground text-sm">
                    Salão não encontrado.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header com foto */}
            <div className="bg-primary h-32 w-full relative" />
            <div className="flex flex-col items-center -mt-16 pb-10">
                <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                        src={user.image ?? "/foto.webp"}
                        alt={user.name ?? "Salão"}
                        fill
                        className="object-cover rounded-full border-4 border-background"
                    />
                </div>
                <h1 className="text-xl font-bold text-foreground mt-4">{user.name}</h1>
                {user.address && (
                    <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
                        📍 {user.address}
                    </p>
                )}

                {/* Formulário */}
                <div className="w-full max-w-lg mt-8 px-4">
                    <ScheduleForm user={user} />
                </div>
            </div>
        </div>
    );
}