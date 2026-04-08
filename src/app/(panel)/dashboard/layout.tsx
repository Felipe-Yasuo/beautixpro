import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "./_components/sidebar";

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
        <div className="flex min-h-screen bg-background">
            <Sidebar user={session.user} />

            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                {/* Header mobile */}
                <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border">
                    <Sidebar user={session.user} mobileOnly />
                    <span className="text-foreground text-sm font-medium">
                        Menu BeautixPro
                    </span>
                </header>

                <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}