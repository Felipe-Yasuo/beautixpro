"use server";

import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { Prisma } from "@/generated/prisma/client";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
    email: z.string().email("E-mail inválido."),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres."),
});

export async function register(formData: FormData) {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") ?? "unknown";
    const { success } = rateLimit(`register:${ip}`, 5, 60_000);
    if (!success) {
        return { error: "Muitas tentativas. Tente novamente em 1 minuto." };
    }
    const raw = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const parsed = registerSchema.safeParse(raw);

    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    const { name, email, password } = parsed.data;

    try {
        const existing = await prisma.user.findUnique({ where: { email } });

        if (existing) {
            return { error: "Este e-mail já está cadastrado." };
        }

        const hashed = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: { name, email, password: hashed },
        });
    } catch (error: unknown) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return { error: "Este e-mail já está cadastrado." };
        }
        return { error: "Algo deu errado. Tente novamente." };
    }

    return { success: true };
}