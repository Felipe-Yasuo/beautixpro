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
    status: z.coerce.boolean(),
    timeZone: z.string().min(1, "Fuso horário inválido."),
});

export async function updateProfile(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Não autorizado." };

    const times = formData.getAll("times") as string[];

    const parsed = profileSchema.safeParse({
        name: formData.get("name"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        times,
        status: formData.get("status"),
        timeZone: formData.get("timeZone"),
    });

    if (!parsed.success) return { error: parsed.error.issues[0].message };

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            name: parsed.data.name,
            phone: parsed.data.phone,
            address: parsed.data.address,
            times: parsed.data.times,
            status: parsed.data.status,
            timeZone: parsed.data.timeZone,
        },
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
}