import { Municipio } from "../geral";

export class Qualificacao {
    
    profissaoId!: number;
    profissao!: any;
    nacionalidadeId?: number;
    nacionalidade!: any;
    naturalidadeId?: number;
    naturalidade!: Municipio;
    estadoCivilId?: number;
    estadoCivil!: any;
    rendaBruta: number = 0;
    rendaLiquida: number = 0;
    susep: string = "";
}