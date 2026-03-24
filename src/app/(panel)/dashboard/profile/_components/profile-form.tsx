"use client";

import { useState } from "react";
import { X, Clock, ChevronRight } from "lucide-react";
import { updateProfile } from "../_actions/update-profile";

const ALL_TIMES = [
    "08:00", "08:30", "09:00", "09:30", "10:00",
    "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00",
    "20:30", "21:00", "21:30", "22:00", "22:30",
    "23:00", "23:30", "00:00",
];

const TIMEZONES = [
    { value: "America/Sao_Paulo", label: "Brasília (GMT-3)" },
    { value: "America/Manaus", label: "Manaus (GMT-4)" },
    { value: "America/Belem", label: "Belém (GMT-3)" },
    { value: "America/Fortaleza", label: "Fortaleza (GMT-3)" },
    { value: "America/Recife", label: "Recife (GMT-3)" },
    { value: "America/Cuiaba", label: "Cuiabá (GMT-4)" },
    { value: "America/Porto_Velho", label: "Porto Velho (GMT-4)" },
    { value: "America/Boa_Vista", label: "Boa Vista (GMT-4)" },
    { value: "America/Rio_Branco", label: "Rio Branco (GMT-5)" },
    { value: "America/Noronha", label: "Fernando de Noronha (GMT-2)" },
];

interface ProfileFormProps {
    user: {
        name?: string | null;
        phone?: string | null;
        address?: string | null;
        times: string[];
        status: boolean;
        timeZone?: string | null;
    };
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [selectedTimes, setSelectedTimes] = useState<string[]>(user.times ?? []);
    const [showTimesModal, setShowTimesModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function toggleTime(time: string) {
        setSelectedTimes((prev) =>
            prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
        );
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        selectedTimes.forEach((time) => formData.append("times", time));

        const result = await updateProfile(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
    }

    const inputClass =
        "bg-[#141414] border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#ffffff20] transition-colors w-full rounded-lg";

    const selectClass =
        "bg-[#141414] border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] transition-colors cursor-pointer w-full rounded-lg";

    const labelClass = "text-[#c9a84c] text-xs tracking-widest uppercase";

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Nome completo</label>
                    <input
                        name="name"
                        type="text"
                        defaultValue={user.name ?? ""}
                        placeholder="Seu nome"
                        required
                        className={inputClass}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Endereço completo</label>
                    <input
                        name="address"
                        type="text"
                        defaultValue={user.address ?? ""}
                        placeholder="Digite o endereço da clínica..."
                        required
                        className={inputClass}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Telefone</label>
                    <input
                        name="phone"
                        type="tel"
                        defaultValue={user.phone ?? ""}
                        placeholder="(00) 00000-0000"
                        required
                        className={inputClass}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Status da clínica</label>
                    <select
                        name="status"
                        defaultValue={user.status ? "true" : "false"}
                        className={selectClass}
                    >
                        <option value="true">Ativo (clínica aberta)</option>
                        <option value="false">Inativo (clínica fechada)</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Configurar horários da clínica</label>
                    <button
                        type="button"
                        onClick={() => setShowTimesModal(true)}
                        className="flex items-center justify-between bg-[#141414] border border-[#c9a84c33] text-[#ffffff60] px-4 py-3 text-sm hover:border-[#c9a84c] hover:text-[#f0ead6] transition-colors cursor-pointer w-full text-left rounded-lg"
                    >
                        <span>
                            {selectedTimes.length > 0
                                ? `${selectedTimes.length} horário${selectedTimes.length > 1 ? "s" : ""} selecionado${selectedTimes.length > 1 ? "s" : ""}`
                                : "Clique aqui para selecionar horários"}
                        </span>
                        <ChevronRight size={16} className="text-[#c9a84c] shrink-0" />
                    </button>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Fuso horário</label>
                    <select
                        name="timeZone"
                        defaultValue={user.timeZone ?? "America/Sao_Paulo"}
                        className={selectClass}
                    >
                        {TIMEZONES.map((tz) => (
                            <option key={tz.value} value={tz.value}>
                                {tz.label}
                            </option>
                        ))}
                    </select>
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}
                {success && (
                    <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                        Perfil atualizado com sucesso!
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#c9a84c] text-black py-3.5 text-xs tracking-widest uppercase font-semibold hover:bg-[#e8c97a] transition-colors disabled:opacity-50 cursor-pointer mt-2 rounded-lg"
                >
                    {loading ? "Salvando..." : "Salvar alterações"}
                </button>
            </form>

            {showTimesModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowTimesModal(false)}
                    />

                    <div className="relative bg-[#141414] border border-[#c9a84c44] w-full max-w-lg mx-4 z-10 rounded-xl overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#c9a84c]" />

                        <div className="flex items-start justify-between p-6 pb-4">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-white">
                                    Horários da clínica
                                </h2>
                                <p className="text-[#ffffff40] text-xs tracking-widest uppercase mt-1">
                                    Selecione os horários de funcionamento
                                </p>
                            </div>
                            <button
                                onClick={() => setShowTimesModal(false)}
                                className="text-[#ffffff30] hover:text-[#c9a84c] transition-colors cursor-pointer mt-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="px-6 pb-6">
                            <p className="text-[#ffffff30] text-xs mb-4">
                                Clique nos horários abaixo para marcar ou desmarcar:
                            </p>
                            <div className="grid grid-cols-5 gap-2">
                                {ALL_TIMES.map((time) => {
                                    const isSelected = selectedTimes.includes(time);
                                    return (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => toggleTime(time)}
                                            className={`py-2.5 text-xs tracking-wide border transition-colors cursor-pointer rounded-lg ${isSelected
                                                    ? "border-[#c9a84c] bg-[#c9a84c15] text-[#c9a84c]"
                                                    : "border-[#2a2a2a] text-[#ffffff40] hover:border-[#c9a84c55] hover:text-[#ffffff70]"
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="border-t border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[#ffffff30]">
                                <Clock size={13} />
                                <span className="text-xs">
                                    {selectedTimes.length} horário{selectedTimes.length !== 1 ? "s" : ""} selecionado{selectedTimes.length !== 1 ? "s" : ""}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowTimesModal(false)}
                                className="bg-[#c9a84c] text-black px-6 py-2.5 text-xs tracking-widest uppercase font-semibold hover:bg-[#e8c97a] transition-colors cursor-pointer rounded-lg"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}