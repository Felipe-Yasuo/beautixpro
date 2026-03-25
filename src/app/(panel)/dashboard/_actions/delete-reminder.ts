"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { idSchema } from "@/lib/schemas";

export async function deleteReminder(reminderId: string) {
    const userId = await requireAuth();

    const parsed = idSchema.safeParse(reminderId);
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    try {
        await prisma.reminder.delete({
            where: { id: parsed.data, userId },
        });
    } catch {
        return { error: "Algo deu errado. Tente novamente." };
    }

    revalidatePath("/dashboard");
    return { success: true };
}