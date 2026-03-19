"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function cancelAppointment(appointmentId: string) {
    const session = await auth();

    if (!session?.user?.id) return { error: "Não autorizado." };

    await prisma.appointment.delete({
        where: { id: appointmentId, userId: session.user.id },
    });

    revalidatePath("/dashboard");
    return { success: true };
}