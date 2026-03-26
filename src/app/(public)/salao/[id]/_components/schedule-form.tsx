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
            <p className="text-muted-foreground text-sm text-center py-10">
                Este salão ainda não possui serviços disponíveis.
            </p>
        );
    }

    if (success) {
        return <SuccessStep />;
    }

    return (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 flex flex-col gap-5">
            {isMultiEmployee && (
                <EmployeeStep
                    employees={user.employees}
                    onEmployeeChange={handleEmployeeChange}
                />
            )}

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

            {selectedEmployee && (
                <ServiceStep
                    services={selectedEmployee.services}
                    onServiceChange={handleServiceChange}
                />
            )}

            {selectedService && (
                <DateStep
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                />
            )}

            {selectedEmployee && selectedService && selectedDate && (
                <TimeStep
                    times={selectedEmployee.times}
                    selectedTime={selectedTime}
                    onSelect={setSelectedTime}
                    bookedTimes={bookedTimes}
                    selectedDate={selectedDate}
                />
            )}

            {serverError && <p className="text-destructive text-xs">{serverError}</p>}

            <button
                type="submit"
                disabled={!isComplete || loading}
                className="w-full bg-primary text-primary-foreground py-3 text-sm font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {loading ? "Aguarde..." : "Realizar agendamento"}
            </button>
        </form>
    );
}
