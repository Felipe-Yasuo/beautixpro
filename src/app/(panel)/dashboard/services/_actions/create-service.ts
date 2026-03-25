"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getUserPlan, UserPlan } from "@/app/(panel)/dashboard/_data-access/get-plan";

const SERVICE_LIMITS: Record<UserPlan, number> = {
    FREE: 3,
    BASIC: 10,
    PROFESSIONAL: Infinity,
};

const UPGRADE_MESSAGES: Record<UserPlan, string> = {
    FREE: "Plano gratuito permite até 3 serviços. Faça upgrade para o Basic ou Professional.",
    BASIC: "Plano Basic permite até 10 serviços. Faça upgrade para o Professional.",
    PROFESSIONAL: "",
};

const serviceSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    price: z.coerce.number().min(1, "Preço inválido."),
    duration: z.coerce.number().min(1, "Duração inválida."),
    employeeId: z.string().optional(),
});

export async function createService(formData: FormData) {
    const userId = await requireAuth();

    const plan = await getUserPlan();
    const limit = SERVICE_LIMITS[plan];

    try {
        const serviceCount = await prisma.service.count({
            where: { employee: { userId: userId } },
        });

        if (serviceCount >= limit) {
            return { error: UPGRADE_MESSAGES[plan] };
        }

        const parsed = serviceSchema.safeParse({
            name: formData.get("name"),
            price: formData.get("price"),
            duration: formData.get("duration"),
            employeeId: formData.get("employeeId") ?? undefined,
        });

        if (!parsed.success) {
            return { error: parsed.error.issues[0].message };
        }

        const { name, price, duration, employeeId } = parsed.data;

        let targetEmployeeId = employeeId;

        if (!targetEmployeeId) {
            const defaultEmployee = await prisma.employee.findFirst({
                where: { userId: userId },
            });

            if (defaultEmployee) {
                targetEmployeeId = defaultEmployee.id;
            } else {
                const created = await prisma.employee.create({
                    data: {
                        name: "Padrão",
                        times: [],
                        userId: userId,
                    },
                });
                targetEmployeeId = created.id;
            }
        }

        if (employeeId) {
            const owns = await prisma.employee.findFirst({
                where: { id: targetEmployeeId, userId: userId },
            });
            if (!owns) return { error: "Funcionário inválido." };
        }

        await prisma.service.create({
            data: {
                name,
                price: Math.round(price * 100),
                duration,
                employeeId: targetEmployeeId,
            },
        });
    } catch {
        return { error: "Algo deu errado. Tente novamente." };
    }

    revalidatePath("/dashboard/services");
    return { success: true };
}