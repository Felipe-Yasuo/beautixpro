"use client";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ScheduleTimeList } from "./schedule-time-list";
import { useScheduleForm } from "../_hooks/useScheduleForm";
import { useAvailableSlots } from "../_hooks/useAvailableSlots";
import type { Employee } from "../_hooks/useScheduleForm";

function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    const hoursPart = hours > 0 ? `${hours}h ` : "";
    const minutesPart = remainder > 0 ? `${remainder}min` : "";
    return `${hoursPart}${minutesPart}`.trim();
}

const INPUT_CLASS =
    "w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors";

const today = () => new Date(new Date().setHours(0, 0, 0, 0));

interface ScheduleFormProps {
    user: {
        id: string;
        employees: Employee[];
    };
}

export function ScheduleForm({ user }: ScheduleFormProps) {
    const {
        isMultiEmployee,
        selectedEmployee,
        selectedService,
        selectedDate,
        selectedTime,
        name,
        email,
        phone,
        fieldErrors,
        serverError,
        loading,
        success,
        isComplete,
        setName,
        setEmail,
        setPhone,
        setSelectedTime,
        validateField,
        handleEmployeeChange,
        handleServiceChange,
        handleDateChange,
        handleSubmit,
    } = useScheduleForm({ user });

    const { bookedTimes } = useAvailableSlots({
        employeeId: selectedEmployee?.id ?? null,
        selectedDate,
        serviceDuration: selectedService?.duration ?? 0,
    });

    if (user.employees.length === 0) {
        return (
            <p className="text-muted-foreground text-sm text-center py-10">
                Este salão ainda não possui serviços disponíveis.
            </p>
        );
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 py-20">
                <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary text-2xl">
                    ✓
                </div>
                <h2 className="text-xl font-bold text-foreground">Agendamento confirmado!</h2>
                <p className="text-muted-foreground text-sm text-center max-w-sm">
                    Seu agendamento foi realizado com sucesso. Aguarde a confirmação do salão.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 flex flex-col gap-5">
            {isMultiEmployee && (
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Selecione o profissional:</label>
                    <Select onValueChange={handleEmployeeChange}>
                        <SelectTrigger className="w-full bg-background border-border text-foreground">
                            <SelectValue placeholder="Selecione um profissional" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                            {user.employees.map((e) => (
                                <SelectItem key={e.id} value={e.id} className="text-foreground">
                                    {e.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Nome completo:</label>
                <input
                    type="text"
                    placeholder="Digite seu nome completo..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) => validateField("name", e.target.value)}
                    className={INPUT_CLASS}
                />
                {fieldErrors.name && <p className="text-destructive text-xs">{fieldErrors.name}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Email:</label>
                <input
                    type="email"
                    placeholder="Digite seu email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => validateField("email", e.target.value)}
                    className={INPUT_CLASS}
                />
                {fieldErrors.email && <p className="text-destructive text-xs">{fieldErrors.email}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Telefone:</label>
                <input
                    type="tel"
                    placeholder="(XX) XXXXX-XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={(e) => validateField("phone", e.target.value)}
                    className={INPUT_CLASS}
                />
                {fieldErrors.phone && <p className="text-destructive text-xs">{fieldErrors.phone}</p>}
            </div>

            {selectedEmployee && (
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Selecione o serviço:</label>
                    <Select onValueChange={handleServiceChange}>
                        <SelectTrigger className="w-full bg-background border-border text-foreground">
                            <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                            {selectedEmployee.services.map((service) => (
                                <SelectItem key={service.id} value={service.id} className="text-foreground">
                                    {service.name} — {formatDuration(service.duration)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {selectedService && (
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
                                onSelect={handleDateChange}
                                disabled={(date) => date < today()}
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            )}

            {selectedEmployee && selectedService && selectedDate && (
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Horários disponíveis:</label>
                    <ScheduleTimeList
                        times={selectedEmployee.times}
                        selectedTime={selectedTime}
                        onSelect={setSelectedTime}
                        bookedTimes={bookedTimes}
                    />
                </div>
            )}

            {serverError && <p className="text-destructive text-xs">{serverError}</p>}

            <button
                type="submit"
                disabled={!isComplete || loading}
                className="w-full bg-primary text-primary-foreground py-3 text-sm font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {loading ? "Aguarde..." : "Realizar agendamento"}
            </button>
        </form>
    );
}
