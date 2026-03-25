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

    try {
        // Agrega contagens por serviço no banco em vez de buscar todas as linhas
        const [todayByService, yesterdayByService] = await Promise.all([
            prisma.appointment.groupBy({
                by: ["serviceId"],
                where: {
                    userId: session.user.id,
                    appointmentDate: { gte: startToday, lte: endToday },
                },
                _count: { id: true },
            }),
            prisma.appointment.groupBy({
                by: ["serviceId"],
                where: {
                    userId: session.user.id,
                    appointmentDate: { gte: startYesterday, lte: endYesterday },
                },
                _count: { id: true },
            }),
        ]);

        // Busca preços apenas dos serviços referenciados nos dois dias
        const serviceIds = [
            ...new Set([
                ...todayByService.map((g) => g.serviceId),
                ...yesterdayByService.map((g) => g.serviceId),
            ]),
        ];

        const services = serviceIds.length > 0
            ? await prisma.service.findMany({
                  where: { id: { in: serviceIds } },
                  select: { id: true, price: true },
              })
            : [];

        const priceMap = new Map(services.map((s) => [s.id, s.price]));

        const today = todayByService.reduce(
            (acc, g) => acc + g._count.id * (priceMap.get(g.serviceId) ?? 0),
            0
        );
        const yesterday = yesterdayByService.reduce(
            (acc, g) => acc + g._count.id * (priceMap.get(g.serviceId) ?? 0),
            0
        );

        return { today, yesterday };
    } catch {
        return { today: 0, yesterday: 0 };
    }
}