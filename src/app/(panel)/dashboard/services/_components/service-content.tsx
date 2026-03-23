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
                    <h1 className="text-5xl font-serif font-bold text-white">
                        Serviços
                    </h1>
                    <p className="text-[#ffffff60] text-sm mt-2 max-w-sm leading-relaxed">
                        Gerencie o catálogo de luxo do seu ateliê. Defina preços,
                        durações e a disponibilidade de cada experiência.
                    </p>
                </div>

                <DialogService
                    trigger={
                        <button className="bg-[#c9a84c] text-black px-6 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-[#e8c97a] transition-colors cursor-pointer flex items-center gap-2">
                            + Novo Serviço
                        </button>
                    }
                />
            </div>

            <ServicesList services={services} />
        </div>
    );
}