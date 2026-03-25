import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { computeBlockedSlots, computeUnavailableStarts } from "@/lib/schedule";

const querySchema = z.object({
    employeeId: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida."),
    duration: z.coerce.number().int().min(0).default(0),
});

export async function GET(req: NextRequest) {
    const params = {
        employeeId: req.nextUrl.searchParams.get("employeeId"),
        date: req.nextUrl.searchParams.get("date"),
        duration: req.nextUrl.searchParams.get("duration") ?? "0",
    };

    const parsed = querySchema.safeParse(params);
    if (!parsed.success) {
        return NextResponse.json({ times: [] });
    }

    const { employeeId, date, duration } = parsed.data;

    const appointments = await prisma.appointment.findMany({
        where: {
            employeeId,
            appointmentDate: new Date(`${date}T00:00:00`),
        },
        select: {
            time: true,
            service: { select: { duration: true } },
        },
    });

    const blockedSlots = computeBlockedSlots(appointments);
    const unavailableStarts = computeUnavailableStarts(blockedSlots, duration);

    return NextResponse.json({
        times: Array.from(new Set([...blockedSlots, ...unavailableStarts])),
    });
}