import { Estado } from '../geral';
import { Municipio } from '../geral/Municipio';

export class Endereco {
    
    logradouro: string = '';
    numero: string = '';
    complemento: string = '';
    cep: string = '';
    bairro: string = '';
    estadoId: number = 0;
    estado!: Estado;
    municipioId: number = 0;
    municipio?: Municipio;

    constructor(model?: Endereco){

        if(!model)
            return;

        this.logradouro = model.logradouro;
        this.numero = model.numero;
        this.complemento = model.complemento;
        this.cep = model.cep;
        this.bairro = model.bairro;
        this.estadoId = model.estadoId;
        this.estado = model.estado;
        this.municipioId = model.municipioId;
        this.municipio = model.municipio;
    }
}