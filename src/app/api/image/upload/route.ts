import { z } from "zod";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const fileSchema = z.object({
    size: z.number().max(MAX_FILE_SIZE, "Arquivo muito grande. Máximo 5MB."),
    type: z.enum(ALLOWED_TYPES, { message: "Formato inválido. Use JPEG, PNG ou WebP." }),
});

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
    }

    const validation = fileSchema.safeParse({ size: file.size, type: file.type });
    if (!validation.success) {
        return NextResponse.json(
            { error: validation.error.issues[0].message },
            { status: 400 }
        );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
        const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: "beautixpro/avatars",
                        transformation: [{ width: 400, height: 400, crop: "fill" }],
                    },
                    (error, uploadResult) => {
                        if (error) reject(error);
                        else resolve(uploadResult as { secure_url: string });
                    }
                )
                .end(buffer);
        });

        return NextResponse.json({ url: result.secure_url });
    } catch {
        return NextResponse.json(
            { error: "Erro ao enviar imagem. Tente novamente." },
            { status: 500 }
        );
    }
}