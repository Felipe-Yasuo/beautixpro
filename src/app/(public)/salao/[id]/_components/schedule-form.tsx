"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createAppointment } from "../_actions/create-appointment";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ScheduleTimeList } from "./schedule-time-list";

interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
}

interface Employee {
    id: string;
    name: string;
    times: string[];
    services: Service[];
}

interface ScheduleFormProps {
    user: {
        id: string;
        employees: Employee[];
    };
}

export function ScheduleForm({ user }: ScheduleFormProps) {
    const isMultiEmployee = user.employees.length > 1;

    // FREE/BASIC: usa o único employee direto, sem mostrar seleção
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        isMultiEmployee ? null : user.employees[0] ?? null
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const isComplete = name && email && phone && selectedEmployee && selectedService && selectedDate && selectedTime;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isComplete) return;

        setError("");
        setLoading(true);

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("phone", phone);
        formData.set("serviceId", selectedService.id);
        formData.set("employeeId", selectedEmployee.id);
        formData.set("appointmentDate", selectedDate.toISOString());
        formData.set("time", selectedTime);
        formData.set("userId", user.id);

        const result = await createAppointment(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
    }

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

            {/* Seleção de funcionário — só PROFESSIONAL (múltiplos employees) */}
            {isMultiEmployee && (
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Selecione o profissional:</label>
                    <Select
                        onValueChange={(value) => {
                            const employee = user.employees.find((e) => e.id === value);
                            setSelectedEmployee(employee ?? null);
                            setSelectedService(null);
                            setSelectedTime(null);
                        }}
                    >
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

            {/* Nome */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Nome completo:</label>
                <input
                    type="text"
                    placeholder="Digite seu nome completo..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Email:</label>
                <input
                    type="email"
                    placeholder="Digite seu email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
            </div>

            {/* Telefone */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Telefone:</label>
                <input
                    type="tel"
                    placeholder="(XX) XXXXX-XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
            </div>

            {/* Serviço — só aparece após selecionar employee (ou sempre para FREE/BASIC) */}
            {selectedEmployee && (
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Selecione o serviço:</label>
                    <Select
                        onValueChange={(value) => {
                            const service = selectedEmployee.services.find((s) => s.id === value);
                            setSelectedService(service ?? null);
                            setSelectedTime(null);
                        }}
                    >
                        <SelectTrigger className="w-full bg-background border-border text-foreground">
                            <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                            {selectedEmployee.services.map((service) => (
                                <SelectItem key={service.id} value={service.id} className="text-foreground">
                                    {service.name} — {Math.floor(service.duration / 60) > 0 ? `${Math.floor(service.duration / 60)}h ` : ""}{service.duration % 60 > 0 ? `${service.duration % 60}min` : ""}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Data */}
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
                                onSelect={(date) => {
                                    setSelectedDate(date ?? null);
                                    setSelectedTime(null);
                                }}
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            )}

            {/* Horários */}
            {selectedEmployee && selectedService && selectedDate && (
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Horários disponíveis:</label>
                    <ScheduleTimeList
                        times={selectedEmployee.times}
                        selectedTime={selectedTime}
                        onSelect={setSelectedTime}
                        employeeId={selectedEmployee.id}
                        selectedDate={selectedDate}
                        serviceDuration={selectedService.duration}
                    />
                </div>
            )}

            {error && <p className="text-destructive text-xs">{error}</p>}

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
