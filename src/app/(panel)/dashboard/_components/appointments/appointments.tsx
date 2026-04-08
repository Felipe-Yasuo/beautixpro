import { Suspense } from "react";
import { getAppointments, resolveEmployeeTimes } from "../../_data-access/get-appointments";
import { getInfoUser } from "../../profile/_data-access/get-info-user";
import { getUserPlan } from "@/app/(panel)/dashboard/_data-access/get-plan";
import { AppointmentsList } from "./appointments-list";
import { ButtonDate } from "./button-date";

interface AppointmentsProps {
    date: Date;
    employeeId?: string;
}

export async function Appointments({ date, employeeId }: AppointmentsProps) {
    const [appointments, user, plan] = await Promise.all([
        getAppointments(date, employeeId),
        getInfoUser(),
        getUserPlan(),
    ]);

    const isProfessional = plan === "PROFESSIONAL";
    const employees = user?.employees ?? [];
    const times = resolveEmployeeTimes(isProfessional, employees, employeeId, user?.times);

    return (
        <div className="bg-[var(--surface-low)] border border-[var(--outline)] rounded-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--outline)]">
                <h2 className="text-lg sm:text-xl xl:text-2xl font-bold text-foreground">Seus Agendamentos</h2>
                <Suspense>
                    <ButtonDate />
                </Suspense>
            </div>
            <AppointmentsList
                appointments={appointments}
                times={times}
                employees={employees}
                selectedEmployeeId={employeeId}
                isProfessional={isProfessional}
            />
        </div>
    );
}