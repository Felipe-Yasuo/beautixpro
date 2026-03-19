"use client";

import { useState } from "react";
import { DatePicker } from "./date-picker";
import { ScheduleTimeList } from "./schedule-time-list";
import { createAppointment } from "../_actions/create-appointment";

interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
}

interface ScheduleFormProps {
    user: {
        id: string;
        times: string[];
        services: Service[];
    };
}

export function ScheduleForm({ user }: ScheduleFormProps) {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedService || !selectedDate || !selectedTime) {
            setError("Selecione o serviço, data e horário.");
            return;
        }

        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.set("serviceId", selectedService.id);
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

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 py-20">
                <div className="w-16 h-16 rounded-full border border-[#c9a84c] flex items-center justify-center text-[#c9a84c] text-2xl">
                    ✓
                </div>
                <h2 className="text-2xl font-light text-[#f0ead6]">Agendamento confirmado!</h2>
                <p className="text-[#5a5045] text-sm text-center max-w-sm">
                    Seu agendamento foi realizado com sucesso. Aguarde a confirmação do salão.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Coluna esquerda */}
            <div className="flex flex-col gap-10">
                {/* Serviços */}
                <div>
                    <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-4">
                        1. Escolha o serviço
                    </p>
                    <div className="flex flex-col gap-2">
                        {user.services.map((service) => (
                            <button
                                key={service.id}
                                type="button"
                                onClick={() => setSelectedService(service)}
                                className={`flex items-center justify-between p-4 border text-left transition-colors cursor-pointer ${selectedService?.id === service.id
                                    ? "border-[#c9a84c] bg-[#c9a84c11]"
                                    : "border-[#c9a84c22] hover:border-[#c9a84c55]"
                                    }`}
                            >
                                <span className="text-[#f0ead6] text-sm">{service.name}</span>
                                <div className="text-right">
                                    <p className="text-[#c9a84c] text-sm">
                                        R$ {(service.price / 100).toFixed(2)}
                                    </p>
                                    <p className="text-[#3a3028] text-xs">{service.duration} min</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Data */}
                <div>
                    <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-4">
                        2. Escolha a data
                    </p>
                    <DatePicker selected={selectedDate} onChange={setSelectedDate} />
                </div>
            </div>

            {/* Coluna direita */}
            <div className="flex flex-col gap-10">
                {/* Horários */}
                <div>
                    <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-4">
                        3. Escolha o horário
                    </p>
                    <ScheduleTimeList
                        times={user.times}
                        selectedTime={selectedTime}
                        onSelect={setSelectedTime}
                        userId={user.id}
                        selectedDate={selectedDate}
                    />
                </div>

                {/* Dados pessoais */}
                <div>
                    <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-4">
                        4. Seus dados
                    </p>
                    <div className="flex flex-col gap-3">
                        <input
                            name="name"
                            type="text"
                            placeholder="Seu nome"
                            required
                            className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Seu e-mail"
                            required
                            className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                        />
                        <input
                            name="phone"
                            type="tel"
                            placeholder="Seu telefone"
                            required
                            className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                        />
                    </div>
                </div>

                {error && (
                    <p className="text-red-400 text-xs">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#c9a84c] text-black py-4 text-xs tracking-widest uppercase hover:bg-[#e8c97a] transition-colors disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Aguarde..." : "Confirmar agendamento"}
                </button>
            </div>
        </form>
    );
}