import { prisma } from "@/lib/prisma";

export async function getInfoSchedule(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            image: true,
            address: true,
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
    });

    return user;
}