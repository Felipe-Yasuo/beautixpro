import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-foreground text-lg font-semibold">
                    Agendamentos
                </CardTitle>
                <Suspense>
                    <ButtonDate />
                </Suspense>
            </CardHeader>
            <CardContent className="p-0">
                <AppointmentsList
                    appointments={appointments}
                    times={user?.times ?? []}
                />
            </CardContent>
        </Card>
    );
}