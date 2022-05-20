
export class TipoProduto implements Shared.IEntity {
    
    id: number = 0;
    nome: string = '';

    constructor(model?: TipoProduto){
        
        if(!model)
            return;

        this.id = model.id;
        this.nome = model.nome;
    }
}