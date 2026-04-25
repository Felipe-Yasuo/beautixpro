import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

const today = () => new Date(new Date().setHours(0, 0, 0, 0));

interface DateStepProps {
    selectedDate: Date | null;
    onDateChange: (date: Date | undefined) => void;
}

export function DateStep({ selectedDate, onDateChange }: DateStepProps) {
    return (
        <label className="flex flex-col">
            <span className="label-overline mb-2">Quando deseja vir</span>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="flex w-full items-center justify-between border-b border-outline-variant py-2.5 text-left transition-colors hover:border-gold focus:border-gold focus:outline-none"
                    >
                        <span
                            className={`font-serif text-base ${selectedDate ? "text-on-surface" : "text-on-surface-dim"
                                }`}
                        >
                            {selectedDate
                                ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                                : "Selecione uma data"}
                        </span>
                        <span className="label-overline text-gold">Calendário</span>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto border-outline-variant bg-surface-high p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate ?? undefined}
                        onSelect={onDateChange}
                        disabled={(date) => date < today()}
                        locale={ptBR}
                    />
                </PopoverContent>
            </Popover>
        </label>
    );
}
