import { z } from "zod";

export const idSchema = z.string().min(1, "ID inválido.");

export function extractFieldErrors<T extends Record<string, unknown>>(
    error: z.ZodError<T>
): Partial<Record<keyof T, string>> {
    const errors: Partial<Record<keyof T, string>> = {};
    for (const issue of error.issues) {
        const field = issue.path[0] as keyof T;
        errors[field] ??= issue.message;
    }
    return errors;
}
