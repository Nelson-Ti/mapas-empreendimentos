 <template>
  <v-dialog v-model="dialog" persistent width="800px" >
        <v-card>

            <v-toolbar class="elevation-0">
                <v-icon color="primary" large>mdi-cash</v-icon>
                <v-toolbar-title>Extrato de Pagamento</v-toolbar-title>

               

                
                     
                    
            </v-toolbar>

                <v-card-text class="py-0">
                    <template>  
                        <v-row dense class="py-3"> 
                            <v-col cols="12" md="3">
                                <v-select v-model="filter.contratoId" @change="GetExtratoPagamento()" label="Contrato" class="mx-2" item-text="numeroSequencia" item-value="id" :items="lista" outlined dense></v-select>
                            </v-col>
                                    
                            <v-col cols="12" md="3">
                                <v-select v-model="filter.anoVencimento" @change="GetExtratoPagamento()" label="Ano" class="mx-2" :items="anos"  outlined dense></v-select>
                            </v-col>

                            <v-spacer/>
                                <v-btn color="primary" dark text @click="ExportarExcel('tabela')"><v-icon left>mdi-file-excel-outline</v-icon>Exportar (Excel)</v-btn>
                        </v-row>

                        <v-simple-table id="tabela" dense class="py-2 text-caption" v-if="extratoPagamentos.length > 0">
                            <template v-slot:default>
                                <thead>
                                    <tr> 
                                        <th style="font-size: 100%" class="text-left">Parcela</th>
                                        <th style="font-size: 100%" class="text-left">Valor Pago</th>
                                        <th style="font-size: 100%" class="text-left">Situação</th>
                                        <th style="font-size: 100%" class="text-left">Data de Pgt</th>
                                    </tr> 
                                </thead>  

                                <tbody v-for="item in extratoPagamentos" :key="item.id">
                                    <tr>
                                        <td style="font-size: 100%" class="text-left">{{ item.parcelaNumero }}</td>
                                        <td style="font-size: 100%" class="text-left">{{ item.valorPagoParcela.toMoeda() }}</td>
                                        <td style="font-size: 100%" class="text-left"> 
                                            <v-chip small :color="situacaoColor(item)">
                                                <div>
                                                    {{ item.situacaoParcela }} 
                                                </div>
                                            </v-chip>
                                        </td>
                                        <td style="font-size: 100%" class="text-left">{{ item.dataPagamentoParcela ? item.dataPagamentoParcela.toDateDDMMYYYY() : "-" }}</td>
                                    </tr>
                                </tbody>
                              </template>
                        </v-simple-table>
                    </template>
                </v-card-text>

          <v-divider/>

            <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" text @click="Close()">Fechar</v-btn>
            </v-card-actions>
    
            <v-overlay :value="loading">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>  
        </v-card>  
        
    </v-dialog>
</template> 

<script lang="ts">
import { PageBase } from "@/core/models/shared";
import { ContratoService } from "@/core/services/Clientes";
import { RelatorioService } from "@/core/services/Financeiro";
 import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class ExtratoPagamento extends PageBase {
   @Prop() private value!: string;

    exportarExcel: boolean = true

    item: any = {};
    service = new ContratoService();
    relatorioService = new RelatorioService();

    lista: any[] = [];

    loading: boolean = false;
    
    valid = true;
    dialog = false;

    filter: {
        contratoId:any;
        dataBaixaInicial:string;
        dataBaixaFinal:string;
         anoVencimento: any;
    } = {
        contratoId: 0,
        dataBaixaInicial: '',
        dataBaixaFinal: '',
        anoVencimento: new Date().getFullYear(),
    }

    ano:string = '';
    extratoPagamentos = [];

    headers = [
        { text: 'Nº Parcela',  value: 'parcelaNumero', align: "center", sortable: false},
        { text: 'Valor Pago', value: 'valorPagoParcela', align: "center" , sortable: false},   
        { text: 'Situação', value: 'situacaoParcela', align: "center" , sortable: false},   
        { text: 'Data Pagamento', value: 'dataPagamentoParcela', align: "center" , sortable: false},   
    ]

    GetExtratoPagamento(){
        this.extratoPagamentos = [];
        this.relatorioService.ListarReceitaDetalhada(this.filter.contratoId, `${this.filter.anoVencimento ? `${this.filter.anoVencimento}-01-01`: '' }`, `${this.filter.anoVencimento ? `${this.filter.anoVencimento}-12-31`: '' }`)
            .then(
                res => {   
                    this.extratoPagamentos = res.data;
                }, 

            err => {  
                if (!err.response) {
                    this.$swal("Aviso", "Não foi possível acessar a API", "error");
                } else {
                    this.$swal("Aviso", err.response.data, "error");
                }
            })
    }

    anos:any = [];

    GetAnos(){
        var max = new Date().getFullYear(); 
        var min = max - 40
 
        for (let i = max; i >= min; i--) {
            this.anos.push(i)
        }
        return this.anos 
    }

    
    Carregar(){
        this.loading = true;
        this.service.ListarPorCliente(this.app.clienteId).then(
            res => {
                this.lista = res.data;
            },

            err => {
                if (!err.response) {
                    this.$swal("Aviso", "Não foi possível acessar a API", "error");

                } else {
                    this.$swal("Aviso", err.response.data, "error");
            }
        }
        ).finally(() => {
            this.loading = false;
        })
    }  

    situacaoColor(item: any) {
         if(item.situacaoParcela == "Pago")
            return "chipTeal";

        else if(item.situacaoId == 1)
            return "chipBlue";
    } 

    fieldRules: any[] = [(v: any) => !!v || "Campo obrigatório"];

    $refs!: {
        form: HTMLFormElement;
    }; 

    @Watch("value")
    Value() {
        this.dialog = this.value ? true : false;
    }

    @Watch("dialog")
    Dialog() {
        if (!this.dialog) {
        this.$emit("fechou");
        }
    }

    @Watch("item")
    Item() {
        if (this.$refs.form) {
        this.$refs.form.resetValidation();
        } 
    }

    Close(){
        this.dialog = false;
        this.extratoPagamentos = [];
        
        this.filter = {contratoId: 0, dataBaixaInicial: '', dataBaixaFinal: '', anoVencimento: new Date().getFullYear()}
    }

    mounted(){
        this.Carregar();
        this.GetAnos();
    }
}
</script>
