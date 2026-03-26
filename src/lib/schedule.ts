export function formatTime(totalMinutes: number): string {
    const hour = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const min = String(totalMinutes % 60).padStart(2, "0");
    return `${hour}:${min}`;
}

export function parseTime(time: string): number {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

export function computeBlockedSlots(
    appointments: { time: string; service: { duration: number } }[]
): Set<string> {
    const blocked = new Set<string>();

    for (const apt of appointments) {
        const start = parseTime(apt.time);
        const end = start + apt.service.duration;

        for (let t = start; t < end; t += 30) {
            blocked.add(formatTime(t));
        }
    }

    return blocked;
}

export function computeUnavailableStarts(
    blockedSlots: Set<string>,
    duration: number,
    employeeTimes?: string[],
): Set<string> {
    const unavailable = new Set<string>();
    if (duration <= 0) return unavailable;

    const DAY_START = 8 * 60;
    const DAY_END = 23 * 60;
    const availableSet = employeeTimes ? new Set(employeeTimes) : null;

    for (let t = DAY_START; t <= DAY_END; t += 30) {
        const startLabel = formatTime(t);

        for (let s = t; s < t + duration; s += 30) {
            const slotLabel = formatTime(s);

            if (blockedSlots.has(slotLabel)) {
                unavailable.add(startLabel);
                break;
            }

            if (availableSet && !availableSet.has(slotLabel)) {
                unavailable.add(startLabel);
                break;
            }
        }
    }

    return unavailable;
}
