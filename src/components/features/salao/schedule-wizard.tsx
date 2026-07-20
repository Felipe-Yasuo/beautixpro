"use client";

import { STEPS } from "@/hooks/use-schedule-form";
import type { useScheduleForm, Employee } from "@/hooks/use-schedule-form";
import { ServiceStep } from "./steps/service-step";
import { DateStep } from "./steps/date-step";
import { EmployeeStep } from "./steps/employee-step";
import { TimeStep } from "./steps/time-step";
import { CustomerStep } from "./steps/customer-step";
import { SuccessStep } from "./steps/success-step";

type ScheduleFormState = ReturnType<typeof useScheduleForm>;

interface ScheduleWizardProps {
    form: ScheduleFormState;
    bookedTimes: string[];
    user: { id: string; employees: Employee[] };
}

const STEP_LABELS: Record<string, string> = {
    service: "Serviço",
    date: "Data",
    professional: "Profissional",
    time: "Horário",
    customer: "Seus dados",
};

const STEP_TITLES: Record<string, { title: string; subtitle: string }> = {
    service: { title: "Escolha o serviço", subtitle: "Selecione o que você deseja fazer hoje." },
    date: { title: "Escolha a data", subtitle: "Próximos dias disponíveis." },
    professional: { title: "Quem irá atendê-lo", subtitle: "Escolha o profissional do seu atendimento." },
    time: { title: "Escolha o horário", subtitle: "Horários livres para a data escolhida." },
    customer: { title: "Suas informações", subtitle: "Para enviarmos a confirmação da reserva." },
};

export function ScheduleWizard({ form, bookedTimes, user }: ScheduleWizardProps) {
    if (user.employees.length === 0) {
        return (
            <div
                className="rounded-[16px] px-8 py-20 text-center"
                style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
            >
                <h3 className="font-serif" style={{ fontSize: "28px", color: "var(--clima-text)" }}>
                    Este salão está preparando seus próximos serviços.
                </h3>
                <p className="mt-6 text-sm" style={{ color: "var(--clima-text-muted)" }}>
                    Volte em breve para conhecer o catálogo.
                </p>
            </div>
        );
    }

    if (form.success) {
        return (
            <div
                className="rounded-[16px] p-8"
                style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
            >
                <SuccessStep onReset={form.reset} />
            </div>
        );
    }

    const meta = STEP_TITLES[form.currentStep];
    const isLastStep = form.currentStep === "customer";

    return (
        <form
            onSubmit={form.handleSubmit}
            className="rounded-[16px] p-6 sm:p-8"
            style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
        >
            {/* Barra de progresso */}
            <div className="mb-8 flex items-center">
                {STEPS.map((s, i) => {
                    const isDone = i < form.step;
                    const isActive = i === form.step;
                    const filled = isDone || isActive;
                    return (
                        <div key={s} className="flex flex-1 items-center last:flex-none">
                            <div className="flex items-center gap-2">
                                <span
                                    className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
                                    style={{
                                        backgroundColor: filled ? "var(--clima-accent)" : "var(--clima-surface-2)",
                                        color: filled ? "#fff" : "var(--clima-text-subtle)",
                                    }}
                                >
                                    {i + 1}
                                </span>
                                <span
                                    className="hidden whitespace-nowrap text-[12px] sm:inline"
                                    style={{
                                        color: isActive ? "var(--clima-text)" : "var(--clima-text-subtle)",
                                        fontWeight: isActive ? 600 : 400,
                                    }}
                                >
                                    {STEP_LABELS[s]}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <span
                                    className="mx-2 h-px flex-1"
                                    style={{ backgroundColor: isDone ? "var(--clima-accent)" : "var(--clima-border)" }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Cabeçalho do passo */}
            <div className="mb-6">
                <h3 className="font-serif" style={{ fontSize: "27px", color: "var(--clima-text)" }}>
                    {meta.title}
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--clima-text-muted)" }}>
                    {meta.subtitle}
                </p>
            </div>

            {/* Conteúdo do passo */}
            <div>
                {form.currentStep === "service" && (
                    <ServiceStep
                        services={form.aggregatedServices}
                        selectedKey={form.selectedServiceKey}
                        onSelect={form.handleServiceChange}
                    />
                )}
                {form.currentStep === "date" && (
                    <DateStep selectedDate={form.selectedDate} onDateChange={form.handleDateChange} />
                )}
                {form.currentStep === "professional" && (
                    <EmployeeStep
                        employees={form.availableEmployees}
                        selectedId={form.selectedEmployee?.id ?? null}
                        onSelect={form.handleEmployeeChange}
                    />
                )}
                {form.currentStep === "time" && (
                    <TimeStep
                        times={form.selectedEmployee?.times ?? []}
                        selectedTime={form.selectedTime}
                        onSelect={form.setSelectedTime}
                        bookedTimes={bookedTimes}
                        selectedDate={form.selectedDate}
                    />
                )}
                {form.currentStep === "customer" && (
                    <CustomerStep
                        name={form.name}
                        email={form.email}
                        phone={form.phone}
                        fieldErrors={form.fieldErrors}
                        onNameChange={form.setName}
                        onEmailChange={form.setEmail}
                        onPhoneChange={form.setPhone}
                        onValidateField={form.validateField}
                    />
                )}
            </div>

            {form.serverError && (
                <p className="mt-4 text-sm text-red-500">{form.serverError}</p>
            )}

            {/* Navegação */}
            <div
                className="mt-8 flex items-center justify-between"
                style={{ borderTop: "1px solid var(--clima-border)", paddingTop: "24px" }}
            >
                <button
                    type="button"
                    onClick={form.back}
                    disabled={form.step === 0}
                    className="rounded-[6px] px-5 py-3 text-xs font-semibold uppercase tracking-widest transition-colors disabled:opacity-30"
                    style={{ border: "1px solid var(--clima-border-strong)", color: "var(--clima-text-muted)" }}
                >
                    ← Voltar
                </button>

                {isLastStep ? (
                    <button
                        type="submit"
                        disabled={!form.canNext || form.loading}
                        className="rounded-[6px] px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-colors disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: form.canNext ? "var(--clima-accent)" : "var(--clima-surface-2)",
                            color: form.canNext ? "#fff" : "var(--clima-text-subtle)",
                        }}
                    >
                        {form.loading ? "Enviando..." : "Confirmar reserva"}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={form.next}
                        disabled={!form.canNext}
                        className="rounded-[6px] px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-colors disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: form.canNext ? "var(--clima-accent)" : "var(--clima-surface-2)",
                            color: form.canNext ? "#fff" : "var(--clima-text-subtle)",
                        }}
                    >
                        Continuar →
                    </button>
                )}
            </div>
        </form>
    );
}