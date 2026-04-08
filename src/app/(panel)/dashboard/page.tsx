import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { Appointments } from "./_components/appointments/appointments";
import { Reminders } from "./_components/reminder/reminders";
import { CopyLinkButton } from "./_components/button-copy-link";
import { getDailyRevenue } from "./_data-access/get-daily-revenue";
import { formatBRL } from "@/lib/formatters";

interface PageProps {
    searchParams: Promise<{ date?: string; employeeId?: string }>;
}

function calcPercentChange(today: number, yesterday: number): number | null {
    if (yesterday === 0) return null;
    return Math.round(((today - yesterday) / yesterday) * 100);
}

export default async function DashboardPage({ searchParams }: PageProps) {
    const { date, employeeId } = await searchParams;
    const selectedDate = date ? new Date(`${date}T00:00:00`) : new Date();

    const [session, { today, yesterday }] = await Promise.all([
        auth(),
        getDailyRevenue(),
    ]);

    const userId = session?.user?.id ?? "";
    const percentChange = calcPercentChange(today, yesterday);
    const hasNoRevenue = today === 0 && yesterday === 0;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                        Status: Disponível para hoje
                    </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <CopyLinkButton userId={userId} />
                    <a
                        href={`/salao/${userId}`}
                        target="_blank"
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-3 sm:px-5 xl:px-6 py-2.5 xl:py-3 text-xs sm:text-sm xl:text-base 2xl:text-lg font-bold rounded-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] whitespace-nowrap"
                    >
                        + Novo agendamento
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Suspense>
                        <Appointments date={selectedDate} employeeId={employeeId} />
                    </Suspense>
                </div>

                <div className="flex flex-col gap-6">
                    <Suspense>
                        <Reminders />
                    </Suspense>

                    <div className="border border-primary/30 bg-primary/10 rounded-lg p-6">
                        <p className="text-primary text-xs xl:text-sm 2xl:text-base tracking-widest uppercase font-medium mb-3">
                            Produtividade do dia
                        </p>
                        <div className="flex items-end gap-3">
                            <p className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-foreground">
                                R$ {formatBRL(today)}
                            </p>
                            {percentChange !== null && (
                                <span
                                    className={`text-xs xl:text-sm 2xl:text-base font-medium px-2 py-1 rounded-md mb-1 ${
                                        percentChange >= 0
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                    }`}
                                >
                                    {percentChange >= 0 ? "+" : ""}{percentChange}% vs ontem
                                </span>
                            )}
                        </div>
                        {yesterday > 0 && (
                            <p className="text-muted-foreground text-xs mt-2">
                                Ontem: R$ {formatBRL(yesterday)}
                            </p>
                        )}
                        {hasNoRevenue && (
                            <p className="text-muted-foreground text-xs mt-2">
                                Nenhum agendamento hoje ainda.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}