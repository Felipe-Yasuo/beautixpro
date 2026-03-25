import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getAllServices() {
    const session = await auth();
    if (!session?.user?.id) return [];

    const services = await prisma.service.findMany({
        where: { employee: { userId: session.user.id } },
        include: { employee: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
    });

    return services;
}