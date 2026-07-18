import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(1, "Senha obrigatória"),
});

export const registerSchema = loginSchema.extend({
    name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
});
