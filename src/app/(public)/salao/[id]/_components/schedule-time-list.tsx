"use client";

interface ScheduleTimeListProps {
    times: string[];
    selectedTime: string | null;
    onSelect: (time: string) => void;
    bookedTimes: string[];
    selectedDate: Date | null;
}

function isTimeInPast(time: string, date: Date | null): boolean {
    if (!date) return false;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selected = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (selected.getTime() !== today.getTime()) return false;

    const [h, m] = time.split(":").map(Number);
    return h * 60 + m <= now.getHours() * 60 + now.getMinutes();
}

export function ScheduleTimeList({
    times,
    selectedTime,
    onSelect,
    bookedTimes,
    selectedDate,
}: ScheduleTimeListProps) {
    if (times.length === 0) {
        return (
            <p className="text-muted-foreground text-sm">
                Nenhum horário disponível.
            </p>
        );
    }

    const sortedTimes = [...times].sort((a, b) => {
        const [aH, aM] = a.split(":").map(Number);
        const [bH, bM] = b.split(":").map(Number);
        return aH * 60 + aM - (bH * 60 + bM);
    });

    return (
        <div className="border border-border rounded-md p-3 grid grid-cols-4 gap-2">
            {sortedTimes.map((time) => {
                const isBooked = bookedTimes.includes(time);
                const isPast = isTimeInPast(time, selectedDate);
                const isDisabled = isBooked || isPast;
                const isSelected = selectedTime === time;

                return (
                    <button
                        key={time}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => onSelect(time)}
                        className={`py-2 text-xs rounded-md border transition-colors cursor-pointer ${isDisabled
                                ? "border-border text-muted-foreground/30 cursor-not-allowed"
                                : isSelected
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-foreground hover:border-primary"
                            }`}
                    >
                        {time}
                    </button>
                );
            })}
        </div>
    );
}
