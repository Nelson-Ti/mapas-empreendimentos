import { TipoContrato } from ".";

export class Contrato implements Shared.IEntity {
    
    id: number = 0;
    empresaId: number = 0;
    numero: number = 0;
    sequencia: number = 0;
    unidadeId: number = 0;
    unidade!: any;
    tipoId: number = 0;
    tipo!: TipoContrato;
    tipoProdutoId: number = 0;
    tipoProduto!: any;
    data: string = '';
    descricao: string = '';
    tipoIndiceId: number = 0;
    tipoIndice!: any;
    valor: number = 0;
    quantidadeParcela: number = 0;
    renovavel: boolean = false;
    periodicidadeReajuste: number = 0;
    periodicidadeRenovacao: number = 0;
    mesReajuste: number = 0;
    empreendimentoId: number = 0;
    empreendimento!: any;
    prazoContratual: number = 0;
    dataVencimentoOriginal: string = '';
    melhorDia: number = 0;
    numeroProcessoJudicial: number = 0;
    prazo: number = 0;
    responsavel: string = '';
    numeroSequencia: string = '';
    receitas: any[] = [];

    constructor(model?: Contrato){
        
        if(!model)
            return;

        this.id = model.id;
        this.empresaId = model.empresaId;
        this.numero = model.numero;
        this.sequencia = model.sequencia;
        this.unidadeId = model.unidadeId;
        this.unidade = model.unidade;
        this.tipoId = model.tipoId;
        this.tipo = model.tipo;
        this.tipoProdutoId = model.tipoProdutoId;
        this.tipoProduto = model.tipoProduto;
        this.data = model.data;
        this.descricao = model.descricao;
        this.tipoIndiceId = model.tipoIndiceId;
        this.tipoIndice = model.tipoIndice;
        this.valor = model.valor;
        this.quantidadeParcela = model.quantidadeParcela;
        this.renovavel = model.renovavel;
        this.periodicidadeReajuste = model.periodicidadeReajuste;
        this.periodicidadeRenovacao = model.periodicidadeRenovacao;
        this.mesReajuste = model.mesReajuste;
        this.empreendimentoId = model.empreendimentoId;
        this.empreendimento = model.empreendimento;
        this.prazoContratual = model.prazoContratual;
        this.dataVencimentoOriginal = model.dataVencimentoOriginal;
        this.melhorDia = model.melhorDia;
        this.numeroProcessoJudicial = model.numeroProcessoJudicial;
        this.prazo = model.prazo;
        this.responsavel = model.responsavel;
        this.numeroSequencia = model.numeroSequencia;
        this.receitas = model.receitas;
        
    }
}