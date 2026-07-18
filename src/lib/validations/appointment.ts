import { z } from "zod";

export const appointmentSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    email: z.string().email("E-mail inválido."),
    phone: z
        .string()
        .regex(/^\d+$/, "Telefone deve conter apenas números.")
        .min(8, "Telefone deve ter pelo menos 8 números.")
        .max(15, "Telefone deve ter no máximo 15 números."),
    serviceId: z.string().min(1, "Serviço inválido."),
    employeeId: z.string().min(1, "Funcionário inválido."),
    appointmentDate: z.string().min(1, "Data inválida."),
    time: z.string().min(1, "Horário inválido."),
    userId: z.string().min(1, "Salão inválido."),
});
