import { Suspense } from "react";
import { Topbar } from "@/components/features/dashboard/topbar";
import { Appointments } from "@/components/features/dashboard/appointments/appointments";
import { Reminders } from "@/components/features/dashboard/reminder/reminders";
import { ProductivityCard } from "@/components/features/dashboard/productivity-card";

interface PageProps {
    searchParams: Promise<{ date?: string; employeeId?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
    const { date, employeeId } = await searchParams;
    const selectedDate = date ? new Date(`${date}T00:00:00`) : new Date();

    return (
        <div className="flex flex-col">
            <Suspense>
                <Topbar />
            </Suspense>

            <div
                className="grid grid-cols-1 min-[1101px]:grid-cols-[1fr_344px]"
                style={{ gap: "24px", padding: "8px 40px 48px" }}
            >
                <Suspense>
                    <Appointments date={selectedDate} employeeId={employeeId} />
                </Suspense>

                <div className="flex flex-col gap-6">
                    <Suspense>
                        <Reminders />
                    </Suspense>
                    <Suspense>
                        <ProductivityCard />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}