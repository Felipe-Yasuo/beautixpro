import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatBRL } from "@/lib/formatters";
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
        <label className="flex flex-col">
            <span className="label-overline mb-2">A experiência</span>
            <Select onValueChange={onServiceChange}>
                <SelectTrigger className="h-auto rounded-none border-0 border-b border-outline-variant bg-transparent px-0 py-2.5 font-serif text-base text-on-surface shadow-none focus:border-gold focus-visible:ring-0 data-placeholder:text-on-surface-dim">
                    <SelectValue placeholder="Escolha um serviço do catálogo" />
                </SelectTrigger>
                <SelectContent className="border-outline-variant bg-surface-high">
                    {services.map((service) => (
                        <SelectItem
                            key={service.id}
                            value={service.id}
                            className="font-serif text-base text-on-surface focus:bg-gold/10 focus:text-gold"
                        >
                            <div className="flex w-full items-center justify-between gap-6">
                                <span>{service.name}</span>
                                <span className="font-sans text-xs tracking-wider text-on-surface-variant">
                                    {formatDuration(service.duration)} · R$ {formatBRL(service.price)}
                                </span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </label>
    );
}
