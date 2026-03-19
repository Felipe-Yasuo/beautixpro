"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const appointmentSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    email: z.string().email("E-mail inválido."),
    phone: z.string().min(10, "Telefone inválido."),
    serviceId: z.string().uuid("Serviço inválido."),
    appointmentDate: z.string().min(1, "Data inválida."),
    time: z.string().min(1, "Horário inválido."),
    userId: z.string().min(1, "Salão inválido."),
});

export async function createAppointment(formData: FormData) {
    const raw = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        serviceId: formData.get("serviceId"),
        appointmentDate: formData.get("appointmentDate"),
        time: formData.get("time"),
        userId: formData.get("userId"),
    };

    const parsed = appointmentSchema.safeParse(raw);

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    const { name, email, phone, serviceId, appointmentDate, time, userId } =
        parsed.data;

    // Verifica se o horário já está ocupado naquele dia
    const existing = await prisma.appointment.findFirst({
        where: {
            userId,
            time,
            appointmentDate: new Date(appointmentDate),
        },
    });

    if (existing) {
        return { error: "Este horário já está reservado. Escolha outro." };
    }

    await prisma.appointment.create({
        data: {
            name,
            email,
            phone,
            serviceId,
            appointmentDate: new Date(appointmentDate),
            time,
            userId,
        },
    });

    return { success: true };
}