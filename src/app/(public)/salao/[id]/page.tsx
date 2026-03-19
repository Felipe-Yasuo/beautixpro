import { ScheduleContent } from "./_components/schedule-content";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SalaoPage({ params }: PageProps) {
    const { id } = await params;

    return <ScheduleContent userId={id} />;
}