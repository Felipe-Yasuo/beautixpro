"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/lib/get-plan";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
});

export async function createEmployee(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Não autorizado." };

    const plan = await getUserPlan();
    if (plan !== "PROFESSIONAL") {
        return { error: "Gerenciar funcionários é exclusivo do plano Professional." };
    }

    const parsed = schema.safeParse({ name: formData.get("name") });
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    await prisma.employee.create({
        data: {
            name: parsed.data.name,
            userId: session.user.id,
        },
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
}