"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { updateAvatar } from "../_actions/update-avatar";

interface ProfileAvatarProps {
    image?: string | null;
    name?: string | null;
}

export function ProfileAvatar({ image, name }: ProfileAvatarProps) {
    const [preview, setPreview] = useState<string | null>(image ?? null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/image/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.url) {
            setPreview(data.url);
            await updateAvatar(data.url);
        }

        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center gap-3">
            <div
                className="relative w-32 h-32 cursor-pointer group"
                onClick={() => inputRef.current?.click()}
            >
                {preview ? (
                    <Image
                        src={preview}
                        alt={name ?? "Avatar"}
                        fill
                        className="object-cover rounded-full"
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-[#1a1a1a] border border-[#2a2a2a]" />
                )}

                {/* Overlay com ícone */}
                <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                    {loading ? (
                        <span className="text-[#c9a84c] text-[10px] tracking-widest uppercase">
                            Enviando...
                        </span>
                    ) : (
                        <>
                            <Upload size={18} className="text-[#c9a84c]" />
                            <span className="text-[#c9a84c] text-[9px] tracking-widest uppercase">
                                Trocar foto
                            </span>
                        </>
                    )}
                </div>

                {/* Ícone visível quando sem hover (sem foto) */}
                {!preview && (
                    <div className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none">
                        <Upload size={20} className="text-[#ffffff20]" />
                    </div>
                )}
            </div>

            <p className="text-[#ffffff30] text-xs tracking-widest uppercase">
                Clique para alterar a foto
            </p>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
            />
        </div>
    );
}