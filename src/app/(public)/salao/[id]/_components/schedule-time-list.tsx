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
            <p className="font-serif text-sm italic text-on-surface-variant">
                Não há horários cadastrados para este profissional.
            </p>
        );
    }

    const sortedTimes = [...times].sort((a, b) => {
        const [aH, aM] = a.split(":").map(Number);
        const [bH, bM] = b.split(":").map(Number);
        return aH * 60 + aM - (bH * 60 + bM);
    });

    return (
        <div className="grid grid-cols-3 gap-px bg-outline-variant sm:grid-cols-4 md:grid-cols-5">
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
                        className={`relative bg-surface-lowest py-4 font-serif text-sm transition-all duration-200 ${isDisabled
                            ? "text-on-surface-dim line-through cursor-not-allowed"
                            : isSelected
                                ? "bg-gold text-on-gold font-semibold"
                                : "text-on-surface hover:bg-gold/10 hover:text-gold cursor-pointer"
                            }`}
                    >
                        {time}
                        {isSelected && (
                            <span className="absolute inset-x-0 top-0 h-px bg-on-gold/40" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
