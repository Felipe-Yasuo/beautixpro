import { getReports } from "@/lib/services/get-reports";
import { formatBRL } from "@/lib/formatters";
import { getUserPlan } from "@/lib/services/get-plan";

export async function ReportsContent() {
    const plan = await getUserPlan();

    if (plan !== "PROFESSIONAL") {
        return (
            <div className="flex flex-col items-center justify-center gap-6 py-32" style={{ padding: "34px 40px 48px" }}>
                <div
                    className="flex max-w-md flex-col items-center gap-4 rounded-[10px] p-10 text-center"
                    style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
                >
                    <p
                        className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                        style={{ color: "var(--clima-accent)" }}
                    >
                        Recurso premium
                    </p>
                    <h2 className="font-serif font-normal" style={{ fontSize: "26px", color: "var(--clima-text)" }}>
                        Relatórios disponíveis no plano Professional
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--clima-text-muted)" }}>
                        Acesse métricas detalhadas, faturamento e serviços mais populares
                        do seu salão.
                    </p>
                    <a
                        href="/dashboard/plans"
                        className="btn-profile-save mt-2"
                    >
                        Ver planos
                    </a>
                </div>
            </div >
        );
    }

    const reports = await getReports();

    if (!reports) return null;

    const metrics = [
        { label: "Total de agendamentos", value: String(reports.totalAppointments), highlight: false },
        { label: "Faturamento total", value: `R$ ${formatBRL(reports.totalRevenue)}`, highlight: true },
        { label: "Agendamentos este mês", value: String(reports.appointmentsThisMonth), highlight: false },
        { label: "Faturamento este mês", value: `R$ ${formatBRL(reports.revenueThisMonth)}`, highlight: true },
    ] as const;

    return (
        <div className="flex flex-col gap-10" style={{ padding: "34px 40px 48px" }}>
            <div>
                <p
                    className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "var(--clima-accent)" }}
                >
                    Métricas
                </p>
                <h1
                    className="mt-1 font-serif font-normal"
                    style={{ fontSize: "clamp(36px, 4vw, 50px)", color: "var(--clima-text)" }}
                >
                    Relatórios
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <div
                        key={metric.label}
                        className="rounded-[8px] p-[22px_24px]"
                        style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
                    >
                        <p
                            className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em]"
                            style={{ color: "var(--clima-text-muted)" }}
                        >
                            {metric.label}
                        </p>
                        <p
                            className="font-serif font-normal"
                            style={{
                                fontSize: "38px",
                                color: metric.highlight ? "var(--clima-accent)" : "var(--clima-text)",
                            }}
                        >
                            {metric.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                <p
                    className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "var(--clima-accent)" }}
                >
                    Serviços mais populares
                </p>

                {reports.popularServices.length === 0 ? (
                    <p
                        className="py-10 text-center text-sm"
                        style={{ color: "var(--clima-text-subtle)" }}
                    >
                        Nenhum dado disponível ainda.
                    </p>
                ) : (
                    <div
                        className="flex flex-col overflow-hidden rounded-[10px]"
                        style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
                    >
                        {reports.popularServices.map((service, i) => (
                            <div
                                key={service.name}
                                className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                                style={{ borderTop: i === 0 ? "none" : "1px solid var(--clima-border)" }}
                            >
                                <div className="flex min-w-0 items-center gap-4">
                                    <p className="truncate font-serif" style={{ fontSize: "17px", color: "var(--clima-text)" }}>
                                        {service.name}
                                    </p>
                                    <p className="whitespace-nowrap text-[13px]" style={{ color: "var(--clima-text-muted)" }}>
                                        {service.count} agendamento{service.count !== 1 ? "s" : ""}
                                    </p>
                                </div>
                                <p
                                    className="whitespace-nowrap font-serif"
                                    style={{ fontSize: "16px", color: "var(--clima-accent)" }}
                                >
                                    R$ {formatBRL(service.revenue)}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}