"use client";

import { useEffect, useState } from "react";

interface ScheduleTimeListProps {
    times: string[];
    selectedTime: string | null;
    onSelect: (time: string) => void;
    userId: string;
    selectedDate: Date | null;
}

export function ScheduleTimeList({
    times,
    selectedTime,
    onSelect,
    userId,
    selectedDate,
}: ScheduleTimeListProps) {
    const [bookedTimes, setBookedTimes] = useState<string[]>([]);

    useEffect(() => {
        if (!selectedDate) return;

        async function fetchBookedTimes() {
            const date = selectedDate!.toISOString().split("T")[0];
            const res = await fetch(
                `/api/schedule/get-appointments?userId=${userId}&date=${date}`
            );
            const data = await res.json();
            setBookedTimes(data.times ?? []);
        }

        fetchBookedTimes();
    }, [selectedDate, userId]);

    if (!selectedDate) {
        return (
            <p className="text-[#3a3028] text-xs tracking-widest uppercase">
                Selecione uma data primeiro.
            </p>
        );
    }

    if (times.length === 0) {
        return (
            <p className="text-[#3a3028] text-xs tracking-widest uppercase">
                Nenhum horário disponível.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-2">
            {times.map((time) => {
                const isBooked = bookedTimes.includes(time);
                const isSelected = selectedTime === time;

                return (
                    <button
                        key={time}
                        type="button"
                        disabled={isBooked}
                        onClick={() => onSelect(time)}
                        className={`py-2 text-xs tracking-widest border transition-colors cursor-pointer ${isBooked
                                ? "border-[#c9a84c11] text-[#3a3028] cursor-not-allowed"
                                : isSelected
                                    ? "border-[#c9a84c] bg-[#c9a84c11] text-[#c9a84c]"
                                    : "border-[#c9a84c22] text-[#7a6e62] hover:border-[#c9a84c55]"
                            }`}
                    >
                        {time}
                    </button>
                );
            })}
        </div>
    );
}