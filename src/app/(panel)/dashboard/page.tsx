import { Suspense } from "react";
import { Appointments } from "./_components/appointments/appointments";

interface PageProps {
    searchParams: Promise<{ date?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
    const { date } = await searchParams;
    const selectedDate = date ? new Date(date + "T00:00:00") : new Date();

    return (
        <Suspense>
            <Appointments date={selectedDate} />
        </Suspense>
    );
}