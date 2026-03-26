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
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Horários disponíveis:</label>
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
