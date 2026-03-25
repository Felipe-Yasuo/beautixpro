import { Suspense } from "react";
import { getAppointments, resolveEmployeeTimes } from "../../_data-access/get-appointments";
import { getInfoUser } from "../../profile/_data-access/get-info-user";
import { getUserPlan } from "@/lib/get-plan";
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
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--outline)]">
                <h2 className="text-xl font-bold text-foreground">Seus Agendamentos</h2>
                <div className="flex items-center gap-3">
                    <Suspense>
                        <ButtonDate />
                    </Suspense>
                </div>
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