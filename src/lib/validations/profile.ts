import { z } from "zod";

export const profileSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    address: z.string().min(2, "Endereço inválido."),
    addressNumber: z.string().min(1, "Número é obrigatório."),
    phone: z
        .string()
        .transform((v) => v.replace(/\D/g, ""))
        .pipe(
            z
                .string()
                .min(8, "Telefone deve ter pelo menos 8 números.")
                .max(15, "Telefone deve ter no máximo 15 números.")
        ),
    status: z.coerce.boolean(),
    timeZone: z.string().min(1, "Fuso horário inválido."),
});
