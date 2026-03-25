"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const schema = z.object({
    employeeId: z.string().min(1, "ID do funcionário inválido."),
    times: z.array(z.string().regex(/^\d{2}:\d{2}$/, "Formato de horário inválido.")),
});

export async function updateEmployeeTimes(employeeId: string, times: string[]) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Não autorizado." };

    const parsed = schema.safeParse({ employeeId, times });
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    const employee = await prisma.employee.findUnique({
        where: { id: parsed.data.employeeId, userId: session.user.id },
    });

    if (!employee) return { error: "Funcionário não encontrado." };

    await prisma.employee.update({
        where: { id: parsed.data.employeeId },
        data: { times: parsed.data.times },
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
}