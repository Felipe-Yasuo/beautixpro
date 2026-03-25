"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const reminderSchema = z.object({
    description: z.string().min(1, "Descrição obrigatória."),
});

export async function createReminder(formData: FormData) {
    const userId = await requireAuth();

    const parsed = reminderSchema.safeParse({
        description: formData.get("description"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    try {
        await prisma.reminder.create({
            data: {
                description: parsed.data.description,
                userId,
            },
        });
    } catch {
        return { error: "Algo deu errado. Tente novamente." };
    }

    revalidatePath("/dashboard");
    return { success: true };
}