import {http, httpHeader} from '../../ApiConfig'

export class EnderecoService {

    private _nomeControle: string = 'endereco';
    
    public ObterEstados() {
        return http.get(`${this._nomeControle}/Estado?$orderby=nome`, httpHeader);
    }

    public ObterMunicipios(estadoId: number) {
        return http.get(`${this._nomeControle}/Estado/${estadoId}/Municipio?$orderby=nome`, httpHeader);
    }

    public ObterPorCep(cep: string){
        return http.get(`${this._nomeControle}/cep/${cep}`, httpHeader);
    }
}