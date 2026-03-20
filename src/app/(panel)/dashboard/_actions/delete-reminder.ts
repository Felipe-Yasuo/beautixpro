"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteReminder(reminderId: string) {
    const session = await auth();

    if (!session?.user?.id) return { error: "Não autorizado." };

    await prisma.reminder.delete({
        where: { id: reminderId, userId: session.user.id },
    });

    revalidatePath("/dashboard");
    return { success: true };
}