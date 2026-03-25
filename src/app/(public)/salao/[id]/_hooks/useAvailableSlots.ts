import { useEffect, useMemo, useState } from "react";
import { getAvailableSlots } from "../_actions/get-available-slots";

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
            const times = await getAvailableSlots({
                employeeId: employeeId!,
                date: dateString!,
                duration: serviceDuration,
            });
            if (!cancelled) {
                setBookedTimes(times);
            }
        }

        fetchBookedTimes();

        return () => { cancelled = true; };
    }, [dateString, employeeId, serviceDuration]);

    const result = (!dateString || !employeeId) ? [] : bookedTimes;

    return { bookedTimes: result };
}
