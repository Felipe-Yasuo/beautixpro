import { Header } from "@/components/features/home/header";
import { Hero } from "@/components/features/home/hero";
import { HowItWorks } from "@/components/features/home/how-it-works";
import { Professionals } from "@/components/features/home/professionals";
import { Footer } from "@/components/features/home/footer";
import { ForProfessionals } from "@/components/features/home/for-professionals";
import { Plans } from "@/components/features/home/plans";
import { Testimonials } from "@/components/features/home/testimonial";
import { Faq } from "@/components/features/home/faq";
import { FinalCta } from "@/components/features/home/cta";

export const dynamic = "force-dynamic";

export default async function Home() {
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

            <main className="relative z-10 pt-16 lg:pt-20">
                <Hero />
                <Professionals />
                <HowItWorks />
                <ForProfessionals />
                <Plans />
                <Testimonials />
                <Faq />
                <FinalCta />
            </main>

            <Footer />
        </div>
    );
}
