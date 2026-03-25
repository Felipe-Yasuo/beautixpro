"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const imageUrlSchema = z.string().url("URL da imagem inválida.");

export async function updateAvatar(imageUrl: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Não autorizado." };

    const parsed = imageUrlSchema.safeParse(imageUrl);
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    await prisma.user.update({
        where: { id: session.user.id },
        data: { image: parsed.data },
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
}