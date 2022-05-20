import { http, httpHeader } from "@/core/ApiConfig";
import { Service } from "../shared";

export class ContratoService extends Service{

    constructor(){
        super('contrato');
    }
    
    public GetFiltro(parametros: string, filter: any) {

        if(filter) {
            let paramTemp = '';

            if (filter.numero){
                if (paramTemp) { paramTemp += ' and '; }
                paramTemp += `numero eq ${filter.numero}`;
            }

            if (filter.sequencia){
                if (paramTemp) { paramTemp += ' and '; }
                paramTemp += `sequencia eq ${filter.sequencia}`;
            }

            if (filter.dataInicial){
                if (paramTemp) { paramTemp += ' and '; }
                paramTemp += `data ge ${filter.dataInicial}`;
            }
            
            if (filter.dataFinal){
                if (paramTemp) { paramTemp += ' and '; }
                paramTemp += `data le ${filter.dataFinal}`;
            }

            if (filter.tipoProdutoId){
                if (paramTemp) { paramTemp += ' and '; }
                paramTemp += `tipoProdutoId eq ${filter.tipoProdutoId}`;
            }

            if (filter.tipoContratoId){
                if (paramTemp) { paramTemp += ' and '; }
                paramTemp += `tipoId eq ${filter.tipoContratoId}`;
            }

            if (filter.empreendimentoId){
                if (paramTemp) { paramTemp += ' and '; }
                paramTemp += `empreendimentoId eq ${filter.empreendimentoId}`;
            }

            if (filter.grupoId){
                if (paramTemp) { paramTemp += ' and '; }
                paramTemp += `empreendimento/grupos/any(o: o/id eq ${filter.grupoId})`;
            }

            // if (filter.unidadeId){
            //     if (paramTemp) { paramTemp += ' and '; }
            //     paramTemp += `empreendimento/grupos/any(o: o/unidades/any(p: p/id eq ${filter.unidadeId}))`;
            // }

            if (paramTemp) {

                if(parametros){
                    parametros += '&';
                }
                else {
                    parametros += '?';
                }
        
                parametros += `$filter=${paramTemp}`;
            }
        }

        return parametros;
    }

    ListarPorCliente(clienteId: number){
        return http.get(`${this.GetNomeControle()}/Cliente/${clienteId}`)
    }

    ListarComFiltro(page: number, pageSize: number, sortBy: any[], desc: any[], search: any, columns: any[], filter: any, include?: string){

        let parametros = this.GetParamentroPaginacaoOrdenacao(page, pageSize, sortBy, desc, search, columns);
    
        parametros = this.GetFiltro(parametros, filter);
    
        return http.get(`${this.GetNomeControle()}${parametros}`, this.GetHeader(include));
    }

}