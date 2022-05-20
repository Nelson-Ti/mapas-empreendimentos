import { Contato } from "./Contato";

export class Usuario implements Shared.IEntity{

    id: number = 0;
    assinanteId: number = 0;
    assinante!: any;
    login: string = "";
    senha: string = "";
    complementar: Contato = new Contato();
    foto: any = null;
    ativo: boolean = false;
    primeiroAcesso: boolean = false;
    token: string = "";
    temaEscuro: boolean = false;

    constructor(model?: Usuario){

        if(!model)
            return;

        this.id = model.id;
        this.assinanteId = model.assinanteId;
        this.login = model.login;
        this.senha = model.senha;
        this.complementar = model.complementar;
        this.foto = model.foto;
        this.ativo = model.ativo;
        this.primeiroAcesso = model.primeiroAcesso;
        this.token = model.token;
        this.temaEscuro = model.temaEscuro;        
    }
}    