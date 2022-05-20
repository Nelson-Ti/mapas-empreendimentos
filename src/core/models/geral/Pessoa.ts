import { PessoaDocumento } from ".";
import { Endereco, Qualificacao } from "../shared";
import { Usuario } from "./Usuario";

export class Pessoa implements Shared.IEntity{
    id: number = 0;
    empresaId: number = 0;
    empresa!: any;
    nome: string = "";
    fantasia: string = "";
    tipoPessoaId: number = 0;
    tipoPessoa!: any;
    cnpjCpf: string = "";
    inscricaoMunicipal: string = "";
    inscricaoEstadual: string = "";
    endereco: Endereco = new Endereco();
    telefone: string = "";
    email: string = "";
    dataCadastro: string = "";
    dataNascimento?: string;
    rg: string = "";
    orgaoExpedido: string = "";
    dataExpedicao?: string;
    sexoId: number = 0;
    sexo!: any;
    usuarioId: number = 0;
    usuario!: Usuario;
    documentos: PessoaDocumento[] = [];

    qualificacao: Qualificacao = new Qualificacao();

    constructor(model?: Pessoa){

        if(!model)
            return;

        this.id = model.id;
        this.empresaId = model.empresaId;
        this.nome = model.nome;
        this.fantasia = model.fantasia;
        this.tipoPessoaId = model.tipoPessoaId;
        this.tipoPessoa = model.tipoPessoa;
        this.cnpjCpf = model.cnpjCpf;
        this.inscricaoMunicipal = model.inscricaoMunicipal;
        this.inscricaoEstadual = model.inscricaoEstadual;
        this.endereco = model.endereco;
        this.telefone = model.telefone;
        this.email = model.email;
        this.dataCadastro = model.dataCadastro? model.dataCadastro.toDateYYYYMMDD() : '';
        this.dataNascimento = model.dataNascimento? model.dataNascimento.toDateYYYYMMDD() : '';
        this.rg = model.rg;
        this.orgaoExpedido = model.orgaoExpedido;
        this.dataExpedicao = model.dataExpedicao? model.dataExpedicao.toDateYYYYMMDD() : '';
        this.sexoId = model.sexoId;
        this.sexo = model.sexo;
        this.usuarioId = model.usuarioId;
        this.documentos = model.documentos;

        this.qualificacao = model.qualificacao;
    }
} 