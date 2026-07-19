"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
    {
        question: "Como faço para agendar um horário?",
        answer: "Escolha o salão, o serviço, a data e o horário livre. Você preenche nome, e-mail e telefone — sem criar conta — e o salão confirma em tempo real.",
    },
    {
        question: "Preciso pagar para agendar?",
        answer: "Não. O agendamento é gratuito para clientes. Você paga o serviço diretamente no salão, como de costume.",
    },
    {
        question: "E se o salão não confirmar?",
        answer: "Você recebe um aviso por e-mail com o status da reserva. Se o horário não estiver disponível, o salão sugere outro na hora.",
    },
    {
        question: "Sou profissional. Como cadastro meu salão?",
        answer: "Crie uma conta gratuita, cadastre seus serviços e equipe, e receba uma página de agendamento própria em minutos.",
    },
    {
        question: "Posso cancelar ou remarcar?",
        answer: "Sim, pelo link que chega no e-mail de confirmação você cancela ou remarca sem precisar ligar.",
    },
];

export function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="duvidas" className="bg-surface-lowest">
            <div
                className="mx-auto max-w-[1280px] px-6 lg:px-12"
                style={{ paddingTop: "clamp(72px, 9vw, 120px)", paddingBottom: "clamp(72px, 9vw, 120px)" }}
            >
                <div className="mb-11 text-center">
                    <span className="mb-4 block text-[11px] uppercase tracking-[0.42em] text-gold">FAQ</span>
                    <h2 className="font-serif font-normal text-on-surface" style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
                        Tire suas dúvidas.
                    </h2>
                </div>

                <div
                    className="mx-auto max-w-[880px] rounded-[4px] px-9 py-5"
                    style={{ border: "1px solid #cdb298", backgroundColor: "rgba(255,250,243,0.6)" }}
                >
                    {FAQ_ITEMS.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={item.question} style={{ borderTop: i === 0 ? "none" : "1px solid #eadfce" }}>
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="flex w-full cursor-pointer items-center justify-between bg-transparent py-5 text-left"
                                    aria-expanded={isOpen}
                                >
                                    <span className="pr-4 text-[16px] transition-colors" style={{ color: isOpen ? "var(--gold)" : "#2b211b" }}>
                                        {item.question}
                                    </span>
                                    <span
                                        className="shrink-0 transition-transform duration-300"
                                        style={{ color: isOpen ? "var(--gold)" : "#a08265", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                                    >
                                        ▾
                                    </span>
                                </button>

                                {isOpen && (
                                    <p className="max-w-[60ch] pb-[22px] text-[14px]" style={{ lineHeight: 1.7, color: "#7d6450" }}>
                                        {item.answer}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}