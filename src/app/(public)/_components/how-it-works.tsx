export function HowItWorks() {
    return (
        <section
            id="como-funciona"
            className="relative border-t border-outline-variant bg-surface-low"
        >
            {/* Linha dourada decorativa no topo */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Cabeçalho */}
                    <header className="lg:col-span-4">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-gold" />
                            <span className="label-overline text-gold">O ritual</span>
                        </div>
                        <h2 className="mt-6 font-serif text-4xl italic leading-tight text-on-surface lg:text-5xl">
                            Como
                            <br />
                            <span className="text-gradient-gold not-italic font-bold">
                                funciona
                            </span>
                            .
                        </h2>
                        <p className="mt-6 max-w-sm font-serif text-base italic text-on-surface-variant">
                            Três passos entre o seu desejo e a confirmação do ateliê.
                        </p>
                    </header>

                    {/* Etapas */}
                    <ol className="lg:col-span-8 flex flex-col">
                        <Step
                            roman="I"
                            title="Escolha o ateliê"
                            body="Explore a curadoria de profissionais selecionados. Veja o catálogo, os horários e a localização de cada estúdio."
                        />
                        <Step
                            roman="II"
                            title="Reserve seu horário"
                            body="Preencha um formulário breve com suas informações, escolha o serviço, a data e o horário desejado."
                        />
                        <Step
                            roman="III"
                            title="Receba a confirmação"
                            body="O ateliê analisa sua reserva e confirma em tempo real. Você recebe a notificação assim que aprovado."
                        />
                    </ol>
                </div>
            </div>
        </section>
    );
}

function Step({
    roman,
    title,
    body,
}: {
    roman: string;
    title: string;
    body: string;
}) {
    return (
        <li className="flex gap-6 border-t border-outline-variant py-10 first:border-t-0 first:pt-0 lg:gap-10">
            <span className="font-serif text-3xl italic text-gold/70 lg:text-4xl">
                {roman}
            </span>
            <div className="flex-1">
                <h3 className="font-serif text-2xl text-on-surface lg:text-3xl">
                    {title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-on-surface-variant lg:text-base">
                    {body}
                </p>
            </div>
        </li>
    );
}
