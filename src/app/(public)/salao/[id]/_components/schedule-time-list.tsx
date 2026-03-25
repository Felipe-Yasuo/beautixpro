"use client";

import { useEffect, useState } from "react";

interface ScheduleTimeListProps {
    times: string[];
    selectedTime: string | null;
    onSelect: (time: string) => void;
    employeeId: string;
    selectedDate: Date | null;
    serviceDuration: number;
}

export function ScheduleTimeList({
    times,
    selectedTime,
    onSelect,
    employeeId,
    selectedDate,
    serviceDuration,
}: ScheduleTimeListProps) {
    const [bookedTimes, setBookedTimes] = useState<string[]>([]);

    useEffect(() => {
        if (!selectedDate) return;

        async function fetchBookedTimes() {
            const date = `${selectedDate!.getFullYear()}-${String(selectedDate!.getMonth() + 1).padStart(2, "0")}-${String(selectedDate!.getDate()).padStart(2, "0")}`;
            const res = await fetch(
                `/api/schedule/get-appointments?employeeId=${employeeId}&date=${date}&duration=${serviceDuration}`
            );
            const data = await res.json();
            setBookedTimes(data.times ?? []);
        }

        fetchBookedTimes();
    }, [selectedDate, employeeId, serviceDuration]);

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