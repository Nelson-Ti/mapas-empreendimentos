import { Estado } from '.';

export class Municipio implements Shared.IEntity{

    id: number = 0;
    nome: string = '';
    estadoId: number = 0;
    estado!: Estado;

    constructor(model?: Municipio){

        if(!model)
            return;

        this.id = model.id;
        this.nome = model.nome;
        this.estadoId = model.estadoId;
        this.estado = model.estado;
    }
}    