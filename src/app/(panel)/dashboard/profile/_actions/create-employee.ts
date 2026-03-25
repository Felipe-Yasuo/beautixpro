"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/app/(panel)/dashboard/_data-access/get-plan";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
});

export async function createEmployee(formData: FormData) {
    const userId = await requireAuth();

    const plan = await getUserPlan();
    if (plan !== "PROFESSIONAL") {
        return { error: "Gerenciar funcionários é exclusivo do plano Professional." };
    }

    const parsed = schema.safeParse({ name: formData.get("name") });
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    try {
        await prisma.employee.create({
            data: {
                name: parsed.data.name,
                userId,
            },
        });
    } catch {
        return { error: "Algo deu errado. Tente novamente." };
    }

    revalidatePath("/dashboard/profile");
    return { success: true };
}