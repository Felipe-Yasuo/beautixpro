import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getDailyRevenue() {
    const session = await auth();
    if (!session?.user?.id) return { today: 0, yesterday: 0 };

    const now = new Date();

    const startToday = new Date(now);
    startToday.setHours(0, 0, 0, 0);
    const endToday = new Date(now);
    endToday.setHours(23, 59, 59, 999);

    const startYesterday = new Date(now);
    startYesterday.setDate(startYesterday.getDate() - 1);
    startYesterday.setHours(0, 0, 0, 0);
    const endYesterday = new Date(now);
    endYesterday.setDate(endYesterday.getDate() - 1);
    endYesterday.setHours(23, 59, 59, 999);

    const [todayAppointments, yesterdayAppointments] = await Promise.all([
        prisma.appointment.findMany({
            where: {
                userId: session.user.id,
                appointmentDate: { gte: startToday, lte: endToday },
            },
            include: { service: { select: { price: true } } },
        }),
        prisma.appointment.findMany({
            where: {
                userId: session.user.id,
                appointmentDate: { gte: startYesterday, lte: endYesterday },
            },
            include: { service: { select: { price: true } } },
        }),
    ]);

    const today = todayAppointments.reduce((acc, a) => acc + a.service.price, 0);
    const yesterday = yesterdayAppointments.reduce((acc, a) => acc + a.service.price, 0);

    return { today, yesterday };
}