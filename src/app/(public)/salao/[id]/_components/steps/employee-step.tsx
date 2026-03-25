import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Employee } from "../../_hooks/useScheduleForm";

interface EmployeeStepProps {
    employees: Employee[];
    onEmployeeChange: (employeeId: string) => void;
}

export function EmployeeStep({ employees, onEmployeeChange }: EmployeeStepProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Selecione o profissional:</label>
            <Select onValueChange={onEmployeeChange}>
                <SelectTrigger className="w-full bg-background border-border text-foreground">
                    <SelectValue placeholder="Selecione um profissional" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                    {employees.map((e) => (
                        <SelectItem key={e.id} value={e.id} className="text-foreground">
                            {e.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
