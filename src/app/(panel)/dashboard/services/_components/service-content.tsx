import { getAllServices } from "../_data-access/get-all-services";
import { DialogService } from "./dialog-service";
import { ServicesList } from "./services-list";

export async function ServiceContent() {
    const services = await getAllServices();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[#c9a84c] text-xs tracking-widest uppercase">
                        Gerenciar
                    </p>
                    <h1 className="text-3xl font-light text-[#f0ead6] mt-1">Serviços</h1>
                </div>

                <DialogService
                    trigger={
                        <button className="bg-[#c9a84c] text-black px-6 py-3 text-xs tracking-widest uppercase hover:bg-[#e8c97a] transition-colors cursor-pointer">
                            + Novo serviço
                        </button>
                    }
                />
            </div>

            <ServicesList services={services} />
        </div>
    );
}