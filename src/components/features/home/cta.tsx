import Link from "next/link";

export function FinalCta() {
    return (
        <section className="bg-surface-lowest">
            <div
                className="mx-auto max-w-[1280px] px-6 text-center lg:px-12"
                style={{ paddingBottom: "clamp(72px, 9vw, 110px)" }}
            >
                <h2
                    className="font-serif font-normal text-on-surface"
                    style={{ fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05 }}
                >
                    O próximo horário livre
                    <br />
                    pode ser o <span className="italic text-gold">seu</span>.
                </h2>

                <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
                    <Link href="#atelies" className="cta-btn-solid">
                        Encontre seu salão
                    </Link>
                    <Link href="/login" className="cta-btn-outline">
                        Tenho um salão
                    </Link>
                </div>
            </div>
        </section>
    );
}