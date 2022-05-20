import { http } from "@/core/ApiConfig";
import { Service } from "../shared";

export class PessoaService extends Service{

    constructor(){
        super('pessoa');
    }

    CriarUsuario(cpfCnpj: string){
        return http.post(`${this.GetNomeControle()}/criarusuario`, null, {
            params:{
                cpfCnpj
            }
        })
    }

}