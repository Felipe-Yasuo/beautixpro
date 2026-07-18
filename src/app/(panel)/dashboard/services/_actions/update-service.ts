"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { updateServiceSchema as serviceSchema } from "@/lib/validations/service";

export async function updateService(formData: FormData) {
    try {
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

        const result = await prisma.service.updateMany({
            where: { id, employee: { userId } },
            data: {
                name,
                price: Math.round(price * 100),
                duration,
                status,
            },
        });

        if (result.count === 0) return { error: "Serviço não encontrado." };

        revalidatePath("/dashboard/services");
        return { success: true };
    } catch {
        return { error: "Algo deu errado. Tente novamente." };
    }
}