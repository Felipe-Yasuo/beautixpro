"use client";

interface DatePickerProps {
    selected: Date | null;
    onChange: (date: Date) => void;
}

export function DatePicker({ selected, onChange }: DatePickerProps) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) return;
        const [year, month, day] = e.target.value.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        onChange(date);
    }

    const formatted = selected && !isNaN(selected.getTime())
        ? `${selected.getFullYear()}-${String(selected.getMonth() + 1).padStart(2, "0")}-${String(selected.getDate()).padStart(2, "0")}`
        : "";

    return (
        <input
            type="date"
            value={formatted}
            onChange={handleChange}
            min={today.toISOString().split("T")[0]}
            className="bg-transparent border border-[#c9a84c33] text-[#f0ead6] px-4 py-3 text-sm outline-none focus:border-[#c9a84c] transition-colors w-full cursor-pointer [color-scheme:dark]"
        />
    );
}