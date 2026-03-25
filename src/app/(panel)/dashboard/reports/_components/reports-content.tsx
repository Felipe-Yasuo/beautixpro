import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getReports } from "../_data-access/get-reports";

function formatBRL(cents: number): string {
    return (cents / 100).toFixed(2);
}

export async function ReportsContent() {
    const session = await auth();

    const subscription = session?.user?.id
        ? await prisma.subscription.findUnique({
            where: { userId: session.user.id },
        })
        : null;

    if (!subscription || subscription.plan !== "PROFESSIONAL") {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
                <div className="border border-[#c9a84c33] p-10 flex flex-col items-center gap-4 max-w-md text-center">
                    <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                        Recurso Premium
                    </p>
                    <h2 className="text-2xl font-light text-[#f0ead6]">
                        Relatórios disponíveis no plano Professional
                    </h2>
                    <p className="text-[#5a5045] text-sm leading-relaxed">
                        Acesse métricas detalhadas, faturamento e serviços mais populares
                        do seu salão.
                    </p>
                    <a
                        href="/dashboard/plans"
                        className="bg-[#c9a84c] text-black px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#e8c97a] transition-colors mt-2"
                    >
                        Ver planos
                    </a>
                </div>
            </div>
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
        <div className="flex flex-col gap-10">
            <div>
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Métricas
                </p>
                <h1 className="text-3xl font-light text-[#f0ead6] mt-1">Relatórios</h1>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => (
                    <div key={metric.label} className="border border-[#c9a84c22] p-6">
                        <p className="text-[#3a3028] text-xs tracking-widest uppercase mb-2">
                            {metric.label}
                        </p>
                        <p className={`text-4xl font-light ${metric.highlight ? "text-[#c9a84c]" : "text-[#f0ead6]"}`}>
                            {metric.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Serviços mais populares
                </p>

                {reports.popularServices.length === 0 ? (
                    <p className="text-[#3a3028] text-xs tracking-widest uppercase text-center py-10">
                        Nenhum dado disponível ainda.
                    </p>
                ) : (
                    <div className="flex flex-col gap-2">
                        {reports.popularServices.map((service) => (
                            <div
                                key={service.name}
                                className="flex items-center justify-between border border-[#c9a84c22] px-6 py-4"
                            >
                                <div className="flex items-center gap-6">
                                    <p className="text-[#f0ead6] text-sm">{service.name}</p>
                                    <p className="text-[#3a3028] text-xs">
                                        {service.count} agendamento{service.count !== 1 ? "s" : ""}
                                    </p>
                                </div>
                                <p className="text-[#c9a84c] text-sm">
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