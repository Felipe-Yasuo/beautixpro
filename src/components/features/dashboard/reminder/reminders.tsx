import { getReminders } from "@/lib/services/get-reminders";
import { ReminderForm } from "./reminder-form";
import { ReminderList } from "./reminder-list";

export async function Reminders() {
    const reminders = await getReminders();

    return (
        <div
            className="overflow-hidden rounded-[10px]"
            style={{ backgroundColor: "var(--clima-surface)", border: "1px solid var(--clima-border)" }}
        >
            <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--clima-border)" }}>
                <h2 className="font-serif font-normal" style={{ fontSize: "22px", color: "var(--clima-text)" }}>
                    Meus lembretes
                </h2>
            </div>
            <div className="flex flex-col gap-3 p-4">
                <ReminderForm />
                <ReminderList reminders={reminders} />
            </div>
        </div>
    );
}