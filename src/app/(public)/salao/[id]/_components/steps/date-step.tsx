import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const today = () => new Date(new Date().setHours(0, 0, 0, 0));

interface DateStepProps {
    selectedDate: Date | null;
    onDateChange: (date: Date | undefined) => void;
}

export function DateStep({ selectedDate, onDateChange }: DateStepProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Data do agendamento:</label>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-left flex items-center justify-between hover:border-primary transition-colors cursor-pointer"
                    >
                        <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
                            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Selecione uma data"}
                        </span>
                        <CalendarIcon size={16} className="text-muted-foreground" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate ?? undefined}
                        onSelect={onDateChange}
                        disabled={(date) => date < today()}
                        locale={ptBR}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
