"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const reminderSchema = z.object({
    description: z.string().min(1, "Descrição obrigatória."),
});

export async function createReminder(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) return { error: "Não autorizado." };

    const parsed = reminderSchema.safeParse({
        description: formData.get("description"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    await prisma.reminder.create({
        data: {
            description: parsed.data.description,
            userId: session.user.id,
        },
    });

    revalidatePath("/dashboard");
    return { success: true };
}