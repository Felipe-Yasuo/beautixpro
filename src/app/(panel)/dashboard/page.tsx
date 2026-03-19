import { auth } from "@/lib/auth";

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div className="flex flex-col gap-2">
            <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                Bem-vindo de volta
            </p>
            <h1 className="text-3xl font-light text-[#f0ead6]">
                Olá, {session?.user?.name?.split(" ")[0]} 👋
            </h1>
        </div>
    );
}