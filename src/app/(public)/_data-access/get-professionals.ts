import { prisma } from "@/lib/prisma";

export async function getProfessionals() {
    const professionals = await prisma.user.findMany({
        where: {
            status: true,
            services: {
                some: {
                    status: true,
                },
            },
        },
        select: {
            id: true,
            name: true,
            image: true,
            address: true,
            subscription: {
                select: {
                    plan: true,
                },
            },
            services: {
                where: { status: true },
                select: { name: true },
                take: 3,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Coloca profissionais PROFESSIONAL primeiro
    return professionals.sort((a, b) => {
        if (a.subscription?.plan === "PROFESSIONAL" && b.subscription?.plan !== "PROFESSIONAL") return -1;
        if (a.subscription?.plan !== "PROFESSIONAL" && b.subscription?.plan === "PROFESSIONAL") return 1;
        return 0;
    });
}