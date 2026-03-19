"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const profileSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    phone: z.string().min(10, "Telefone inválido."),
    address: z.string().min(2, "Endereço inválido."),
    times: z.array(z.string()).default([]),
});

export async function updateProfile(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) return { error: "Não autorizado." };

    const times = formData.getAll("times") as string[];

    const raw = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        times,
    };

    const parsed = profileSchema.safeParse(raw);

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    const { name, phone, address } = parsed.data;

    await prisma.user.update({
        where: { id: session.user.id },
        data: { name, phone, address, times },
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
}