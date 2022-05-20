
export class TipoContrato implements Shared.IEntity {
    
    id: number = 0;
    empresaId: number = 0;
    tipoOperacaoId: number = 0;
    nome: string = '';

    constructor(model?: TipoContrato){
        
        if(!model)
            return;

        this.id = model.id;
        this.empresaId = model.empresaId;
        this.tipoOperacaoId = model.tipoOperacaoId;
        this.nome = model.nome;
    }
}