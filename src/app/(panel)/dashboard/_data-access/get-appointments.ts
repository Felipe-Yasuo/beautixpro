import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export function resolveEmployeeTimes(
    isProfessional: boolean,
    employees: { id: string; times: string[] }[],
    employeeId?: string,
    userTimes: string[] = []
): string[] {
    if (!isProfessional) return userTimes;
    const selected = employees.find((e) => e.id === employeeId) ?? employees[0];
    return selected?.times ?? [];
}

export async function getAppointments(date: Date, employeeId?: string) {
    const session = await auth();
    if (!session?.user?.id) return [];

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                userId: session.user.id,
                appointmentDate: { gte: start, lte: end },
                ...(employeeId ? { employeeId } : {}),
            },
            include: {
                service: {
                    select: { name: true, price: true, duration: true },
                },
                employee: {
                    select: { id: true, name: true },
                },
            },
            orderBy: { time: "asc" },
        });

        return appointments;
    } catch {
        return [];
    }
}