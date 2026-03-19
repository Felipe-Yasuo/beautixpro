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
}

export function AppointmentsList({ appointments }: AppointmentsListProps) {
    if (appointments.length === 0) {
        return (
            <p className="text-[#3a3028] text-xs tracking-widest uppercase text-center py-20">
                Nenhum agendamento para este dia.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {appointments.map((appointment) => (
                <div
                    key={appointment.id}
                    className="flex items-center justify-between border border-[#c9a84c22] px-6 py-4 hover:border-[#c9a84c44] transition-colors"
                >
                    <div className="flex items-center gap-8">
                        <p className="text-[#c9a84c] text-sm font-medium w-12">
                            {appointment.time}
                        </p>
                        <div>
                            <p className="text-[#f0ead6] text-sm">{appointment.name}</p>
                            <p className="text-[#3a3028] text-xs mt-0.5">
                                {appointment.service.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <p className="text-[#c9a84c] text-sm">
                            R$ {(appointment.service.price / 100).toFixed(2)}
                        </p>
                        <DialogAppointment appointment={appointment} />
                    </div>
                </div>
            ))}
        </div>
    );
}