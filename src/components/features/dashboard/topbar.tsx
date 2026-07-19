import { auth } from "@/lib/auth";
import { CopyLinkButton } from "./button-copy-link";
import { Plus } from "lucide-react";

export async function Topbar() {
    const session = await auth();
    const userId = session?.user?.id ?? "";

    return (
        <div
            className="flex flex-wrap items-center justify-between gap-4"
            style={{ padding: "34px 40px 24px" }}
        >
            <div>
                <h1
                    className="font-serif font-normal"
                    style={{ fontSize: "40px", lineHeight: 1, letterSpacing: "-0.02em", color: "var(--clima-text)" }}
                >
                    Dashboard
                </h1>
                <p className="mt-2 flex items-center gap-2 text-[13px]" style={{ color: "var(--clima-text-muted)" }}>
                    <span
                        className="inline-block h-[7px] w-[7px] rounded-full"
                        style={{ backgroundColor: "var(--clima-success)" }}
                    />
                    Status: Disponível para hoje
                </p>
            </div>

            <div className="flex items-center gap-3">
                <CopyLinkButton userId={userId} />
                <a href={`/salao/${userId}`} target="_blank" className="btn-solid-sm">
                    <Plus size={15} strokeWidth={2} />
                    Novo agendamento
                </a>
            </div>
        </div>
    );
}