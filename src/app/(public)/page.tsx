import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Professionals } from "./_components/professionals";
import { Footer } from "./_components/footer";

export default async function Home() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            <Header />
            <Hero />
            <Professionals />
            <Footer />
        </div>
    );
}