import { Vue } from "vue-property-decorator";
import { JSONToCSVConvertor, TableToExcel } from '@/assets/scripts/helper';

export class PageBase extends Vue {
    
    public sessionApp: any;
    public app: {assinanteId: number, assinanteNome: string, login: string, temaEscuro: boolean, usuarioFoto: string, usuarioId: number, usuarioNome: string, clienteId: number} = {
        assinanteId: 0,
        assinanteNome: '',
        login: '',
        temaEscuro: false,
        usuarioFoto: '',
        usuarioId: 0,
        usuarioNome: '',
        clienteId: 0
    };

    constructor(){
        super();

        if (!localStorage.sessionApp){
            this.$router.push({ name: 'Login' });
            return;
        }

        this.sessionApp = JSON.parse(localStorage.sessionApp);

        this.app.assinanteId = this.sessionApp.dados.assinanteId;
        this.app.assinanteNome = this.sessionApp.dados.assinanteNome;
        this.app.login = this.sessionApp.dados.login;
        this.app.temaEscuro = this.sessionApp.dados.temaEscuro;
        this.app.usuarioFoto = this.sessionApp.dados.usuarioFoto;
        this.app.usuarioId = this.sessionApp.dados.usuarioId;
        this.app.usuarioNome = this.sessionApp.dados.usuarioNome;
        this.app.clienteId = this.sessionApp.dados.clienteId;

    }

    ExportarExcel(tabela: string, worksheet?: string){
      TableToExcel(tabela, worksheet);
    }

    JsonToCSV(JSONData: JSON, ReportTitle: string, ShowLabel: boolean){
        JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel);
    }

    MudarTema(temaEscuro: boolean){
        this.app.temaEscuro = temaEscuro;
        this.sessionApp.dados.temaEscuro = temaEscuro;
        localStorage.setItem('sessionApp', JSON.stringify(this.sessionApp));
        this.$vuetify.theme.dark = temaEscuro;
    }
}