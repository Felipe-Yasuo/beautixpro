import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function SubscriptionDetail() {
    const session = await auth();

    if (!session?.user?.id) return null;

    const subscription = await prisma.subscription.findUnique({
        where: { userId: session.user.id },
    });

    if (!subscription) return null;

    return (
        <div className="border border-[#c9a84c33] p-6 flex items-center justify-between mb-8">
            <div>
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-1">
                    Plano atual
                </p>
                <p className="text-[#f0ead6] text-xl font-light">
                    {subscription.plan === "PROFESSIONAL" ? "Professional" : "Basic"}
                </p>
            </div>
            <span
                className={`text-[10px] tracking-widest uppercase px-3 py-1 border ${subscription.status === "active"
                        ? "text-[#c9a84c] border-[#c9a84c33]"
                        : "text-red-400 border-red-400/30"
                    }`}
            >
                {subscription.status === "active" ? "Ativo" : subscription.status}
            </span>
        </div>
    );
}