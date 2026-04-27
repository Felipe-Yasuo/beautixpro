"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const profileSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    phone: z
        .string()
        .regex(/^\d+$/, "Telefone deve conter apenas números.")
        .min(8, "Telefone deve ter pelo menos 8 números.")
        .max(15, "Telefone deve ter no máximo 15 números."),
    address: z.string().min(2, "Endereço inválido."),
    addressNumber: z.string().min(1, "Número é obrigatório."),
    status: z.coerce.boolean(),
    timeZone: z.string().min(1, "Fuso horário inválido."),
});

export async function updateProfile(formData: FormData) {
    try {
        const userId = await requireAuth();

        const parsed = profileSchema.safeParse({
            name: formData.get("name"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            addressNumber: formData.get("addressNumber"),
            status: formData.get("status"),
            timeZone: formData.get("timeZone"),
        });

        if (!parsed.success) return { error: parsed.error.issues[0].message };

        await prisma.user.update({
            where: { id: userId },
            data: {
                name: parsed.data.name,
                phone: parsed.data.phone,
                address: parsed.data.address,
                addressNumber: parsed.data.addressNumber,
                status: parsed.data.status,
                timeZone: parsed.data.timeZone,
            },
        });

        revalidatePath("/dashboard/profile");
        return { success: true };
    } catch {
        return { error: "Algo deu errado. Tente novamente." };
    }
}