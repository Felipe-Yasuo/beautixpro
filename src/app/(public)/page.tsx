import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Professionals } from "./_components/professionals";
import { Footer } from "./_components/footer";

export default async function Home() {
    return (
        <div className="bg-background min-h-screen">
            <div className="max-w-screen-2xl mx-auto">
                <Header />
                <Hero />
                <Professionals />
                <Footer />
            </div>
        </div>
    );
}