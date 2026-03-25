"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteService(serviceId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Não autorizado." };

    // Valida ownership via employee → userId
    const service = await prisma.service.findFirst({
        where: { id: serviceId, employee: { userId: session.user.id } },
    });

    if (!service) return { error: "Serviço não encontrado." };

    await prisma.service.delete({
        where: { id: serviceId },
    });

    revalidatePath("/dashboard/services");
    return { success: true };
}