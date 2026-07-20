import { useMemo, useState } from "react";
import { z } from "zod";
import { createAppointment } from "@/lib/actions/create-appointment";
import { extractFieldErrors } from "@/lib/validations/utils";
import type { Employee as DomainEmployee, Service as DomainService } from "@/types/domain";

const scheduleSchema = z.object({
    name: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    phone: z
        .string()
        .min(10, "Telefone inválido")
        .regex(/^[\d\s()\-+]+$/, "Telefone inválido"),
});

type ScheduleFields = z.infer<typeof scheduleSchema>;
type FieldErrors = Partial<Record<keyof ScheduleFields, string>>;

type Service = Pick<DomainService, "id" | "name" | "price" | "duration">;

type Employee = Pick<DomainEmployee, "id" | "name" | "times"> & {
    services: Service[];
};

type AggregatedService = {
    key: string;
    name: string;
    price: number;
    duration: number;
};

interface UseScheduleFormProps {
    user: {
        id: string;
        employees: Employee[];
    };
}

export const STEPS = ["service", "date", "professional", "time", "customer"] as const;
export type StepKey = (typeof STEPS)[number];

function serviceKey(s: Service): string {
    return `${s.name}::${s.price}::${s.duration}`;
}

export function useScheduleForm({ user }: UseScheduleFormProps) {
    const [step, setStep] = useState(0);
    const [success, setSuccess] = useState(false);

    const [selectedServiceKey, setSelectedServiceKey] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const aggregatedServices = useMemo<AggregatedService[]>(() => {
        const map = new Map<string, AggregatedService>();
        for (const emp of user.employees) {
            for (const svc of emp.services) {
                const key = serviceKey(svc);
                if (!map.has(key)) {
                    map.set(key, { key, name: svc.name, price: svc.price, duration: svc.duration });
                }
            }
        }
        return Array.from(map.values());
    }, [user.employees]);

    const selectedService = useMemo(
        () => aggregatedServices.find((s) => s.key === selectedServiceKey) ?? null,
        [aggregatedServices, selectedServiceKey]
    );

    const availableEmployees = useMemo(() => {
        if (!selectedServiceKey) return [];
        return user.employees.filter((emp) =>
            emp.services.some((svc) => serviceKey(svc) === selectedServiceKey)
        );
    }, [user.employees, selectedServiceKey]);

    const resolvedService = useMemo(() => {
        if (!selectedEmployee || !selectedServiceKey) return null;
        return selectedEmployee.services.find((svc) => serviceKey(svc) === selectedServiceKey) ?? null;
    }, [selectedEmployee, selectedServiceKey]);

    const currentStep = STEPS[step];

    const canNext = useMemo(() => {
        switch (currentStep) {
            case "service":
                return !!selectedServiceKey;
            case "date":
                return !!selectedDate;
            case "professional":
                return !!selectedEmployee;
            case "time":
                return !!selectedTime;
            case "customer":
                return (
                    name.trim().length >= 3 &&
                    /\S+@\S+\.\S+/.test(email) &&
                    phone.replace(/\D/g, "").length >= 10
                );
            default:
                return false;
        }
    }, [currentStep, selectedServiceKey, selectedDate, selectedEmployee, selectedTime, name, email, phone]);

    function validateField(field: keyof ScheduleFields, value: string) {
        const result = scheduleSchema.shape[field].safeParse(value);
        setFieldErrors((prev) => ({
            ...prev,
            [field]: result.success ? undefined : result.error.issues[0]?.message,
        }));
    }

    function handleServiceChange(key: string) {
        setSelectedServiceKey(key);
        setSelectedEmployee(null);
        setSelectedTime(null);
    }

    function handleDateChange(date: Date | undefined) {
        setSelectedDate(date ?? null);
        setSelectedTime(null);
    }

    function handleEmployeeChange(employeeId: string) {
        const employee = availableEmployees.find((e) => e.id === employeeId);
        setSelectedEmployee(employee ?? null);
        setSelectedTime(null);
    }

    function next() {
        if (!canNext) return;
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }

    function back() {
        setStep((s) => Math.max(s - 1, 0));
    }

    function reset() {
        setStep(0);
        setSuccess(false);
        setSelectedServiceKey(null);
        setSelectedDate(null);
        setSelectedEmployee(null);
        setSelectedTime(null);
        setName("");
        setEmail("");
        setPhone("");
        setFieldErrors({});
        setServerError("");
    }

    const isComplete =
        !!name && !!email && !!phone && !!selectedEmployee && !!resolvedService && !!selectedDate && !!selectedTime;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isComplete) return;

        const validation = scheduleSchema.safeParse({ name, email, phone });
        if (!validation.success) {
            setFieldErrors(extractFieldErrors(validation.error));
            return;
        }

        setFieldErrors({});
        setServerError("");
        setLoading(true);

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("phone", phone.replace(/\D/g, ""));
        formData.set("serviceId", resolvedService!.id);
        formData.set("employeeId", selectedEmployee!.id);
        formData.set("appointmentDate", selectedDate!.toISOString());
        formData.set("time", selectedTime!);
        formData.set("userId", user.id);

        const result = await createAppointment(formData);

        if (result?.error) {
            setServerError(result.error);
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
    }

    return {
        step,
        currentStep,
        canNext,
        next,
        back,
        reset,
        totalSteps: STEPS.length,
        aggregatedServices,
        availableEmployees,
        selectedServiceKey,
        selectedService,
        selectedEmployee,
        resolvedService,
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
        setSelectedTime,
        setName,
        setEmail,
        setPhone,
        validateField,
        handleServiceChange,
        handleDateChange,
        handleEmployeeChange,
        handleSubmit,
    };
}

export type { Employee, Service, AggregatedService, FieldErrors };