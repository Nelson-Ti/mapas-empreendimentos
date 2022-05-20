import { Pessoa } from ".";
import { Arquivo } from "../shared";

export class PessoaDocumento extends Arquivo implements Shared.IEntity{
    id: number = 0;
    pessoaId: number = 0;
    pessoa!: Pessoa;
    trocaEndereco: boolean = false;

    constructor(model?: PessoaDocumento){

        super();

        if(!model)
            return;

        this.id = model.id;
        this.pessoaId = model.pessoaId;
        this.trocaEndereco = model.trocaEndereco;
    }
} 