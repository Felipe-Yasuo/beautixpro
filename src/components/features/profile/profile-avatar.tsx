"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { updateAvatar } from "@/lib/actions/update-avatar";

interface ProfileAvatarProps {
    image?: string | null;
    name?: string | null;
}

export function ProfileAvatar({ image, name }: ProfileAvatarProps) {
    const [preview, setPreview] = useState<string | null>(image ?? null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const initials = (name ?? "?")
        .split(" ")
        .slice(0, 2)
        .map((p) => p.charAt(0).toUpperCase())
        .join("");

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
                role="button"
                tabIndex={0}
                className="relative h-[116px] w-[116px] cursor-pointer"
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        inputRef.current?.click();
                    }
                }}
                aria-label="Alterar foto de perfil"
            >
                <div
                    className="flex h-full w-full items-center justify-center overflow-hidden rounded-full"
                    style={{ backgroundColor: "var(--clima-accent-soft)" }}
                >
                    {preview ? (
                        <Image src={preview} alt={name ?? "Avatar"} fill className="rounded-full object-cover" />
                    ) : (
                        <span className="font-serif" style={{ fontSize: "30px", color: "var(--clima-accent)" }}>
                            {initials}
                        </span>
                    )}
                </div>

                <div
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full"
                    style={{
                        backgroundColor: "var(--clima-accent)",
                        border: "2px solid var(--clima-surface)",
                    }}
                >
                    <Camera size={14} className="text-white" />
                </div>
            </div>

            <p
                className="text-xs uppercase tracking-widest"
                style={{ color: loading ? "var(--clima-accent)" : "var(--clima-text-muted)" }}
            >
                {loading ? "Enviando..." : "Clique para alterar a foto"}
            </p>

            <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
        </div>
    );
}