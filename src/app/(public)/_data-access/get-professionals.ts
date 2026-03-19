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
            subscription: {
                plan: "desc",
            },
        },
    });

    return professionals;
}