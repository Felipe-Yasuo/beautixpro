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
            <p className="font-serif text-sm italic" style={{ color: "var(--clima-text-muted)" }}>
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
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
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
                        aria-pressed={isSelected}
                        className="rounded-[10px] py-3 text-center text-sm transition-colors disabled:cursor-not-allowed disabled:line-through disabled:opacity-40"
                        style={
                            isSelected
                                ? { backgroundColor: "var(--clima-accent-soft)", border: "1px solid var(--clima-accent)", color: "var(--clima-accent)" }
                                : { backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)", color: "var(--clima-text)" }
                        }
                    >
                        {time}
                    </button>
                );
            })}
        </div>
    );
}