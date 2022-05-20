import { http } from "@/core/ApiConfig";

export class AutenticadorService {

    private _nomeControle = 'autenticador';

    public async AutenticarCliente(usuario: any){
        return await http.post(`${this._nomeControle}/cliente`, usuario);
    }
    
    public async ResetarSenha(model: any){
        return await http.post(`${this._nomeControle}/resetarsenha`, model);
    }

    public async ConfirmarEmail(token: string){
        return await http.post(`${this._nomeControle}/confirmaremail`, null, {
            params: {
                token
            }
        });
    }
}