import { http, httpHeader } from "@/core/ApiConfig";
import { Service } from "../shared";

export class TipoProdutoContratoService extends Service{

    constructor(){
        super('tipoProdutoContrato');
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