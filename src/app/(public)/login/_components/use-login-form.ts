"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { register } from "../_actions/register";
import { loginSchema, registerSchema } from "@/lib/validations/login";
import { extractFieldErrors } from "@/lib/validations/utils";

type FieldErrors = Partial<Record<string, string>>;

export function useLoginForm() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const isRegister = mode === "register";
    const schema = isRegister ? registerSchema : loginSchema;

    function validateField(field: string, value: string) {
        const fieldSchema = (schema.shape as Record<string, z.ZodTypeAny>)[field];
        if (!fieldSchema) return;
        const result = fieldSchema.safeParse(value);
        setFieldErrors((prev) => ({
            ...prev,
            [field]: result.success ? undefined : result.error.issues[0]?.message,
        }));
    }

    function switchMode() {
        setMode(isRegister ? "login" : "register");
        setFieldErrors({});
        setServerError("");
    }

    function fillDemo() {
        if (emailRef.current) emailRef.current.value = "admin@hotmail.com";
        if (passwordRef.current) passwordRef.current.value = "123456789";
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setServerError("");

        const formData = new FormData(e.currentTarget);
        const raw: Record<string, string> = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
        if (isRegister) raw.name = formData.get("name") as string;

        const validation = schema.safeParse(raw);
        if (!validation.success) {
            setFieldErrors(extractFieldErrors(validation.error));
            return;
        }

        setFieldErrors({});
        setLoading(true);

        if (isRegister) {
            const result = await register(formData);
            if (result?.error) {
                setServerError(result.error);
                setLoading(false);
                return;
            }
        }

        const res = await signIn("credentials", {
            email: raw.email,
            password: raw.password,
            redirect: false,
        });

        if (res?.error) {
            setServerError("E-mail ou senha inválidos.");
            setLoading(false);
            return;
        }

        router.push("/dashboard");
    }

    async function handleGoogle() {
        await signIn("google", { callbackUrl: "/dashboard" });
    }

    return {
        isRegister,
        fieldErrors,
        serverError,
        loading,
        showPassword,
        emailRef,
        passwordRef,
        validateField,
        switchMode,
        fillDemo,
        handleSubmit,
        handleGoogle,
        setShowPassword,
    };
}
