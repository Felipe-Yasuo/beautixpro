
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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);

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

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {service && (
                <input type="hidden" name="id" value={service.id} />
            )}

            <div className="flex flex-col gap-1">
                <label className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Nome do serviço
                </label>
                <input
                    name="name"
                    type="text"
                    defaultValue={service?.name}
                    placeholder="Ex: Corte feminino"
                    required
                    className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                />
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-[#c9a84c] text-xs tracking-widest uppercase">
                        Preço (R$)
                    </label>
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        defaultValue={service ? (service.price / 100).toFixed(2) : ""}
                        placeholder="0,00"
                        required
                        className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-[#c9a84c] text-xs tracking-widest uppercase">
                        Duração (min)
                    </label>
                    <input
                        name="duration"
                        type="number"
                        min="1"
                        defaultValue={service?.duration}
                        placeholder="60"
                        required
                        className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] placeholder:text-[#3a3028] transition-colors"
                    />
                </div>
            </div>

            {service && (
                <div className="flex flex-col gap-1">
                    <label className="text-[#c9a84c] text-xs tracking-widest uppercase">
                        Status
                    </label>
                    <select
                        name="status"
                        defaultValue={service.status ? "true" : "false"}
                        className="bg-[#0a0a0a] border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] transition-colors cursor-pointer"
                    >
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                    </select>
                </div>
            )}

            {error && (
                <p className="text-red-400 text-xs">{error}</p>
            )}

            <div className="flex gap-3 mt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border border-[#c9a84c33] text-[#5a5045] py-3 text-xs tracking-widest uppercase hover:border-[#c9a84c55] transition-colors cursor-pointer"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#c9a84c] text-black py-3 text-xs tracking-widest uppercase hover:bg-[#e8c97a] transition-colors disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Salvando..." : service ? "Salvar" : "Criar"}
                </button>
            </div>
        </form>
    );
}