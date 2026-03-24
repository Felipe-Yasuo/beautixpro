import { prisma } from "@/lib/prisma";

export async function getProfessionals() {
    const users = await prisma.user.findMany({
        where: {
            status: true,
            subscription: {
                status: "active",
            },
            services: {
                some: { status: true },
            },
        },
        select: {
            id: true,
            name: true,
            image: true,
            address: true,
            subscription: {
                select: { plan: true },
            },
            services: {
                where: { status: true },
                select: { name: true },
            },
        },
    });

    return users.sort((a, b) => {
        if (a.subscription?.plan === "PROFESSIONAL") return -1;
        if (b.subscription?.plan === "PROFESSIONAL") return 1;
        return 0;
    });
}