"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteService(serviceId: string) {
    const session = await auth();

    if (!session?.user?.id) return { error: "Não autorizado." };

    await prisma.service.delete({
        where: { id: serviceId, userId: session.user.id },
    });

    revalidatePath("/dashboard/services");
    return { success: true };
}