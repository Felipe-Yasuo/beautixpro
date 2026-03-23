import { Suspense } from "react";
import { getAppointments } from "../../_data-access/get-appointments";
import { getInfoUser } from "../../profile/_data-access/get-info-user";
import { AppointmentsList } from "./appointments-list";
import { ButtonDate } from "./button-date";

interface AppointmentsProps {
    date: Date;
}

export async function Appointments({ date }: AppointmentsProps) {
    const [appointments, user] = await Promise.all([
        getAppointments(date),
        getInfoUser(),
    ]);

    return (
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a2a]">
                <h2 className="text-xl font-bold text-foreground">Seus Agendamentos</h2>
                <Suspense>
                    <ButtonDate />
                </Suspense>
            </div>
            <AppointmentsList
                appointments={appointments}
                times={user?.times ?? []}
            />
        </div>
    );
}