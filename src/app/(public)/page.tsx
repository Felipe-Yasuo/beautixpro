import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Professionals } from "./_components/professionals";
import { Footer } from "./_components/footer";

export default async function Home() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-background">
            <div className="flex flex-col flex-1 min-h-0 max-w-screen-2xl mx-auto w-full">
                <Header />
                <Hero />
                <Professionals />
                <Footer />
            </div>
        </div>
    );
}
