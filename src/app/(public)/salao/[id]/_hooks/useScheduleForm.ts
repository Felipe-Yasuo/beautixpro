import { useState } from "react";
import { z } from "zod";
import { createAppointment } from "../_actions/create-appointment";

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

interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
}

interface Employee {
    id: string;
    name: string;
    times: string[];
    services: Service[];
}

interface UseScheduleFormProps {
    user: {
        id: string;
        employees: Employee[];
    };
}

function extractFieldErrors(error: z.ZodError<ScheduleFields>): FieldErrors {
    const errors: FieldErrors = {};
    for (const issue of error.issues) {
        const field = issue.path[0] as keyof ScheduleFields;
        errors[field] ??= issue.message;
    }
    return errors;
}

export function useScheduleForm({ user }: UseScheduleFormProps) {
    const isMultiEmployee = user.employees.length > 1;

    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        isMultiEmployee ? null : user.employees[0] ?? null
    );
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const isComplete =
        name && email && phone && selectedEmployee && selectedService && selectedDate && selectedTime;

    function validateField(field: keyof ScheduleFields, value: string) {
        const result = scheduleSchema.shape[field].safeParse(value);
        setFieldErrors((prev) => ({
            ...prev,
            [field]: result.success ? undefined : result.error.issues[0]?.message,
        }));
    }

    function handleEmployeeChange(employeeId: string) {
        const employee = user.employees.find((e) => e.id === employeeId);
        setSelectedEmployee(employee ?? null);
        setSelectedService(null);
        setSelectedTime(null);
    }

    function handleServiceChange(serviceId: string) {
        if (!selectedEmployee) return;
        const service = selectedEmployee.services.find((s) => s.id === serviceId);
        setSelectedService(service ?? null);
        setSelectedTime(null);
    }

    function handleDateChange(date: Date | undefined) {
        setSelectedDate(date ?? null);
        setSelectedTime(null);
    }

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
        formData.set("phone", phone);
        formData.set("serviceId", selectedService.id);
        formData.set("employeeId", selectedEmployee.id);
        formData.set("appointmentDate", selectedDate.toISOString());
        formData.set("time", selectedTime);
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
        // state
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

        // setters
        setName,
        setEmail,
        setPhone,
        setSelectedTime,

        // handlers
        validateField,
        handleEmployeeChange,
        handleServiceChange,
        handleDateChange,
        handleSubmit,
    };
}

export type { Employee, Service, FieldErrors };
