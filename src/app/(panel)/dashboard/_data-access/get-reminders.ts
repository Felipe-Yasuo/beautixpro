import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getReminders() {
    const session = await auth();

    if (!session?.user?.id) return [];

    try {
        const reminders = await prisma.reminder.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });

        return reminders;
    } catch {
        return [];
    }
}