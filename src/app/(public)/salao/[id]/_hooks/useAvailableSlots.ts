import { useEffect, useMemo, useState } from "react";

interface UseAvailableSlotsProps {
    employeeId: string | null;
    selectedDate: Date | null;
    serviceDuration: number;
}

export function useAvailableSlots({ employeeId, selectedDate, serviceDuration }: UseAvailableSlotsProps) {
    const [bookedTimes, setBookedTimes] = useState<string[]>([]);

    const dateString = useMemo(() => {
        if (!selectedDate) return null;
        return `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    }, [selectedDate]);

    useEffect(() => {
        if (!dateString || !employeeId) return;

        let cancelled = false;

        async function fetchBookedTimes() {
            const res = await fetch(
                `/api/schedule/get-appointments?employeeId=${employeeId}&date=${dateString}&duration=${serviceDuration}`
            );
            const data = await res.json();
            if (!cancelled) {
                setBookedTimes(data.times ?? []);
            }
        }

        fetchBookedTimes();

        return () => { cancelled = true; };
    }, [dateString, employeeId, serviceDuration]);

    const result = (!dateString || !employeeId) ? [] : bookedTimes;

    return { bookedTimes: result };
}
