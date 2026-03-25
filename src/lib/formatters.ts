export function formatBRL(cents: number): string {
    return (cents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}
