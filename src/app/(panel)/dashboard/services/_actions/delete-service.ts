"use server";

import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const idSchema = z.string().min(1, "ID inválido.");

export async function deleteService(serviceId: string) {
    const userId = await requireAuth();

    const parsed = idSchema.safeParse(serviceId);
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    const service = await prisma.service.findFirst({
        where: { id: parsed.data, employee: { userId } },
    });

    if (!service) return { error: "Serviço não encontrado." };

    await prisma.service.delete({
        where: { id: parsed.data },
    });

    revalidatePath("/dashboard/services");
    return { success: true };
}