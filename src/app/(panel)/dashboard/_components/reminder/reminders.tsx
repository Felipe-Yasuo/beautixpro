import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReminders } from "../../_data-access/get-reminders";
import { ReminderForm } from "./reminder-form";
import { ReminderList } from "./reminder-list";

export async function Reminders() {
    const reminders = await getReminders();

    return (
        <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-foreground text-lg font-semibold">
                    Lembretes
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ReminderList reminders={reminders} />
                <ReminderForm />
            </CardContent>
        </Card>
    );
}