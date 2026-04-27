import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getInfoUser() {
    const session = await auth();
    if (!session?.user?.id) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                address: true,
                addressNumber: true,
                phone: true,
                status: true,
                timeZone: true,
                times: true,
                employees: {
                    select: {
                        id: true,
                        name: true,
                        times: true,
                    },
                    orderBy: { createdAt: "asc" },
                },
            },
        });

        return user;
    } catch {
        return null;
    }
}