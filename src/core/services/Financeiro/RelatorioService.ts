import { http } from "@/core/ApiConfig";
import { Service } from "../shared";

export class RelatorioService extends Service{

    constructor(){
        super('financeiro/relatorio');
    } 

    
    ListarReceitaDetalhada(contratoId:string,dataBaixaInicial:string, dataBaixaFinal:string){
        return http.get(`${this.GetNomeControle()}/receitaDetalhada?&contratoId=${contratoId}&dataBaixaInicial=${dataBaixaInicial}&dataBaixaFinal=${dataBaixaFinal}`)
    }

     

}