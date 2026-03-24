// _components/subscription-detail.tsx
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
        <div className="bg-[#141414] border border-[#c9a84c33] rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1f1a0e] border border-[#c9a84c33] rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-[#c9a84c] text-lg">✦</span>
                </div>
                <div>
                    <p className="text-white text-sm">
                        Seu Plano:{" "}
                        <span className="font-bold text-[#c9a84c]">{planName}</span>
                    </p>
                    <p className="text-[#ffffff40] text-xs mt-0.5">
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