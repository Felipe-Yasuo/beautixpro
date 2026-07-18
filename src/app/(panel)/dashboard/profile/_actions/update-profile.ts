"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { profileSchema } from "@/lib/validations/profile";

export async function updateProfile(formData: FormData) {
    try {
        const userId = await requireAuth();

        const parsed = profileSchema.safeParse({
            name: formData.get("name"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            addressNumber: formData.get("addressNumber"),
            status: formData.get("status"),
            timeZone: formData.get("timeZone"),
        });

        if (!parsed.success) return { error: parsed.error.issues[0].message };

        await prisma.user.update({
            where: { id: userId },
            data: {
                name: parsed.data.name,
                phone: parsed.data.phone,
                address: parsed.data.address,
                addressNumber: parsed.data.addressNumber,
                status: parsed.data.status,
                timeZone: parsed.data.timeZone,
            },
        });

        revalidatePath("/dashboard/profile");
        return { success: true };
    } catch {
        return { error: "Algo deu errado. Tente novamente." };
    }
}