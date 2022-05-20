import { http } from "@/core/ApiConfig";
import { Service } from "../shared";

export class ReceitaService extends Service{

    constructor(){
        super('receita');
    } 

   // GetQuitacao2(id: number){
     //   return http.get(`${this.GetNomeControle()}/${id}/Quitacao`)
    //}

    GetQuitacao(id:number, dataVencimento:string){
        return http.get(`${this.GetNomeControle()}/${id}/Quitacao?dataVencimento=${dataVencimento}`)
    } 

    Quitacao(id:number, modelo:any){
        return http.post(`${this.GetNomeControle()}/${id}/Quitacao`, modelo)
    }

  /*  Quitacao2(id: number, data: string){
        return http.post(`${this.GetNomeControle()}/${id}/Quitacao`, null, {
            params: {
                data: data
            }
        }) 
    }*/

    GetAntecipacao(id: number, parcelaIds: string, dataVencimento:string){
        return http.get(`${this.GetNomeControle()}/${id}/Antecipacao`, {
            params: {
                parcelaIds,
                dataVencimento
            }
        })
    }

    Antecipacao(id: number, dataVencimento: string, parcelaIds: any[]){
        return http.post(`${this.GetNomeControle()}/${id}/Antecipacao`, {
            dataVencimento: dataVencimento,
            parcelaIds: parcelaIds
        })
    }

    GerarBoleto(id: number){
        return http.post(`${this.GetNomeControle()}/parcela/${id}/GerarBoleto`);
    }

}