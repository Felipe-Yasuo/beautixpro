import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PortalButton } from "./portal-button";

export async function SubscriptionDetail() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const subscription = await prisma.subscription.findUnique({
        where: { userId: session.user.id },
    });

    if (!subscription) return null;

    const planName = subscription.plan === "PROFESSIONAL" ? "Professional" : "Basic";

    return (
        <div
            className="flex flex-col gap-4 rounded-[10px] p-5 sm:flex-row sm:items-center sm:justify-between"
            style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
        >
            <div className="flex min-w-0 items-center gap-4">
                <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px]"
                    style={{ backgroundColor: "var(--clima-accent-soft)" }}
                >
                    <span style={{ color: "var(--clima-accent)" }}>★</span>
                </div>
                <div className="min-w-0">
                    <p className="text-sm" style={{ color: "var(--clima-text)" }}>
                        Seu plano:{" "}
                        <span className="font-semibold" style={{ color: "var(--clima-accent)" }}>{planName}</span>
                    </p>
                    <p className="mt-0.5 truncate text-xs" style={{ color: "var(--clima-text-muted)" }}>
                        {subscription.status === "active"
                            ? "Sua assinatura está ativa e renova automaticamente."
                            : `Status: ${subscription.status}`}
                    </p>
                </div>
            </div>

            <PortalButton />
        </div>
    );
}