type DemoCardProps = {
    onFill: () => void;
};

export function DemoCard({ onFill }: DemoCardProps) {
    return (
        <div className="mt-8 border border-[#c9a84c22] px-5 py-4">
            <p className="text-[#c9a84c] text-[10px] tracking-[0.25em] uppercase mb-3">
                Conta de demonstração
            </p>
            <div className="flex flex-col gap-1.5 mb-4">
                <div className="flex justify-between items-center">
                    <span className="text-[#5a5045] text-[10px] tracking-[0.15em] uppercase">E-mail</span>
                    <span className="text-[#f0ead6] text-xs font-mono">admin@hotmail.com</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#5a5045] text-[10px] tracking-[0.15em] uppercase">Senha</span>
                    <span className="text-[#f0ead6] text-xs font-mono">123456789</span>
                </div>
            </div>
            <button
                type="button"
                onClick={onFill}
                className="w-full border border-[#c9a84c33] text-[#c9a84c] py-2.5 text-[10px] tracking-[0.2em] uppercase hover:bg-[#c9a84c11] transition-colors cursor-pointer"
            >
                Preencher automaticamente
            </button>
        </div>
    );
}
