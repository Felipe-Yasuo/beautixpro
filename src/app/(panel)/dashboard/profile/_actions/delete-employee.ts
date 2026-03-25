"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const idSchema = z.string().min(1, "ID inválido.");

export async function deleteEmployee(id: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Não autorizado." };

    const parsed = idSchema.safeParse(id);
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    await prisma.employee.delete({
        where: { id: parsed.data, userId: session.user.id },
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
}