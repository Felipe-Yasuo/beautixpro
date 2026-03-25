import { prisma } from "@/lib/prisma";

export async function getProfessionals() {
    try {
        const users = await prisma.user.findMany({
            where: {
                status: true,
                subscription: {
                    status: "active",
                },
                employees: {
                    some: {
                        services: {
                            some: { status: true },
                        },
                    },
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
                employees: {
                    select: {
                        services: {
                            where: { status: true },
                            select: { name: true },
                        },
                    },
                },
            },
        });

        return users.sort((a, b) => {
            if (a.subscription?.plan === "PROFESSIONAL") return -1;
            if (b.subscription?.plan === "PROFESSIONAL") return 1;
            return 0;
        });
    } catch {
        return [];
    }
}