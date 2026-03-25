"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const appointmentSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    email: z.string().email("E-mail inválido."),
    phone: z
        .string()
        .regex(/^\d+$/, "Telefone deve conter apenas números.")
        .min(8, "Telefone deve ter pelo menos 8 números.")
        .max(15, "Telefone deve ter no máximo 15 números."),
    serviceId: z.string().uuid("Serviço inválido."),
    employeeId: z.string().min(1, "Funcionário inválido."),
    appointmentDate: z.string().min(1, "Data inválida."),
    time: z.string().min(1, "Horário inválido."),
    userId: z.string().min(1, "Salão inválido."),
});

export async function createAppointment(formData: FormData) {
    const parsed = appointmentSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        serviceId: formData.get("serviceId"),
        employeeId: formData.get("employeeId"),
        appointmentDate: formData.get("appointmentDate"),
        time: formData.get("time"),
        userId: formData.get("userId"),
    });

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    const { name, email, phone, serviceId, employeeId, appointmentDate, time, userId } = parsed.data;

    const existing = await prisma.appointment.findFirst({
        where: {
            employeeId,
            time,
            appointmentDate: new Date(appointmentDate),
        },
    });

    if (existing) {
        return { error: "Este horário já está reservado. Escolha outro." };
    }

    const service = await prisma.service.findFirst({
        where: { id: serviceId, employeeId, employee: { userId } },
    });

    if (!service) return { error: "Serviço inválido." };

    await prisma.appointment.create({
        data: {
            name,
            email,
            phone,
            serviceId,
            employeeId,
            appointmentDate: new Date(appointmentDate),
            time,
            userId,
        },
    });

    return { success: true };
}