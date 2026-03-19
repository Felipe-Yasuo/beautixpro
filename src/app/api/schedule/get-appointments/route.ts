import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");
    const date = req.nextUrl.searchParams.get("date");

    if (!userId || !date) {
        return NextResponse.json({ times: [] });
    }

    const appointments = await prisma.appointment.findMany({
        where: {
            userId,
            appointmentDate: new Date(date + "T00:00:00"),
        },
        select: { time: true },
    });

    return NextResponse.json({
        times: appointments.map((a) => a.time),
    });
}