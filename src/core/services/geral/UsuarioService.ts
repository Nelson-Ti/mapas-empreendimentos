import { http, httpHeader } from "@/core/ApiConfig";
import { Service } from "../shared";

export class UsuarioService extends Service{

    constructor(){
        super('usuario');
    }

    public async AlterarSenha(id: number, senhaAntiga: string, senhaNova: string){

        const senhas: {usuarioId: number, senhaAntiga: string, senhaNova: string} = {
            usuarioId: id,
            senhaAntiga: senhaAntiga,
            senhaNova: senhaNova
        };
        
        return await http.post(`${this.GetNomeControle()}/AlterarSenha`, senhas);
    }

    public MudarTema(id: number){
        return http.put(`${this.GetNomeControle()}/${id}/MudarTema`, null);
    }

}