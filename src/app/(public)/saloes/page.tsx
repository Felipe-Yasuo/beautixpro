import { Header } from "@/components/features/home/header";
import { Footer } from "@/components/features/home/footer";
import { getAllSalons } from "@/lib/services/get-all-salons";
import { salonCategories } from "@/lib/salon-categories";
import { SalonsGallery } from "@/components/features/saloes/salons-gallery";

export const dynamic = "force-dynamic";

export default async function SaloesPage() {
    const salons = await getAllSalons();

    // Pré-computa serviços + categorias de cada salão no servidor
    const salonsData = salons.map((salon) => {
        const serviceNames = salon.employees.flatMap((e) => e.services.map((s) => s.name));
        const uniqueServices = Array.from(new Set(serviceNames));
        return {
            id: salon.id,
            name: salon.name ?? "Salão",
            image: salon.image ?? "/foto.webp",
            address: salon.address ?? "",
            isPremium: salon.subscription?.plan === "PROFESSIONAL",
            services: uniqueServices,
            categories: Array.from(salonCategories(serviceNames)),
        };
    });

    return (
        <div className="relative min-h-screen bg-surface-lowest text-on-surface">
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
            />

            <Header />

            <main className="relative z-10">
                <SalonsGallery salons={salonsData} />
            </main>

            <Footer />
        </div>
    );
}