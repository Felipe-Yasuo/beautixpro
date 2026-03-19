"use client";

import { useState } from "react";
import { updateProfile } from "../_actions/update-profile";

const ALL_TIMES = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00",
];

interface ProfileFormProps {
    user: {
        name?: string | null;
        phone?: string | null;
        address?: string | null;
        times: string[];
    };
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [selectedTimes, setSelectedTimes] = useState<string[]>(user.times ?? []);
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

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Dados pessoais */}
            <div className="flex flex-col gap-4">
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Dados pessoais
                </p>

                <div className="flex flex-col gap-3">
                    <input
                        name="name"
                        type="text"
                        defaultValue={user.name ?? ""}
                        placeholder="Seu nome"
                        required
                        className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                    />
                    <input
                        name="phone"
                        type="tel"
                        defaultValue={user.phone ?? ""}
                        placeholder="Telefone"
                        required
                        className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                    />
                    <input
                        name="address"
                        type="text"
                        defaultValue={user.address ?? ""}
                        placeholder="Endereço do salão"
                        required
                        className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                    />
                </div>
            </div>

            {/* Horários */}
            <div className="flex flex-col gap-4">
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Horários de atendimento
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {ALL_TIMES.map((time) => {
                        const isSelected = selectedTimes.includes(time);
                        return (
                            <button
                                key={time}
                                type="button"
                                onClick={() => toggleTime(time)}
                                className={`py-2 text-xs tracking-widest border transition-colors cursor-pointer ${isSelected
                                        ? "border-[#c9a84c] bg-[#c9a84c11] text-[#c9a84c]"
                                        : "border-[#c9a84c22] text-[#5a5045] hover:border-[#c9a84c55]"
                                    }`}
                            >
                                {time}
                            </button>
                        );
                    })}
                </div>
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
                className="w-fit bg-[#c9a84c] text-black px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#e8c97a] transition-colors disabled:opacity-50 cursor-pointer"
            >
                {loading ? "Salvando..." : "Salvar alterações"}
            </button>
        </form>
    );
}