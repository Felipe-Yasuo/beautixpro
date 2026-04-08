import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Professionals } from "./_components/professionals";
import { Footer } from "./_components/footer";

export default async function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-background pt-15">
            <Header />
            <Hero />
            <div className="max-w-screen-2xl mx-auto w-full">
                <Professionals />
                <Footer />
            </div>
        </div>
    );
}
