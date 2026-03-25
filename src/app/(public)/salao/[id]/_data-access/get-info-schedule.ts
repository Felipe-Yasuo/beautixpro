import { prisma } from "@/lib/prisma";

export async function getInfoSchedule(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                image: true,
                address: true,
                employees: {
                    select: {
                        id: true,
                        name: true,
                        times: true,
                        services: {
                            where: { status: true },
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                duration: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) return null;

        // Filtra employees que têm ao menos 1 serviço ativo e horários configurados
        const activeEmployees = user.employees.filter(
            (e) => e.services.length > 0 && e.times.length > 0
        );

        return { ...user, employees: activeEmployees };
    } catch {
        return null;
    }
}