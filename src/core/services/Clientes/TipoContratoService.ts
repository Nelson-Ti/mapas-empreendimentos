import { http, httpHeader } from "@/core/ApiConfig";
import { Service } from "../shared";

export class TipoContratoService extends Service{

    constructor(){
        super('tipoContrato');
    }

    public AutoComplete(q: string) {
        return http.get(`${this.GetNomeControle()}/AutoComplete`, {
            params: {
                q: q
            },
            headers: httpHeader.headers
        });
    }

}