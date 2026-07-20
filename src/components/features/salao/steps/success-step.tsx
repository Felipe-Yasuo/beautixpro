interface SuccessStepProps {
    onReset: () => void;
}

export function SuccessStep({ onReset }: SuccessStepProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div
                className="mb-6 flex items-center justify-center rounded-full"
                style={{ width: "66px", height: "66px", backgroundColor: "var(--clima-accent)" }}
            >
                <span className="text-3xl text-white">✓</span>
            </div>

            <h2 className="font-serif font-normal" style={{ fontSize: "34px", color: "var(--clima-text)" }}>
                Reserva enviada!
            </h2>
            <p className="mt-3 max-w-sm text-sm" style={{ color: "var(--clima-text-muted)" }}>
                O salão receberá sua reserva e enviará a confirmação em instantes.
            </p>

            <button
                type="button"
                onClick={onReset}
                className="mt-8 rounded-[6px] px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-colors"
                style={{ border: "1px solid var(--clima-border-strong)", color: "var(--clima-text-muted)" }}
            >
                Nova reserva
            </button>
        </div>
    );
}