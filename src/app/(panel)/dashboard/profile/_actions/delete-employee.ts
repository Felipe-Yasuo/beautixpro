"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteEmployee(id: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Não autorizado." };

    await prisma.employee.delete({
        where: { id, userId: session.user.id },
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
}