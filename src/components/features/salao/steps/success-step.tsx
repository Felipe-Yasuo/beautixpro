export function SuccessStep() {
    return (
        <div className="relative flex flex-col items-center justify-center py-20 text-center">
            {/* Selo com numeral romano */}
            <div className="relative mb-10 flex h-24 w-24 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-gold/40" />
                <span
                    className="absolute -inset-1 rounded-full border border-gold/15"
                    style={{ transform: "rotate(8deg)" }}
                />
                <span className="font-serif text-3xl italic text-gold">✓</span>
            </div>

            <p className="label-overline text-gold">Confirmado</p>
            <h2 className="mt-4 max-w-md font-serif text-4xl italic leading-tight text-on-surface">
                Sua hora está
                <br />
                <span className="text-gradient-gold not-italic font-bold">reservada</span>.
            </h2>
            <p className="mt-6 max-w-sm font-serif text-base italic text-on-surface-variant">
                O salão receberá sua reserva e enviará a confirmação em instantes.
            </p>

            <div className="mt-12 flex items-center gap-3 text-on-surface-variant">
                <span className="h-px w-10 bg-outline-variant" />
                <span className="label-overline">Obrigado pela preferência</span>
                <span className="h-px w-10 bg-outline-variant" />
            </div>
        </div>
    );
}
