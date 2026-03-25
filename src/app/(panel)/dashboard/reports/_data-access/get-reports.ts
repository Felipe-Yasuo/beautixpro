import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/app/(panel)/dashboard/_data-access/get-plan";
import { redirect } from "next/navigation";

export async function getReports() {
    const session = await auth();

    if (!session?.user?.id) return null;

    const plan = await getUserPlan();

    if (plan === "FREE") {
        redirect("/dashboard/subscription");
    }

    const userId = session.user.id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    try {
        // Agrega contagens por serviço no banco em vez de buscar todos os registros
        const [allByService, monthByService] = await Promise.all([
            prisma.appointment.groupBy({
                by: ["serviceId"],
                where: { userId },
                _count: { id: true },
            }),
            prisma.appointment.groupBy({
                by: ["serviceId"],
                where: { userId, appointmentDate: { gte: startOfMonth } },
                _count: { id: true },
            }),
        ]);

        // Busca apenas os serviços referenciados
        const serviceIds = allByService.map((g) => g.serviceId);
        const services = await prisma.service.findMany({
            where: { id: { in: serviceIds } },
            select: { id: true, name: true, price: true },
        });
        const serviceMap = new Map(services.map((s) => [s.id, s]));

        // Total de agendamentos
        const totalAppointments = allByService.reduce(
            (acc, g) => acc + g._count.id,
            0
        );

        // Faturamento total
        const totalRevenue = allByService.reduce((acc, g) => {
            const price = serviceMap.get(g.serviceId)?.price ?? 0;
            return acc + g._count.id * price;
        }, 0);

        // Agendamentos do mês atual
        const appointmentsThisMonth = monthByService.reduce(
            (acc, g) => acc + g._count.id,
            0
        );

        // Faturamento do mês
        const revenueThisMonth = monthByService.reduce((acc, g) => {
            const price = serviceMap.get(g.serviceId)?.price ?? 0;
            return acc + g._count.id * price;
        }, 0);

        // Serviços mais populares (top 5)
        const popularServices = allByService
            .map((g) => {
                const service = serviceMap.get(g.serviceId);
                return {
                    name: service?.name ?? "",
                    count: g._count.id,
                    revenue: g._count.id * (service?.price ?? 0),
                };
            })
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        return {
            totalAppointments,
            totalRevenue,
            revenueThisMonth,
            appointmentsThisMonth,
            popularServices,
        };
    } catch {
        return null;
    }
}