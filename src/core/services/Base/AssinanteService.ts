import { http } from "@/core/ApiConfig";
import { Service } from "../shared";

export class AssinanteService extends Service{

    constructor(){
        super('assinante');
    }

    WhatsApp(id: number){
        return http.get(`${this.GetNomeControle()}/${id}/WhatsApp`);
    }

}