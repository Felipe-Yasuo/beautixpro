import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/features/dashboard/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-surface-lowest">
            <Sidebar user={session.user} />

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <header className="flex items-center gap-3 border-b border-outline-variant px-4 py-3 min-[761px]:hidden">
                    <Sidebar user={session.user} mobileOnly />
                    <span className="text-sm font-medium text-on-surface">
                        Menu BeautixPro
                    </span>
                </header>

                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}