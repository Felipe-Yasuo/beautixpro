import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type UserPlan = "FREE" | "BASIC" | "PROFESSIONAL";

export async function getUserPlan(): Promise<UserPlan> {
    const session = await auth();
    if (!session?.user?.id) return "FREE";

    const subscription = await prisma.subscription.findUnique({
        where: { userId: session.user.id },
        select: { plan: true, status: true },
    });

    if (!subscription || subscription.status !== "active") return "FREE";

    return subscription.plan as UserPlan;
}