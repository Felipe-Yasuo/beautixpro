import { Suspense } from "react";
import { Appointments } from "./_components/appointments/appointments";
import { Reminders } from "./_components/reminder/reminders";
import { auth } from "@/lib/auth";
import { CopyLinkButton } from "./_components/button-copy-link";

interface PageProps {
    searchParams: Promise<{ date?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
    const { date } = await searchParams;
    const selectedDate = date ? new Date(date + "T00:00:00") : new Date();
    const session = await auth();

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-end gap-3">
                <a
                    href={`/salao/${session?.user?.id}`}
                    target="_blank"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
                >
                    + Novo agendamento
                </a>
                <CopyLinkButton userId={session?.user?.id ?? ""} />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Suspense>
                        <Appointments date={selectedDate} />
                    </Suspense>
                </div>
                <div>
                    <Suspense>
                        <Reminders />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}