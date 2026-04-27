import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { Professionals } from "./_components/professionals";
import { Manifesto } from "./_components/manifesto";
import { Footer } from "./_components/footer";

export const dynamic = "force-dynamic";

export default async function Home() {
    return (
        <div className="relative min-h-screen bg-surface-lowest text-on-surface">
            {/* Noise overlay para atmosfera */}
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
                <HowItWorks />
                <Professionals />
                <Manifesto />
            </main>

            <Footer />
        </div>
    );
}
