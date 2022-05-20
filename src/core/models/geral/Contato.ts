export class Contato {

    nome: string = "";
    celular: string = "";
    telefone: string = "";
    ramal: string = "";
    email: string = "";
    
    constructor(model?: Contato){

        if(!model)
            return;

        this.nome = model.nome;
        this.celular = model.celular;
        this.telefone = model.telefone;
        this.ramal = model.ramal;
        this.email = model.email;
    }
}    