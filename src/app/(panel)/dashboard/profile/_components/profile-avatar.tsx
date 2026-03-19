"use client";

import { useState, useRef } from "react";
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

        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/image/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.url) {
            await updateAvatar(data.url);
        }

        setLoading(false);
    }

    return (
        <div className="flex items-center gap-6">
            <div
                className="relative w-24 h-24 cursor-pointer group flex-shrink-0"
                onClick={() => inputRef.current?.click()}
            >
                <img
                    src={preview ?? "/foto.png"}
                    alt={name ?? "Avatar"}
                    style={{ width: "96px", height: "96px", objectFit: "cover", borderRadius: "50%" }}
                />
                <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[#c9a84c] text-[10px] tracking-widest uppercase">
                        {loading ? "..." : "Trocar"}
                    </span>
                </div>
            </div>

            <div>
                <p className="text-[#f0ead6] text-sm font-medium">{name}</p>
                <p className="text-[#3a3028] text-xs mt-1">
                    Clique na foto para alterar
                </p>
            </div>

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