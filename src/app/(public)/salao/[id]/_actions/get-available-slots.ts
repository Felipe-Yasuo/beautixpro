"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { computeBlockedSlots, computeUnavailableStarts } from "@/lib/schedule";

const inputSchema = z.object({
    employeeId: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida."),
    duration: z.coerce.number().int().min(0).default(0),
});

export async function getAvailableSlots(input: {
    employeeId: string;
    date: string;
    duration: number;
}): Promise<string[]> {
    const parsed = inputSchema.safeParse(input);
    if (!parsed.success) {
        return [];
    }

    const { employeeId, date, duration } = parsed.data;

    try {
        const [appointments, employee] = await Promise.all([
            prisma.appointment.findMany({
                where: {
                    employeeId,
                    appointmentDate: new Date(`${date}T00:00:00`),
                },
                select: {
                    time: true,
                    service: { select: { duration: true } },
                },
            }),
            prisma.employee.findUnique({
                where: { id: employeeId },
                select: { times: true },
            }),
        ]);

        const blockedSlots = computeBlockedSlots(appointments);
        const unavailableStarts = computeUnavailableStarts(blockedSlots, duration, employee?.times ?? undefined);

        return Array.from(new Set([...blockedSlots, ...unavailableStarts]));
    } catch {
        return [];
    }
}
