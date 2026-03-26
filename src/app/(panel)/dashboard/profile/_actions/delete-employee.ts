"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { idSchema } from "@/lib/schemas";

export async function deleteEmployee(id: string) {
    try {
        const userId = await requireAuth();

        const parsed = idSchema.safeParse(id);
        if (!parsed.success) return { error: parsed.error.issues[0].message };

        await prisma.employee.delete({
            where: { id: parsed.data, userId },
        });

        revalidatePath("/dashboard/profile");
        return { success: true };
    } catch {
        return { error: "Algo deu errado. Tente novamente." };
    }
}