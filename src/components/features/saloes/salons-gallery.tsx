"use client";

import { useState, useMemo, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type Category } from "@/lib/salon-categories";

type Salon = {
    id: string;
    name: string;
    image: string;
    address: string;
    isPremium: boolean;
    services: string[];
    categories: Category[];
};

interface SalonsGalleryProps {
    salons: Salon[];
}

export function SalonsGallery({ salons }: SalonsGalleryProps) {
    const [filter, setFilter] = useState<Category | "Todos">("Todos");

    const filtered = useMemo(() => {
        if (filter === "Todos") return salons;
        return salons.filter((s) => s.categories.includes(filter));
    }, [salons, filter]);

    return (
        <section className="mx-auto max-w-[1280px] px-6 pt-28 pb-24 lg:px-12 lg:pt-36 lg:pb-32">
            {/* Hero */}
            <div>
                <span className="text-[11px] uppercase tracking-[0.42em] text-gold">
                    Todos os salões
                </span>
                <h1
                    className="mt-4 max-w-[18ch] font-serif font-normal leading-[1.05] text-on-surface"
                    style={{ fontSize: "clamp(36px, 4.6vw, 60px)" }}
                >
                    Profissionais para toda hora do seu cuidado.
                </h1>
                <p className="mt-4 text-[16px]" style={{ color: "#7d6450" }}>
                    {salons.length} {salons.length === 1 ? "salão" : "salões"} e profissionais
                    com agenda aberta perto de você.
                </p>
            </div>

            {/* Filtros */}
            <div className="my-10 border-y border-outline">
                <div className="flex flex-wrap gap-3 py-6">
                    <Chip label="Todos" active={filter === "Todos"} onClick={() => setFilter("Todos")} />
                    {CATEGORIES.map((cat) => (
                        <Chip key={cat} label={cat} active={filter === cat} onClick={() => setFilter(cat)} />
                    ))}
                </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="py-24 text-center">
                    <p className="font-serif text-2xl italic text-on-surface">
                        Nenhum salão nesta categoria ainda.
                    </p>
                    <button
                        onClick={() => setFilter("Todos")}
                        className="mt-4 text-[11px] uppercase tracking-[0.18em] text-gold underline underline-offset-4"
                    >
                        Ver todos
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {filtered.map((salon) => (
                        <SalonCard key={salon.id} salon={salon} />
                    ))}
                </div>
            )}
        </section>
    );
}

function Chip({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors"
            style={
                active
                    ? { backgroundColor: "var(--gold)", color: "#fff", border: "1px solid var(--gold)" }
                    : { backgroundColor: "transparent", color: "#6f5642", border: "1px solid #d9c3ae" }
            }
        >
            {label}
        </button>
    );
}

function SalonCard({ salon }: { salon: Salon }) {
    return (
        <article className="group flex flex-col">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[4px]">
                <Image
                    src={salon.image}
                    alt={salon.name}
                    fill
                    className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {salon.isPremium && (
                    <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                        Premium
                    </span>
                )}
            </div>

            <h3 className="mt-4 font-serif font-normal text-on-surface" style={{ fontSize: "21px" }}>
                {salon.name}
            </h3>
            {salon.address && (
                <p className="mt-1 text-[12px]" style={{ color: "#a08265" }}>
                    {salon.address}
                </p>
            )}
            {salon.services.length > 0 && (
                <p className="mt-2 text-[13px]" style={{ color: "#7d6450" }}>
                    {salon.services.slice(0, 3).join(" · ")}
                </p>
            )}
            <Link
                href={`/salao/${salon.id}`}
                className="mt-3 text-[10.5px] uppercase tracking-[0.18em] text-gold underline underline-offset-4 transition-colors hover:text-gold-container"
            >
                Reservar
            </Link>
        </article>
    );
}