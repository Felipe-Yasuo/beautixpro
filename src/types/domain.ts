export interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
    status: boolean;
    employee: { id: string; name: string };
}

export interface Employee {
    id: string;
    name: string;
    times: string[];
    services: Service[];
}

export interface Appointment {
    id: string;
    name: string;
    email: string;
    phone: string;
    time: string;
    service: { name: string; price: number; duration: number };
    employee: { id: string; name: string };
}

export interface Reminder {
    id: string;
    description: string;
}
