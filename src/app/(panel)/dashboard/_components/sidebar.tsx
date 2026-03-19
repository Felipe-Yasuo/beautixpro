"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    CalendarDays,
    Scissors,
    User,
    BarChart2,
    CreditCard,
    LogOut,
} from "lucide-react";

interface SidebarProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

const links = [
    { href: "/dashboard", label: "Agendamentos", icon: CalendarDays },
    { href: "/dashboard/services", label: "Serviços", icon: Scissors },
    { href: "/dashboard/profile", label: "Perfil", icon: User },
    { href: "/dashboard/reports", label: "Relatórios", icon: BarChart2 },
    { href: "/dashboard/plans", label: "Planos", icon: CreditCard },
];

export function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex flex-col border-r border-[#c9a84c22] p-6 gap-8 sticky top-0 h-screen">
            {/* Logo */}
            <Image
                src="/logo.png"
                alt="BeautixPro"
                width={130}
                height={40}
                className="object-contain"
            />

            {/* Nav */}
            <nav className="flex flex-col gap-1 flex-1">
                {links.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-3 text-sm tracking-wide transition-colors ${isActive
                                    ? "text-[#c9a84c] border-l-2 border-[#c9a84c] bg-[#c9a84c11]"
                                    : "text-[#5a5045] hover:text-[#c9a84c] border-l-2 border-transparent"
                                }`}
                        >
                            <Icon size={16} />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* User + logout */}
            <div className="flex flex-col gap-4 border-t border-[#c9a84c22] pt-6">
                <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 flex-shrink-0">
                        <Image
                            src={user.image ?? "/foto.png"}
                            alt={user.name ?? "Usuário"}
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <p className="text-[#f0ead6] text-xs font-medium truncate">
                            {user.name}
                        </p>
                        <p className="text-[#3a3028] text-[10px] truncate">{user.email}</p>
                    </div>
                </div>

                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-3 text-[#5a5045] hover:text-red-400 text-sm transition-colors cursor-pointer"
                >
                    <LogOut size={16} />
                    Sair
                </button>
            </div>
        </aside>
    );
}