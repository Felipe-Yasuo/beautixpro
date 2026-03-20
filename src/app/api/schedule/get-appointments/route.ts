import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");
    const date = req.nextUrl.searchParams.get("date");
    const duration = Number(req.nextUrl.searchParams.get("duration") ?? "0");

    if (!userId || !date) {
        return NextResponse.json({ times: [] });
    }

    const appointments = await prisma.appointment.findMany({
        where: {
            userId,
            appointmentDate: new Date(date + "T00:00:00"),
        },
        select: {
            time: true,
            service: {
                select: { duration: true },
            },
        },
    });

    // Gera todos os slots bloqueados considerando duração de cada agendamento
    const blockedSlots = new Set<string>();

    appointments.forEach((apt) => {
        const [h, m] = apt.time.split(":").map(Number);
        const startMinutes = h * 60 + m;
        const endMinutes = startMinutes + apt.service.duration;

        // Bloqueia todos os slots de 30 em 30 minutos dentro da duração
        for (let t = startMinutes; t < endMinutes; t += 30) {
            const hour = String(Math.floor(t / 60)).padStart(2, "0");
            const min = String(t % 60).padStart(2, "0");
            blockedSlots.add(`${hour}:${min}`);
        }
    });

    // Se o cliente escolheu um serviço com duração, bloqueia horários
    // onde o serviço conflitaria com um agendamento existente
    const unavailableStarts = new Set<string>();

    if (duration > 0) {
        // Para cada slot disponível, verifica se o serviço caberia sem conflito
        const allSlots = Array.from(blockedSlots);

        // Verifica cada horário possível de início
        for (let t = 8 * 60; t <= 23 * 60; t += 30) {
            const endTime = t + duration;

            // Verifica se algum slot dentro do intervalo está bloqueado
            for (let s = t; s < endTime; s += 30) {
                const hour = String(Math.floor(s / 60)).padStart(2, "0");
                const min = String(s % 60).padStart(2, "0");
                if (blockedSlots.has(`${hour}:${min}`)) {
                    const startHour = String(Math.floor(t / 60)).padStart(2, "0");
                    const startMin = String(t % 60).padStart(2, "0");
                    unavailableStarts.add(`${startHour}:${startMin}`);
                    break;
                }
            }
        }
    }

    return NextResponse.json({
        times: Array.from(new Set([...blockedSlots, ...unavailableStarts])),
    });
}