"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const serviceSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    price: z.coerce.number().min(1, "Preço inválido."),
    duration: z.coerce.number().min(1, "Duração inválida."),
    status: z.coerce.boolean(),
});

export async function updateService(formData: FormData) {
    const userId = await requireAuth();

    const parsed = serviceSchema.safeParse({
        id: formData.get("id"),
        name: formData.get("name"),
        price: formData.get("price"),
        duration: formData.get("duration"),
        status: formData.get("status"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    const { id, name, price, duration, status } = parsed.data;

    const service = await prisma.service.findFirst({
        where: { id, employee: { userId } },
    });

    if (!service) return { error: "Serviço não encontrado." };

    await prisma.service.update({
        where: { id },
        data: {
            name,
            price: Math.round(price * 100),
            duration,
            status,
        },
    });

    revalidatePath("/dashboard/services");
    return { success: true };
}