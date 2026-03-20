"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
    CalendarDays,
    Scissors,
    User,
    BarChart2,
    CreditCard,
    LogOut,
    ChevronLeft,
    ChevronRight,
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

const links = [
    { href: "/dashboard", label: "Agendamentos", icon: CalendarDays, group: "PAINEL" },
    { href: "/dashboard/services", label: "Serviços", icon: Scissors, group: "PAINEL" },
    { href: "/dashboard/profile", label: "Meu perfil", icon: User, group: "CONFIGURAÇÕES" },
    { href: "/dashboard/plans", label: "Planos", icon: CreditCard, group: "CONFIGURAÇÕES" },
    { href: "/dashboard/reports", label: "Relatórios", icon: BarChart2, group: "CONFIGURAÇÕES" },
];

const groups = ["PAINEL", "CONFIGURAÇÕES"];

function SidebarContent({
    collapsed,
    pathname,
    user,
}: {
    collapsed?: boolean;
    pathname: string;
    user: SidebarProps["user"];
}) {
    return (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-4 mb-4">
                {collapsed ? (
                    <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-bold text-sm">
                        B
                    </div>
                ) : (
                    <Image
                        src="/logo.png"
                        alt="BeautixPro"
                        width={130}
                        height={40}
                        className="object-contain"
                    />
                )}
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-6 flex-1 px-2">
                {groups.map((group) => {
                    const groupLinks = links.filter((l) => l.group === group);
                    return (
                        <div key={group} className="flex flex-col gap-1">
                            {!collapsed && (
                                <p className="text-muted-foreground text-[10px] tracking-widest uppercase px-2 mb-1">
                                    {group}
                                </p>
                            )}
                            {groupLinks.map(({ href, label, icon: Icon }) => {
                                const isActive = pathname === href;
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                            }`}
                                    >
                                        <Icon size={16} className="flex-shrink-0" />
                                        {!collapsed && label}
                                    </Link>
                                );
                            })}
                        </div>
                    );
                })}
            </nav>

            {/* User + logout */}
            <div className="border-t border-border p-4 flex flex-col gap-3">
                {!collapsed && (
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 flex-shrink-0">
                            <Image
                                src={user.image ?? "/foto.png"}
                                alt={user.name ?? "Usuário"}
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <p className="text-foreground text-xs font-medium truncate">{user.name}</p>
                            <p className="text-muted-foreground text-[10px] truncate">{user.email}</p>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className={`flex items-center gap-3 text-muted-foreground hover:text-destructive text-sm transition-colors cursor-pointer ${collapsed ? "justify-center" : ""}`}
                >
                    <LogOut size={16} />
                    {!collapsed && "Sair"}
                </button>
            </div>
        </div>
    );
}

export function Sidebar({ user, mobileOnly }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    // Modo mobile only — só o botão hambúrguer
    if (mobileOnly) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <button className="text-foreground cursor-pointer">
                        <Menu size={20} />
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 bg-card border-border">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <SidebarContent pathname={pathname} user={user} />
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <>
            {/* Desktop sidebar */}
            <aside
                className={`hidden md:flex flex-col border-r border-border sticky top-0 h-screen transition-all duration-300 ${collapsed ? "w-16" : "w-64"
                    }`}
            >
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-6 bg-card border border-border rounded-full w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer z-10"
                >
                    {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                </button>
                <SidebarContent collapsed={collapsed} pathname={pathname} user={user} />
            </aside>
        </>
    );
}