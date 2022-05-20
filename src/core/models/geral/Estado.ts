export class Estado implements Shared.IEntity{

    id: number = 0;
    nome: string = '';
    uf: string = '';

    constructor(model?: Estado){

        if(!model)
            return;

        this.id = model.id;
        this.nome = model.nome;
        this.uf = model.uf;
    }
}    