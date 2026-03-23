// dialog-service-form.tsx
"use client";

import { useState } from "react";
import { createService } from "../_actions/create-service";
import { updateService } from "../_actions/update-service";

interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
    status: boolean;
}

interface DialogServiceFormProps {
    service?: Service;
    onClose: () => void;
}

export function DialogServiceForm({ service, onClose }: DialogServiceFormProps) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Decompõe duration em horas e minutos para os campos separados
    const defaultHours = service ? Math.floor(service.duration / 60) : 0;
    const defaultMinutes = service ? service.duration % 60 : 30;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Converte horas + minutos em um único campo duration
        const hours = Number(formData.get("hours") ?? 0);
        const minutes = Number(formData.get("minutes") ?? 0);
        formData.set("duration", String(hours * 60 + minutes));
        formData.delete("hours");
        formData.delete("minutes");

        const result = service
            ? await updateService(formData)
            : await createService(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
            return;
        }

        onClose();
        setLoading(false);
    }

    const inputClass =
        "bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#ffffff20] transition-colors w-full";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {service && <input type="hidden" name="id" value={service.id} />}

            {/* Nome */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Nome do serviço
                </label>
                <input
                    name="name"
                    type="text"
                    defaultValue={service?.name}
                    placeholder="Ex: Corte feminino"
                    required
                    className={inputClass}
                />
            </div>

            {/* Valor */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Valor do serviço (R$)
                </label>
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={service ? (service.price / 100).toFixed(2) : ""}
                    placeholder="Ex: 120,00"
                    required
                    className={inputClass}
                />
            </div>

            {/* Duração: horas + minutos */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Tempo de duração do serviço
                </label>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                        <span className="text-[#ffffff40] text-xs">Horas</span>
                        <input
                            name="hours"
                            type="number"
                            min="0"
                            max="23"
                            defaultValue={defaultHours}
                            required
                            className={inputClass}
                        />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <span className="text-[#ffffff40] text-xs">Minutos</span>
                        <input
                            name="minutes"
                            type="number"
                            min="0"
                            max="59"
                            defaultValue={defaultMinutes}
                            required
                            className={inputClass}
                        />
                    </div>
                </div>
            </div>

            {/* Status — só no update */}
            {service && (
                <div className="flex flex-col gap-1.5">
                    <label className="text-[#c9a84c] text-xs tracking-widest uppercase">
                        Status
                    </label>
                    <select
                        name="status"
                        defaultValue={service.status ? "true" : "false"}
                        className="bg-[#0a0a0a] border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] transition-colors cursor-pointer w-full"
                    >
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                    </select>
                </div>
            )}

            {error && <p className="text-red-400 text-xs">{error}</p>}

            {/* Botões */}
            <div className="flex flex-col gap-2 mt-1">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#c9a84c] text-black py-3.5 text-xs tracking-widest uppercase font-semibold hover:bg-[#e8c97a] transition-colors disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Salvando..." : service ? "Salvar serviço" : "Cadastrar serviço"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full border border-[#c9a84c22] text-[#ffffff30] py-3 text-xs tracking-widest uppercase hover:text-[#ffffff60] hover:border-[#c9a84c44] transition-colors cursor-pointer"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
