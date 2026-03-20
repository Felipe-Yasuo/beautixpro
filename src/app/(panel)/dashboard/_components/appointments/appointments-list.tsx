import { DialogAppointment } from "./dialog-appointment";

interface Appointment {
    id: string;
    name: string;
    email: string;
    phone: string;
    time: string;
    service: {
        name: string;
        price: number;
        duration: number;
    };
}

interface AppointmentsListProps {
    appointments: Appointment[];
    times: string[];
}

export function AppointmentsList({ appointments, times }: AppointmentsListProps) {
    const sortedTimes = [...times].sort((a, b) => {
        const [aH, aM] = a.split(":").map(Number);
        const [bH, bM] = b.split(":").map(Number);
        return aH * 60 + aM - (bH * 60 + bM);
    });

    if (sortedTimes.length === 0) {
        return (
            <p className="text-muted-foreground text-sm text-center py-10">
                Nenhum horário configurado. Configure seus horários no perfil.
            </p>
        );
    }

    // Gera mapa de qual agendamento ocupa cada slot
    const slotMap: Record<string, { appointment: Appointment; isStart: boolean }> = {};

    appointments.forEach((apt) => {
        const [h, m] = apt.time.split(":").map(Number);
        const startMinutes = h * 60 + m;
        const slots = Math.ceil(apt.service.duration / 30);

        for (let i = 0; i < slots; i++) {
            const slotMinutes = startMinutes + i * 30;
            const slotHour = String(Math.floor(slotMinutes / 60)).padStart(2, "0");
            const slotMin = String(slotMinutes % 60).padStart(2, "0");
            slotMap[`${slotHour}:${slotMin}`] = {
                appointment: apt,
                isStart: i === 0,
            };
        }
    });

    return (
        <div className="flex flex-col divide-y divide-border">
            {sortedTimes.map((time) => {
                const slot = slotMap[time];

                return (
                    <div
                        key={time}
                        className="flex items-center justify-between px-4 py-3 hover:bg-secondary/30 transition-colors"
                    >
                        <div className="flex items-center gap-6">
                            <p className="text-primary text-sm font-medium w-12">{time}</p>
                            {slot ? (
                                <div>
                                    <p className="text-foreground text-sm font-medium">
                                        {slot.appointment.name}
                                    </p>
                                    <p className="text-muted-foreground text-xs mt-0.5">
                                        {slot.appointment.service.name}
                                        {!slot.isStart && (
                                            <span className="ml-2 text-primary/60">(continuação)</span>
                                        )}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-sm">Disponível</p>
                            )}
                        </div>

                        {slot?.isStart && (
                            <div className="flex items-center gap-4">
                                <p className="text-primary text-sm">
                                    R$ {(slot.appointment.service.price / 100).toFixed(2)}
                                </p>
                                <DialogAppointment appointment={slot.appointment} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}