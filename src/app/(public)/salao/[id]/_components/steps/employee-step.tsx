import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Employee } from "../../_hooks/useScheduleForm";

interface EmployeeStepProps {
    employees: Employee[];
    onEmployeeChange: (employeeId: string) => void;
}

export function EmployeeStep({ employees, onEmployeeChange }: EmployeeStepProps) {
    return (
        <label className="flex flex-col">
            <span className="label-overline mb-2">Quem irá atendê-lo(a)</span>
            <Select onValueChange={onEmployeeChange}>
                <SelectTrigger className="h-auto rounded-none border-0 border-b border-outline-variant bg-transparent px-0 py-2.5 font-serif text-base text-on-surface shadow-none focus:border-gold focus-visible:ring-0 data-placeholder:text-on-surface-dim">
                    <SelectValue placeholder="Escolha um profissional" />
                </SelectTrigger>
                <SelectContent className="border-outline-variant bg-surface-high">
                    {employees.map((e) => (
                        <SelectItem
                            key={e.id}
                            value={e.id}
                            className="font-serif text-base text-on-surface focus:bg-gold/10 focus:text-gold"
                        >
                            {e.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </label>
    );
}
