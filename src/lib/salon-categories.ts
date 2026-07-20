export const CATEGORIES = [
    "Coloração",
    "Cortes",
    "Barbearia",
    "Estética",
    "Unhas",
    "Penteados",
] as const;

export type Category = (typeof CATEGORIES)[number];

// Termos que, se aparecerem no nome de um serviço, associam o salão à categoria
const KEYWORDS: Record<Category, string[]> = {
    Coloração: ["color", "mecha", "luzes", "tintura", "tonaliz", "descolor", "loiro"],
    Cortes: ["corte"],
    Barbearia: ["barba", "navalha", "barbear"],
    Estética: ["estét", "limpeza de pele", "massagem", "facial", "sobrancelha", "depila", "design"],
    Unhas: ["unha", "manicure", "pedicure", "gel", "alongamento", "esmalt"],
    Penteados: ["penteado", "escova", "chapinha", "progressiva", "hidrat", "tranç"],
};

// Retorna as categorias que um salão atende, a partir dos nomes dos seus serviços
export function salonCategories(serviceNames: string[]): Set<Category> {
    const found = new Set<Category>();
    const normalized = serviceNames.map((n) => n.toLowerCase());

    for (const category of CATEGORIES) {
        const terms = KEYWORDS[category];
        if (normalized.some((name) => terms.some((term) => name.includes(term)))) {
            found.add(category);
        }
    }
    return found;
}