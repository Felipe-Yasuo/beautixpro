import { getReminders } from "../../_data-access/get-reminders";
import { ReminderForm } from "./reminder-form";
import { ReminderList } from "./reminder-list";

export async function Reminders() {
    const reminders = await getReminders();

    return (
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#2a2a2a]">
                <h2 className="text-xl font-bold text-foreground">Meus Lembretes</h2>
            </div>
            <div className="p-4 flex flex-col gap-3">
                <ReminderForm />
                <ReminderList reminders={reminders} />
            </div>
        </div>
    );
}