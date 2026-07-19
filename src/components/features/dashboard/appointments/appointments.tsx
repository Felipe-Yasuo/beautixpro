import { Suspense } from "react";
import { getAppointments, resolveEmployeeTimes } from "@/lib/services/get-appointments";
import { getInfoUser } from "@/lib/services/get-info-user";
import { getUserPlan } from "@/lib/services/get-plan";
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
        <div
            className="overflow-hidden rounded-[10px]"
            style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
        >
            <div
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5"
                style={{ borderBottom: "1px solid var(--clima-border)" }}
            >
                <h2 className="font-serif font-normal" style={{ fontSize: "26px", color: "var(--clima-text)" }}>
                    Seus agendamentos
                </h2>
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