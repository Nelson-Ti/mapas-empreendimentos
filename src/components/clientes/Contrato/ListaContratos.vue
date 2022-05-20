 <template>
  <v-dialog
    v-model="dialog"
    width="800px" 
  >
        <v-card>
            <v-toolbar  class="elevation-0">
                <v-toolbar-title>Meus Contratos</v-toolbar-title>
            </v-toolbar>

                <v-card-text class="py-3">
                    <template>
                        <v-data-table :headers="headers" :items="lista" :items-per-page="5" class="elevation-3">

                            <template v-slot:[`item.numero`]="{ item }">
                                <v-chip outlined label link color="primary" @click="AbrirDialogCadastro(item.id)">
                                    <v-icon left>mdi-file-document-edit
                                    </v-icon> {{item.numero}} -  {{item.sequencia}}
                                </v-chip>
                            </template>

                            <template v-slot:[`item.empreendimento.nome`]="{ item }">
                                {{item.empreendimento.nome}}
                            </template>

                            <template v-slot:[`item.unidade.grupo.nome`]="{ item }">
                                {{item.unidade.grupo.nome}}
                            </template>

                            <template v-slot:[`item.unidade.nome`]="{ item }">
                                {{item.unidade.nome}} 
                            </template>
                        </v-data-table>
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
        
        <cadastro-contrato v-model="dialogCadastro" :item="item" @fechou="CotratoFechou()" @atualizar="AtualizarContrato()"/>

    </v-dialog>
    
</template> 

<script lang="ts">
import { Contrato } from "@/core/models/Clientes";
import { PageBase } from "@/core/models/shared";
import { ContratoService } from "@/core/services/Clientes";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class ListaContratos extends PageBase {
   @Prop() private value!: string;

    item: any = {};
    service = new ContratoService();

    lista: any[] = [];

    loading: boolean = false;
    dialogCadastro:boolean = false
    
    valid = true;
    dialog = false;

    headers = [
        { text: 'Contrato',  value: 'numero', align: "center", sortable: false},
        { text: 'Loteamento', value: 'empreendimento.nome', align: "center" , sortable: false},
        { text: 'Quadra', value: 'unidade.grupo.nome', align: "center" , sortable: false},
        { text: 'Lote', value: 'unidade.nome', align: "center", sortable: false },
    ]
    
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

    contratoAberto: number = 0;

    AbrirDialogCadastro(id: number){
    this.contratoAberto = id;
    this.service.ObterPorId(id, "Receitas.Cliente, Receitas.Tipo, Receitas.Parcelas.Situacao, TipoIndice, Tipo, Receitas.Parcelas.Baixas, Receitas.Parcelas.Agrupador, Receitas.Parcelas.Baixas.FormaPagamento").then(
      res=>{
        this.item = new Contrato(res.data)
        this.dialogCadastro = true
      },
      err => {
        if (!err.response) {
          this.$swal("Aviso", "Não foi possível acessar a API", "error");
        } else {
          this.$swal("Aviso", err.response.data, "error");
        }
      }
    )    
  }

  CotratoFechou(){
    this.dialogCadastro = false;
    this.contratoAberto = 0;
  }

  AtualizarContrato(){
    this.AbrirDialogCadastro(this.contratoAberto);
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
    }

    mounted(){
        this.Carregar();
    }
}
</script>
