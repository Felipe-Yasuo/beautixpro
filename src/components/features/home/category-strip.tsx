import Link from "next/link";
import { Fragment } from "react";

const CATEGORIES = [
    "Coloração",
    "Cortes",
    "Barbearia",
    "Estética",
    "Unhas",
    "Penteados",
];

export function CategoryStrip() {
    return (
        <div className="border-y border-outline">
            <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-[22px] px-6 py-[18px] lg:px-12">
                {CATEGORIES.map((cat, i) => (
                    <Fragment key={cat}>
                        <Link
                            href="#atelies"
                            className="text-[11px] uppercase tracking-[0.28em] text-[#6f5642] transition-colors hover:text-gold"
                        >
                            {cat}
                        </Link>
                        {i < CATEGORIES.length - 1 && (
                            <span className="text-[12px]" style={{ color: "#b4532a" }}>
                                ✳
                            </span>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}