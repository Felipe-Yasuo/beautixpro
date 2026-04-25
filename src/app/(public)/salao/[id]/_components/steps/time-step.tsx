import { ScheduleTimeList } from "../schedule-time-list";

interface TimeStepProps {
    times: string[];
    selectedTime: string | null;
    onSelect: (time: string) => void;
    bookedTimes: string[];
    selectedDate: Date | null;
}

export function TimeStep({ times, selectedTime, onSelect, bookedTimes, selectedDate }: TimeStepProps) {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-xs text-on-surface-variant">
                Horários riscados estão indisponíveis. Toque para escolher.
            </p>
            <ScheduleTimeList
                times={times}
                selectedTime={selectedTime}
                onSelect={onSelect}
                bookedTimes={bookedTimes}
                selectedDate={selectedDate}
            />
        </div>
    );
}
