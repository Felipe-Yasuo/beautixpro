"use client";

import { useScheduleForm } from "../_hooks/useScheduleForm";
import { useAvailableSlots } from "../_hooks/useAvailableSlots";
import type { Employee } from "../_hooks/useScheduleForm";
import { EmployeeStep } from "./steps/employee-step";
import { CustomerStep } from "./steps/customer-step";
import { ServiceStep } from "./steps/service-step";
import { DateStep } from "./steps/date-step";
import { TimeStep } from "./steps/time-step";
import { SuccessStep } from "./steps/success-step";

interface ScheduleFormProps {
    user: {
        id: string;
        employees: Employee[];
    };
}

export function ScheduleForm({ user }: ScheduleFormProps) {
    const {
        isMultiEmployee,
        selectedEmployee,
        selectedService,
        selectedDate,
        selectedTime,
        name,
        email,
        phone,
        fieldErrors,
        serverError,
        loading,
        success,
        isComplete,
        setName,
        setEmail,
        setPhone,
        setSelectedTime,
        validateField,
        handleEmployeeChange,
        handleServiceChange,
        handleDateChange,
        handleSubmit,
    } = useScheduleForm({ user });

    const { bookedTimes } = useAvailableSlots({
        employeeId: selectedEmployee?.id ?? null,
        selectedDate,
        serviceDuration: selectedService?.duration ?? 0,
    });

    if (user.employees.length === 0) {
        return (
            <div className="border border-outline-variant px-8 py-20 text-center">
                <p className="label-overline mb-4">Indisponível</p>
                <h3 className="font-serif text-3xl italic text-on-surface">
                    Este ateliê está preparando
                    <br />
                    suas próximas experiências.
                </h3>
                <p className="mt-6 text-sm text-on-surface-variant">
                    Volte em breve para conhecer o catálogo.
                </p>
            </div>
        );
    }

    if (success) {
        return <SuccessStep />;
    }

    let stepNumber = 0;
    const nextRomanNumeral = () => {
        stepNumber += 1;
        return ROMAN[stepNumber - 1] ?? String(stepNumber);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            {isMultiEmployee && (
                <Step roman={nextRomanNumeral()} title="Profissional">
                    <EmployeeStep
                        employees={user.employees}
                        onEmployeeChange={handleEmployeeChange}
                    />
                </Step>
            )}

            <Step roman={nextRomanNumeral()} title="Suas informações">
                <CustomerStep
                    name={name}
                    email={email}
                    phone={phone}
                    fieldErrors={fieldErrors}
                    onNameChange={setName}
                    onEmailChange={setEmail}
                    onPhoneChange={setPhone}
                    onValidateField={validateField}
                />
            </Step>

            {selectedEmployee && (
                <Step roman={nextRomanNumeral()} title="Serviço">
                    <ServiceStep
                        services={selectedEmployee.services}
                        onServiceChange={handleServiceChange}
                    />
                </Step>
            )}

            {selectedService && (
                <Step roman={nextRomanNumeral()} title="Data">
                    <DateStep
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                    />
                </Step>
            )}

            {selectedEmployee && selectedService && selectedDate && (
                <Step roman={nextRomanNumeral()} title="Horário">
                    <TimeStep
                        times={selectedEmployee.times}
                        selectedTime={selectedTime}
                        onSelect={setSelectedTime}
                        bookedTimes={bookedTimes}
                        selectedDate={selectedDate}
                    />
                </Step>
            )}

            <div className="mt-12 border-t border-outline-variant pt-8">
                {serverError && (
                    <p className="mb-4 font-serif text-sm italic text-destructive">
                        {serverError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={!isComplete || loading}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {loading ? "Confirmando reserva..." : "Reservar minha hora"}
                </button>

                <p className="mt-4 text-center font-serif text-xs italic text-on-surface-variant">
                    Você receberá uma confirmação após a aprovação do ateliê.
                </p>
            </div>
        </form>
    );
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

function Step({
    roman,
    title,
    children,
}: {
    roman: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="border-t border-outline-variant py-10 first:border-t-0 first:pt-0">
            <header className="mb-6 flex items-baseline gap-4">
                <span className="font-serif text-2xl italic text-gold/70">{roman}</span>
                <h3 className="font-serif text-xl text-on-surface">{title}</h3>
            </header>
            <div className="flex flex-col gap-6">{children}</div>
        </section>
    );
}
