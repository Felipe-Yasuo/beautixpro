import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t border-[#c9a84c22] px-12 py-8 flex items-center justify-between">
            <Image
                src="/logo.png"
                alt="BeautixPro"
                width={120}
                height={40}
                className="object-contain"
            />
            <p className="text-[#3a3028] text-xs tracking-widest">
                © 2025 BeautixPro · Todos os direitos reservados
            </p>
        </footer>
    );
}