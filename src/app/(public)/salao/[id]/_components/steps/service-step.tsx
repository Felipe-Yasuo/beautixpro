import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Service } from "../../_hooks/useScheduleForm";

function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    const hoursPart = hours > 0 ? `${hours}h ` : "";
    const minutesPart = remainder > 0 ? `${remainder}min` : "";
    return `${hoursPart}${minutesPart}`.trim();
}

interface ServiceStepProps {
    services: Service[];
    onServiceChange: (serviceId: string) => void;
}

export function ServiceStep({ services, onServiceChange }: ServiceStepProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Selecione o serviço:</label>
            <Select onValueChange={onServiceChange}>
                <SelectTrigger className="w-full bg-background border-border text-foreground">
                    <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                    {services.map((service) => (
                        <SelectItem key={service.id} value={service.id} className="text-foreground">
                            {service.name} — {formatDuration(service.duration)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
