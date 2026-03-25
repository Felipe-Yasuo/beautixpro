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

    const appointments = await prisma.appointment.findMany({
        where: { userId: session.user.id },
        include: {
            service: {
                select: { name: true, price: true },
            },
        },
        orderBy: { appointmentDate: "desc" },
    });

    // Total de agendamentos
    const totalAppointments = appointments.length;

    // Faturamento total
    const totalRevenue = appointments.reduce(
        (acc, a) => acc + a.service.price,
        0
    );

    // Agendamentos do mês atual
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const appointmentsThisMonth = appointments.filter(
        (a) => new Date(a.appointmentDate) >= startOfMonth
    );

    // Faturamento do mês
    const revenueThisMonth = appointmentsThisMonth.reduce(
        (acc, a) => acc + a.service.price,
        0
    );

    // Serviços mais populares
    const serviceCount: Record<string, { name: string; count: number; revenue: number }> = {};
    appointments.forEach((a) => {
        if (!serviceCount[a.service.name]) {
            serviceCount[a.service.name] = { name: a.service.name, count: 0, revenue: 0 };
        }
        serviceCount[a.service.name].count++;
        serviceCount[a.service.name].revenue += a.service.price;
    });

    const popularServices = Object.values(serviceCount)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return {
        totalAppointments,
        totalRevenue,
        revenueThisMonth,
        appointmentsThisMonth: appointmentsThisMonth.length,
        popularServices,
    };
}