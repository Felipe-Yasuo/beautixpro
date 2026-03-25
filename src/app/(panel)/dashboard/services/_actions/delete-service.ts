"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { idSchema } from "@/lib/schemas";

export async function deleteService(serviceId: string) {
    const userId = await requireAuth();

    const parsed = idSchema.safeParse(serviceId);
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    const result = await prisma.service.deleteMany({
        where: { id: parsed.data, employee: { userId } },
    });

    if (result.count === 0) return { error: "Serviço não encontrado." };

    revalidatePath("/dashboard/services");
    return { success: true };
}