"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const timesSchema = z.array(z.string().regex(/^\d{2}:\d{2}$/, "Formato de horário inválido."));

export async function updateUserTimes(times: string[]) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Não autorizado." };

    const parsed = timesSchema.safeParse(times);
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    await prisma.user.update({
        where: { id: session.user.id },
        data: { times: parsed.data },
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
}