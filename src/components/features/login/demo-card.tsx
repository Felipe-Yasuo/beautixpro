type DemoCardProps = {
    onFill: () => void;
};

export function DemoCard({ onFill }: DemoCardProps) {
    return (
        <div
            className="mt-6 px-5 py-4"
            style={{
                backgroundColor: "var(--surface)",
                border: "1px dashed #d9c3ae",
                borderRadius: "4px",
            }}
        >
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold">
                Conta de demonstração
            </p>
            <div className="mb-4 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-dim">
                        E-mail
                    </span>
                    <span className="font-mono text-xs text-on-surface">
                        admin@hotmail.com
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-dim">
                        Senha
                    </span>
                    <span className="font-mono text-xs text-on-surface">
                        123456789
                    </span>
                </div>
            </div>
            <button
                type="button"
                onClick={onFill}
                className="w-full cursor-pointer border border-gold/30 py-2.5 text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold-ghost"
            >
                Preencher automaticamente
            </button>
        </div>
    );
}