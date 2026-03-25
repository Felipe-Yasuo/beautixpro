"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const idSchema = z.string().min(1, "ID inválido.");

export async function cancelAppointment(appointmentId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Não autorizado." };

    const parsed = idSchema.safeParse(appointmentId);
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    await prisma.appointment.delete({
        where: { id: parsed.data, userId: session.user.id },
    });

    revalidatePath("/dashboard");
    return { success: true };
}