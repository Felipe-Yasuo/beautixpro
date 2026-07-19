import { getDailyRevenue } from "@/lib/services/get-daily-revenue";
import { getAppointments, resolveEmployeeTimes } from "@/lib/services/get-appointments";
import { getInfoUser } from "@/lib/services/get-info-user";
import { getUserPlan } from "@/lib/services/get-plan";
import { formatBRL } from "@/lib/formatters";

function calcPercentChange(today: number, yesterday: number): number | null {
    if (yesterday === 0) return null;
    return Math.round(((today - yesterday) / yesterday) * 100);
}

export async function ProductivityCard() {
    const [{ today, yesterday }, todayAppointments, user, plan] = await Promise.all([
        getDailyRevenue(),
        getAppointments(new Date()),
        getInfoUser(),
        getUserPlan(),
    ]);

    const percentChange = calcPercentChange(today, yesterday);
    const isProfessional = plan === "PROFESSIONAL";
    const employees = user?.employees ?? [];
    const totalSlots = resolveEmployeeTimes(isProfessional, employees, undefined, user?.times).length;
    const bookedCount = todayAppointments.length;
    const freeSlots = Math.max(totalSlots - bookedCount, 0);

    return (
        <div
            className="rounded-[8px] p-6"
            style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
        >
            <p
                className="uppercase"
                style={{ fontSize: "10.5px", letterSpacing: "0.12em", color: "var(--clima-text-subtle)" }}
            >
                Produtividade do dia
            </p>

            <div className="mt-2 flex items-end gap-3">
                <p className="font-serif font-normal" style={{ fontSize: "56px", lineHeight: 1, color: "var(--clima-text)" }}>
                    R$ {formatBRL(today)}
                </p>
                {percentChange !== null && (
                    <span
                        className="mb-1.5 text-[13px] font-medium"
                        style={{ color: percentChange >= 0 ? "var(--clima-success)" : "#b3413a" }}
                    >
                        {percentChange >= 0 ? "+" : ""}
                        {percentChange}% hoje
                    </span>
                )}
            </div>

            <div
                className="mt-4 flex items-center justify-between pt-4 text-[13px]"
                style={{ borderTop: "1px solid var(--clima-border)", color: "var(--clima-text-muted)" }}
            >
                <span>{bookedCount} agendamentos</span>
                <span>{freeSlots} horários livres</span>
            </div>
        </div>
    );
}