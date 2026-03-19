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
        <div className="flex min-h-screen bg-[#0a0a0a]">
            <Sidebar user={session.user} />
            <main className="flex-1 p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}