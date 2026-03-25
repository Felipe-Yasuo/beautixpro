"use client";

interface ScheduleTimeListProps {
    times: string[];
    selectedTime: string | null;
    onSelect: (time: string) => void;
    bookedTimes: string[];
}

export function ScheduleTimeList({
    times,
    selectedTime,
    onSelect,
    bookedTimes,
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
                const isSelected = selectedTime === time;

                return (
                    <button
                        key={time}
                        type="button"
                        disabled={isBooked}
                        onClick={() => onSelect(time)}
                        className={`py-2 text-xs rounded-md border transition-colors cursor-pointer ${isBooked
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
