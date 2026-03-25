"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { idSchema } from "@/lib/schemas";

export async function cancelAppointment(appointmentId: string) {
    const userId = await requireAuth();

    const parsed = idSchema.safeParse(appointmentId);
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    await prisma.appointment.delete({
        where: { id: parsed.data, userId },
    });

    revalidatePath("/dashboard");
    return { success: true };
}