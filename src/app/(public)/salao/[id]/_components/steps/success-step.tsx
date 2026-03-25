export function SuccessStep() {
    return (
        <div className="flex flex-col items-center justify-center gap-6 py-20">
            <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary text-2xl">
                ✓
            </div>
            <h2 className="text-xl font-bold text-foreground">Agendamento confirmado!</h2>
            <p className="text-muted-foreground text-sm text-center max-w-sm">
                Seu agendamento foi realizado com sucesso. Aguarde a confirmação do salão.
            </p>
        </div>
    );
}
