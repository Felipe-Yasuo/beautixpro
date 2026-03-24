// service-content.tsx
import { getAllServices } from "../_data-access/get-all-services";
import { DialogService } from "./dialog-service";
import { ServicesList } from "./services-list";

export async function ServiceContent() {
    const services = await getAllServices();

    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-5xl font-serif font-bold text-[var(--on-surface)]">
                        Serviços
                    </h1>
                    <p className="text-[var(--on-surface-variant)] text-sm mt-2 max-w-sm leading-relaxed">
                        Gerencie o catálogo de luxo do seu ateliê. Defina preços,
                        durações e a disponibilidade de cada experiência.
                    </p>
                </div>

                <DialogService
                    trigger={
                        <button className="btn-primary flex items-center gap-2">
                            + Novo Serviço
                        </button>
                    }
                />
            </div>

            <ServicesList services={services} />
        </div>
    );
}