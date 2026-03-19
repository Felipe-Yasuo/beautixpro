import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getAppointments(date: Date) {
    const session = await auth();

    if (!session?.user?.id) return [];

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const appointments = await prisma.appointment.findMany({
        where: {
            userId: session.user.id,
            appointmentDate: {
                gte: start,
                lte: end,
            },
        },
        include: {
            service: {
                select: {
                    name: true,
                    price: true,
                    duration: true,
                },
            },
        },
        orderBy: { time: "asc" },
    });

    return appointments;
}