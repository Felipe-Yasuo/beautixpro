import { Suspense } from "react";
import { getAppointments } from "../../_data-access/get-appointments";
import { AppointmentsList } from "./appointments-list";
import { ButtonDate } from "./button-date";

interface AppointmentsProps {
    date: Date;
}

export async function Appointments({ date }: AppointmentsProps) {
    const appointments = await getAppointments(date);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                        Agenda
                    </p>
                    <h1 className="text-3xl font-light text-[#f0ead6] mt-1">
                        Agendamentos
                    </h1>
                </div>
                <Suspense>
                    <ButtonDate />
                </Suspense>
            </div>

            <AppointmentsList appointments={appointments} />
        </div>
    );
}