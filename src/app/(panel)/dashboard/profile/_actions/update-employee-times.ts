"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateEmployeeTimes(employeeId: string, times: string[]) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Não autorizado." };

    // Verifica que o employee pertence ao usuário
    const employee = await prisma.employee.findUnique({
        where: { id: employeeId, userId: session.user.id },
    });

    if (!employee) return { error: "Funcionário não encontrado." };

    await prisma.employee.update({
        where: { id: employeeId },
        data: { times },
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
}