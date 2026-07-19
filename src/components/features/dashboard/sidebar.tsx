"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
    CalendarDays,
    Scissors,
    User,
    BarChart2,
    CreditCard,
    LogOut,
    Menu,
} from "lucide-react";

interface SidebarProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
    mobileOnly?: boolean;
}

const NAV_LINKS = [
    { href: "/dashboard", label: "Agendamentos", icon: CalendarDays, group: "Painel" },
    { href: "/dashboard/services", label: "Serviços", icon: Scissors, group: "Painel" },
    { href: "/dashboard/profile", label: "Meu perfil", icon: User, group: "Configurações" },
    { href: "/dashboard/plans", label: "Planos", icon: CreditCard, group: "Configurações" },
    { href: "/dashboard/reports", label: "Relatórios", icon: BarChart2, group: "Configurações" },
] as const;

const NAV_GROUPS = ["Painel", "Configurações"] as const;

function SidebarContent({
    pathname,
    user,
}: {
    pathname: string;
    user: SidebarProps["user"];
}) {
    const initial = user.name?.charAt(0).toUpperCase() ?? "?";

    return (
        <div className="flex h-full min-h-0 flex-1 flex-col">
            <Link href="/dashboard" className="flex items-center gap-[11px] px-3 pb-[30px]">
                <span
                    className="h-[9px] w-[9px] shrink-0 rounded-[2px]"
                    style={{ backgroundColor: "var(--clima-accent)" }}
                />
                <span className="font-serif" style={{ fontSize: "23px", letterSpacing: "-0.01em" }}>
                    <span style={{ color: "var(--clima-text)" }}>Beautix</span>
                    <span style={{ color: "var(--clima-accent)" }}>Pro</span>
                </span>
            </Link>

            <nav className="flex flex-1 flex-col gap-6 px-2">
                {NAV_GROUPS.map((group) => {
                    const groupLinks = NAV_LINKS.filter((l) => l.group === group);
                    return (
                        <div key={group} className="flex flex-col gap-1">
                            <p
                                className="mb-1 px-3 font-semibold uppercase"
                                style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--clima-text-subtle)" }}
                            >
                                {group}
                            </p>
                            {groupLinks.map(({ href, label, icon: Icon }) => {
                                const isActive = pathname === href;
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="flex items-center gap-[13px] rounded-[4px] px-3 py-3 text-sm transition-colors"
                                        style={{
                                            backgroundColor: isActive ? "var(--clima-accent-soft)" : "transparent",
                                            color: isActive ? "var(--clima-accent)" : "var(--clima-text-muted)",
                                            fontWeight: isActive ? 600 : 500,
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) e.currentTarget.style.backgroundColor = "var(--clima-surface-2)";
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                                        }}
                                    >
                                        <Icon size={17} strokeWidth={1.7} className="shrink-0" />
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>
                    );
                })}
            </nav>

            <div
                className="mt-auto flex flex-col gap-3 pt-[22px]"
                style={{ borderTop: "1px solid var(--clima-border)" }}
            >
                <div className="flex items-center gap-3 px-1">
                    <div
                        className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full font-serif text-white"
                        style={{ backgroundColor: "var(--clima-accent)", fontSize: "17px" }}
                    >
                        {initial}
                    </div>
                    <div className="flex min-w-0 flex-col">
                        <p className="truncate text-sm font-semibold" style={{ color: "var(--clima-text)" }}>
                            {user.name}
                        </p>
                        <p className="truncate text-xs" style={{ color: "var(--clima-text-muted)" }}>
                            {user.email}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    aria-label="Sair da conta"
                    className="flex cursor-pointer items-center gap-[13px] rounded-[4px] px-3 py-2 transition-colors"
                    style={{ fontSize: "13.5px", color: "var(--clima-text-muted)" }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--clima-surface-2)";
                        e.currentTarget.style.color = "var(--clima-text)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--clima-text-muted)";
                    }}
                >
                    <LogOut size={16} aria-hidden="true" />
                    <span>Sair</span>
                </button>
            </div>
        </div>
    );
}

export function Sidebar({ user, mobileOnly }: SidebarProps) {
    const pathname = usePathname();

    if (mobileOnly) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <button aria-label="Abrir menu" style={{ color: "var(--clima-text)" }} className="cursor-pointer">
                        <Menu size={20} aria-hidden="true" />
                    </button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="flex w-64 flex-col p-0"
                    style={{ backgroundColor: "var(--clima-surface)", borderColor: "var(--clima-border)" }}
                >
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <div className="flex-1 p-5">
                        <SidebarContent pathname={pathname} user={user} />
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <aside
            className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col p-[28px_20px] min-[761px]:flex"
            style={{
                backgroundColor: "var(--clima-surface)",
                borderRight: "1px solid var(--clima-border)",
            }}
        >
            <SidebarContent pathname={pathname} user={user} />
        </aside>
    );
}