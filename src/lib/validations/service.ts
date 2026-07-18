import { z } from "zod";
import { idSchema } from "@/lib/validations/utils";

export const serviceSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    price: z.coerce.number().min(1, "Preço inválido."),
    duration: z.coerce.number().min(1, "Duração inválida."),
    employeeId: z.string().optional(),
});

export const updateServiceSchema = z.object({
    id: idSchema,
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    price: z.coerce.number().min(1, "Preço inválido."),
    duration: z.coerce.number().min(1, "Duração inválida."),
    status: z.coerce.boolean(),
});
