"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getUserPlan } from "@/lib/get-plan";

const SERVICE_LIMITS = {
    FREE: 3,
    BASIC: 10,
    PROFESSIONAL: Infinity,
};

const UPGRADE_MESSAGES = {
    FREE: "Plano gratuito permite até 3 serviços. Faça upgrade para o Basic ou Professional.",
    BASIC: "Plano Basic permite até 10 serviços. Faça upgrade para o Professional.",
    PROFESSIONAL: "",
};

const serviceSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    price: z.coerce.number().min(1, "Preço inválido."),
    duration: z.coerce.number().min(1, "Duração inválida."),
});

export async function createService(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Não autorizado." };

    const plan = await getUserPlan();
    const limit = SERVICE_LIMITS[plan];

    const serviceCount = await prisma.service.count({
        where: { userId: session.user.id },
    });

    if (serviceCount >= limit) {
        return { error: UPGRADE_MESSAGES[plan] };
    }

    const parsed = serviceSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        duration: formData.get("duration"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    const { name, price, duration } = parsed.data;

    await prisma.service.create({
        data: {
            name,
            price: Math.round(price * 100),
            duration,
            userId: session.user.id,
        },
    });

    revalidatePath("/dashboard/services");
    return { success: true };
}