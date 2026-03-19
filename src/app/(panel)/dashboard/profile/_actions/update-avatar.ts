"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAvatar(imageUrl: string) {
    const session = await auth();

    if (!session?.user?.id) return { error: "Não autorizado." };

    await prisma.user.update({
        where: { id: session.user.id },
        data: { image: imageUrl },
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
}