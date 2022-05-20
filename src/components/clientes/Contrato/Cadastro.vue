<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" persistent>
    <v-card>
      <v-toolbar flat color="primary">
        <v-btn icon dark @click="Close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title class="font-weight-bold"  style="color:white">MEU CONTRATO</v-toolbar-title>
        
        <v-col cols="8" sm="2" md="2" class="pt-10">
            <v-select  color="primary" item-color="primary"   solo   v-model="tabActive" :items="[{id:0, nome: 'Financiamento'},{id:1, nome: 'Entrada'},{id:2, nome: 'Aditamento'},{id:3, nome: 'Serviço'}]" item-value="id" item-text="nome" label="Receitas"></v-select>
        </v-col>
      </v-toolbar>

        <v-card-text class="mt-5"> 
            <v-form ref="formContrato" v-model="valid" lazy-validation>
                <v-tabs-items v-model="tabActive" class="mt-6 pa-1">
                    <v-tab-item v-for="gerenciar in receitas" :key="gerenciar.titulo">
                        <v-col cols="12" sm="6" md="12">
                            <v-card elevation="3" > 
                                <div>
                                    <v-alert icon="mdi-comment-account" color="primary" prominent text type="info" dismissible border="left" elevation="2">
                                       {{saudacao}} {{usuario}}.<br>  Aqui você tem acesso as prestações de {{gerenciar.titulo}}. Na aba Detalhes visualize os encargos e descontos da parcela. <br>
                                        Não deixe sua parcela vencer. Prezamos pela sua saúde financeira.
                                    </v-alert>
                                </div>
                                
                                <v-row class="pa-4">
                                    <v-col cols="12" sm="12" md="12">
                                        <v-btn outlined @click="dialogQuitacao = true" class="ma-2 elevation-1" color="primary" dark>
                                            <v-icon dark left>mdi-calendar-check</v-icon> Quitação
                                        </v-btn>
                                                
                                        <v-btn outlined @click="SimularAntecipacao(gerenciar.id)" class="ma-2 elevation-1" color="primary" dark>
                                            <v-icon dark left>mdi-reply</v-icon> Antecipação
                                        </v-btn>
                                    </v-col>  
                                </v-row>  
                    
                                <v-card-text>
                                    <v-data-table fixed-header item-key="id" some-items  height="600px" :headers="header" :items="gerenciar.parcelasAbertas" :items-per-page="15" class="elevation-1"
                                        :sort-by="['parcela']" v-model="selectedParcelas" show-select>  

                                        <template v-slot:[`item.data-table-select`]="{ isSelected, select }">
                                            <v-checkbox hide-details class="mt-0" :value="isSelected" @change="select($event)" @input="select($event)" />
                                        </template>

                                        <template v-slot:[`item.parcela`]="{ item }">
                                            {{ item.parcela }}
                                        </template>
            
                                        <template v-slot:[`item.saldo`]="{ item }">
                                            {{ item.saldo.toMoeda() }}
                                        </template>

                                        <template v-slot:[`item.dataVencimento`]="{ item }">
                                            {{ item.dataVencimento? item.dataVencimento.toDateDDMMYYYY() : "-" }}
                                        </template>

                                        <template v-slot:[`item.situacaoId`]="{ item }">
                                            <v-chip :color="situacaoColor(item)">
                                                <div v-if="item.agrupadorId != null">
                                                    Agrupada
                                                </div>
                                                
                                                <div v-else>
                                                    {{ situacaoReceitas.find(x => x.id == item.situacaoId).nome}} 
                                                </div>
                                            </v-chip>
                                        </template>

                                        <template v-slot:[`item.urlBoleto`]="{ item }">
                                            <div v-if="item.urlBoleto">
                                                <a @click="VisualizarBoleto(item.urlBoleto)">Visualizar Boleto</a>
                                            </div>

                                            <div v-else>
                                                <a @click="GerarBoleto(item)">Gerar Boleto</a>
                                            </div>
                                        </template>

                                        <template v-slot:[`item.linhaDigitavelBoleto`] = "{item}">
                                            <div v-if="item.urlBoleto">
                                                <v-btn icon @click="CopiarlinhaDigitavelBoleto(item.linhaDigitavelBoleto)">
                                                    <v-tooltip bottom>
                                                        <template v-slot:activator="{ on }">
                                                            <v-icon color="grey darken-1" v-on="on">mdi-content-copy</v-icon>
                                                        </template>
                                                    <span>Copiar código de barras</span>
                                                    </v-tooltip>
                                                </v-btn>
                                            </div> 
                                        </template> 

                                        <template v-slot:[`item.detalhamento`]="{ item }">
                                            <v-btn icon @click="DetalharParcela(item)">
                                                <v-icon>mdi-dots-horizontal</v-icon>
                                            </v-btn>
                                        </template>  
                                    </v-data-table>
                                </v-card-text>

                                <v-snackbar v-model="snack" :timeout="3000" :color="snackColor" class="text-center">
                                    <center> {{ snackText }} </center>  
                                </v-snackbar>

                                </v-card>
                            </v-col>
                    </v-tab-item>
            </v-tabs-items>
            </v-form>
        </v-card-text>
    </v-card>

    
    <v-dialog v-model="dialogDetalhar" max-width="750px">
        <v-card elevation="6" shaped>

        <v-card-title> 
            <span class="text-h5">Informações da Parcela</span>
        </v-card-title>

            <v-card-text class="py-6">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Parcela*" v-model="parcela.parcela" readonly outlined dense filled/>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Valor" type="number" v-model="parcela.valor" readonly outlined dense filled/>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Saldo*" type="number" v-model="parcela.saldo" readonly outlined dense filled/>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field label="Detalhe 2*" v-model="parcela.instrucao2" readonly outlined dense filled/>
                        </v-col>
                        
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="parcela.ultimaDataPagamento" label="Data de pagamento" readonly outlined dense filled/>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field v-model="parcela.ultimaFormaPagamento" label="Forma de pagamento" readonly outlined dense filled/>
                        </v-col> 
                    </v-row>
                    <small>*Informações da ultima baixa</small>
                </v-container>
            </v-card-text>                   

                <v-card-text> 
                    <v-card-subtitle>
                        <span class="text-h6">Encargos / Descontos</span>
                    </v-card-subtitle>

                    <v-container>
                        <v-row v-if="parcela.encargoFinanceiro">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="parcela.encargoFinanceiro.jurosDia" type="number" label="% Juros ao dia" readonly outlined dense filled/>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="parcela.encargoFinanceiro.multa" type="number" label="% Multa" readonly outlined dense filled/>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="parcela.encargoFinanceiro.descontoVencimento" type="number" label="% Desconto" readonly outlined dense filled/>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="parcela.encargoFinanceiro.diasDescontoVencimento" type="number" hint="Nº de dias necessário antes do vencimento para ter o desconto." persistent-hint label="Dias" readonly outlined dense filled/>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="parcela.encargoFinanceiro.descontoAntecipacao" type="number" label="% Desconto Antecipação/Quitação" readonly outlined dense filled/>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="parcela.encargoFinanceiro.diasAposVencimentoNaoReceber" type="number" hint="Nº de dias para não receber após o vencimento." persistent-hint label="Dias" readonly outlined dense filled/>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="parcela.encargoFinanceiro.diasProtesto" type="number" hint="Nº de dias necessário para protestar após o vencimento." persistent-hint label="Dias" readonly outlined dense filled/>
                            </v-col>  
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary" text @click="dialogDetalhar = false" rounded>Fechar</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>

    <!-- DIALOG QUITACAO -->
    <v-dialog v-model="dialogQuitacao" max-width="600px">
        <v-card>
            <v-toolbar color="primary">
                <v-card-title style="color: white">
                    Quitar Contrato
                </v-card-title>
            </v-toolbar>

            <v-card-text class="mt-6">
                <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-menu :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px" max-width="290px">
                            <template v-slot:activator="{on}">
                                <v-text-field v-on="on" type="date" v-model="modeloQuitacao.data" label="Data (Vencimento)" :rules="fieldRules" readonly clearable dense outlined/>
                            </template> 
                            <v-date-picker @input="ObterQuitacao()" locale="pt-br" v-model="modeloQuitacao.data" no-title/>
                        </v-menu>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                        <span style="font-size: 18px ; color: black">
                            Valor da Quitação: 
                        </span>
                        <span style="font-size: 14px ; color: black">
                            {{quitacaoValor.toMoeda()}}
                        </span>
                    </v-col>
                </v-row>
                
                <v-row class="mt-6">
                    <v-col cols="12">
                        <span style="color: red ; font-size: 20px">A QUITAÇÃO é referente SOMENTE as parcelas do financiamento.</span>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" text @click="dialogQuitacao = false">Cancelar</v-btn>
                <v-btn color="primary" text @click="Quitacao()" >Gerar Boleto</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- DIALOG ANTECIPACAO -->
    <v-dialog v-model="dialogAntecipacao" max-width="600px">
        <v-card>
            <v-toolbar color="primary">
                <v-card-title style="color: white">
                    Antecipar Parcelas
                </v-card-title>
            </v-toolbar>

            <v-card-text class="mt-6">                
                <v-row class="my-6">
                    <v-col cols="12">
                        <span style="color: red ; font-size: 20px">Você tem certeza que deseja gerar o boleto de antecipação das parcelas ? </span> <br/>
                        <span style="color: red ; font-size: 20px"> Esse boleto é a soma de todas as parcelas selecionadas.</span>
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-menu :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px" max-width="290px">
                            <template v-slot:activator="{on}">
                                <v-text-field v-on="on" type="date" v-model="antecipacaoData" label="Data (Vencimento)" :rules="fieldRules" readonly clearable dense outlined/>
                            </template>
                            <v-date-picker @input="SimularAntecipacao(selectedParcelas[0].receitaId)" locale="pt-br" v-model="antecipacaoData" no-title/>
                        </v-menu>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                        <span style="font-size: 18px">
                            Valor da Antecipação: <br/>
                        </span>
                        <span style="font-size: 14px">
                            {{antecipacaoValor.toMoeda()}}
                        </span>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" text @click="dialogAntecipacao = false">Cancelar</v-btn>
                <v-btn color="primary" text @click="RealizarAntecipacao()">Gerar Boleto</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


  </v-dialog>
</template>

<script lang="ts">
import { Contrato } from "@/core/models/Clientes";
import { ContratoService } from "@/core/services/Clientes";
import { ReceitaService, SituacaoReceitaParcelaService } from "@/core/services/Financeiro";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class CadastroContrato extends Vue {
  @Prop() private item!: Contrato;
  @Prop() private value!: string;

    dialogDetalhar = false;

    service = new ContratoService();
    receitaService = new ReceitaService();

    valid = true;
    dialog = false;

    tabActive: any = 0;
    fieldRules: any[] = [(v: any) => !!v || "Campo obrigatório"];
    
    $refs!: {
        formContrato: HTMLFormElement,
    }

    parcela:any = {};
    financiamento: any = {};
    entrada: any = {};
    adiantamento: any = {};
    servico: any = {};

    situacaoReceitas: any[] = [];

    /* Parcelas em aberto */
    parcelasAbertas: any[] = [];
    parcelasAbertasEntradas:any = [];
    parcelasAbertasAditamento:any = [];
    parcelasAbertasServico:any = [];

    /* Parcelas pagas */
    parcelasPagas: any[] = [];
    parcelasPagasEntradas:any = [];
    parcelasPagasAditamento:any = [];
    parcelasPagasServico:any = [];
     
    selectedParcelas: any[] = [];
    receitas:any = [];

    modeloQuitacao = new ModelQuitacao();
    dialogQuitacao: boolean = false;
    quitacaoValor: number = 0;
    
    dialogAntecipacao: boolean = false;
    antecipacaoValor: number = 0;
    antecipacaoData: string = new Date().toYYYYMMDD();

    snack = false;
    snackColor = "";
    snackText = "";

    usuario:string ="";

    header: any[] = [
        { text: '', value: 'actions', sortable: false },
        { text: 'Nº', value: 'parcela', type: 'number' },
        { text: 'Saldo', value: 'saldo', type: 'number' },
        { text: 'Situação', value: 'situacaoId' },
        { text: 'Vencimento', value: 'dataVencimento' },
        { text: 'Boleto', value: 'urlBoleto' },
        { text: 'Copiar Cód.', value: "linhaDigitavelBoleto", align: "center", sortable: false},
        { text: 'Detalhes', value: 'detalhamento' },
    ]

    @Watch('item')
    Item() {
        if (this.$refs.formContrato) {
            this.$refs.formContrato.resetValidation();
        }

        this.item.receitas.forEach(x => {
            if(x.tipoId == 1){
                this.financiamento = x;                
            }
            if(x.tipoId == 2){
                this.adiantamento = x;
            }
            if(x.tipoId == 3){
                this.entrada = x;
            }
            if(x.tipoId == 9){
                this.servico = x;
            }
        });

        this.receitas = [
            {titulo:"Financiamento", id:this.financiamento.id, parcelasAbertas:this.parcelasAbertas},
            {titulo:"Entrada", id:this.entrada.id, parcelasAbertas:this.parcelasAbertasEntradas },
            {titulo:"Aditamento", id:this.adiantamento.id, parcelasAbertas: this.parcelasAbertasAditamento},
            {titulo:"Serviços", id:this.servico.id, parcelasAbertas:this.parcelasAbertasServico}
        ]
    }

    @Watch("value")
    Value() {
        this.dialog = this.value ? true : false;
    }

    @Watch("tabActive")
    TabActive(val: any){
        this.selectedParcelas = [];
    }

    @Watch("dialog")
    Dialog() {
        if(this.dialog){
            this.usuario = JSON.parse(localStorage.sessionApp.split(".")).dados.usuarioNome
        }
        else {
            this.$emit("fechou");
        }
    }
    
    @Watch('financiamento')
    Financiamento(){
        if(this.financiamento.id > 0){
            this.financiamento.parcelas.forEach((x:any) => {

            if((x.situacaoId == 1 || x.situacaoId == 4) && ((x.agrupador ? x.agrupador.situacaoId : 1) == 1)) {
                this.parcelasAbertas.push(x);
            }
            if(x.situacaoId == 3){
                this.parcelasPagas.push(x);
            }
         });  
        }
    }  

    @Watch('entrada')
    Entrada(){
        if(this.entrada.id > 0){
            this.entrada.parcelas.forEach((x:any) => {

            if((x.situacaoId == 1 || x.situacaoId == 4) && ((x.agrupador ? x.agrupador.situacaoId : 1) == 1)) {
                this.parcelasAbertasEntradas.push(x);
            }
            if(x.situacaoId == 3){
                this.parcelasPagasEntradas.push(x);
            }
         });  
        }
    }  

    @Watch('aditamento')
    Aditamento(){
        if(this.adiantamento.id > 0){
            this.adiantamento.parcelas.forEach((x:any) => {

            if((x.situacaoId == 1 || x.situacaoId == 4) && ((x.agrupador ? x.agrupador.situacaoId : 1) == 1)) {
                this.parcelasAbertasAditamento.push(x);
            }
            if(x.situacaoId == 3){
                this.parcelasPagasAditamento.push(x);
            }
         });  
        }
    }  

    @Watch('servico')
    Servico(){
        if(this.servico.id > 0){
            this.servico.parcelas.forEach((x:any) => {

            if((x.situacaoId == 1 || x.situacaoId == 4) && ((x.agrupador ? x.agrupador.situacaoId : 1) == 1)) {
                this.parcelasAbertasServico.push(x);
            }
            if(x.situacaoId == 3){
                this.parcelasPagasServico.push(x);
            }
         });  
        }
    } 

    @Watch("dialogQuitacao")
    DialogQuitacao(){
        if(!this.dialogQuitacao){
            this.modeloQuitacao.data = new Date().toYYYYMMDD();
        }else{
            this.ObterQuitacao();
        }
    }

    @Watch("dialogAntecipacao")
    DialogAntecipacao(){
        if(!this.dialogAntecipacao){
            this.antecipacaoData = new Date().toYYYYMMDD();
        } 
    }

    beforeUpdate(){ 
        if (!this.dialog){
            this.$emit('fechou');
        }
    }

    situacaoColor(item: any) {
        if(item.agrupadorId > 0)
            return "chipLightPurple";
        else if(item.situacaoId == 3)
            return "chipTeal";
        else if(item.situacaoId == 2)
            return "chipGray";
        else if(item.situacaoId == 4)
            return "chipLime";
        else if(item.isAgrupador == true)
            return "chipDarkPurple";
        else if ( new Date(item.dataVencimento).toYYYYMMDD() < new Date().toYYYYMMDD())
            return "chipRed";
        else if(item.situacaoId == 1)
            return "chipBlue";
    } 
    
    mounted() {
        new SituacaoReceitaParcelaService().ListarTudo().then(
            res => {
                this.situacaoReceitas = res.data.items;
            }
        )
    }

    Quitacao(){
        let modelo = this.modeloQuitacao;

        this.receitaService.Quitacao(this.financiamento.id, modelo).then(
            res => {
                this.$swal("Aviso", "Operação realizada com sucesso!", res.status == 201 || res.status == 200 ? "success" : "warning");
                this.Atualizar();
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

    ObterQuitacao(){
      this.receitaService.GetQuitacao(this.financiamento.id, this.modeloQuitacao.data).then(
        res => {
            this.quitacaoValor = res.data;
        },

        err => {
            if (!err.response) {
                this.$swal("Aviso", "Não foi possível acessar a API", "error");
            } else {
                this.$swal("Aviso", err.response.data, "error");
            }
        })
    }

    SimularAntecipacao(id: number){
        if(!this.selectedParcelas[0]){
            this.$swal("Aviso", "É necessário selecionar a parcela que deseja antecipar.", "warning");
            return;
        }
        if(this.selectedParcelas.find(x=> x.situacaoId != 1)){
            this.$swal("Aviso", "Não é possível antecipar uma parcela que já foi paga ou cancelada.", "warning");
            return;
        }
        if(this.selectedParcelas.find(x => x.agrupadorId > 0)){
            this.$swal("Aviso", "Não é possível antecipar uma parcela que já foi agrupada.", "warning");
            return;
        }
        this.dialogAntecipacao = true;

        let parcelaIds = "";
    
        this.selectedParcelas.forEach(x => {
            parcelaIds += "," + x.id;
        });

        parcelaIds = parcelaIds.substring(1);

        this.receitaService.GetAntecipacao(id, parcelaIds, this.antecipacaoData).then(
            res => {
                this.antecipacaoValor = res.data;
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

    RealizarAntecipacao(){
        this.selectedParcelas[0] ? this.selectedParcelas[0].receitaId : 0;
        

        let parcelaIds: any[] = [];

        this.selectedParcelas.forEach(x => {
            parcelaIds.push(x.id);
        });
        
        this.receitaService.Antecipacao(this.selectedParcelas[0].receitaId, this.antecipacaoData, parcelaIds).then(
            res => {
                this.$swal("Aviso", "Operação realizada com sucesso!", res.status == 201 || res.status == 200 ? "success" : "warning");
                this.Atualizar();
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

    VisualizarBoleto(url: string){
        window.open(url);
    }

    GerarBoleto(item: any){  
        this.$swal({
            title: 'Atenção!',
            text: "Tem certeza que deseja Gerar o Boleto?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                
                this.receitaService.GerarBoleto(item.id).then(
                    res=>{
                        this.$swal("Aviso", "Operação realizada com sucesso!", res.status == 201 || res.status == 200 ? "success" : "warning");
                        this.Atualizar();
                    },
                    err =>{
                        if (!err.response) {
                            this.$swal("Aviso", "Não foi possível acessar a API", "error");
                        } else {
                            this.$swal("Aviso", err.response.data, "error");
                        }
                    }
                )
                return true;
            },
            // @ts-ignore: Unreachable code error
            allowOutsideClick: () => !this.$swal.isLoading()
        })

    }

    DetalharParcela(item){
        this.parcela = item;
        this.parcela.ultimaDataPagamento = item.ultimaDataPagamento ? item.ultimaDataPagamento.toDateDDMMYYYY() : '';
        this.dialogDetalhar = true;
    }

    Atualizar(){
        this.Reset();
        this.$emit("atualizar");
    }

    CopiarlinhaDigitavelBoleto(linhaDigitavelBoleto:string){
        const listener = (e: ClipboardEvent) => {
            e.clipboardData!.setData('text/plain', linhaDigitavelBoleto);
            e.preventDefault();
            document.removeEventListener('copy', listener);
        };

        this.save();
            document.addEventListener('copy', listener);
            document.execCommand('copy');
    }

    save() {
        this.snack = true;
        this.snackColor = "primary";
        this.snackText = "Copiado com sucesso!";
    }

    Reset(){
        this.financiamento = {};
        this.parcelasPagas = [];
        this.parcelasAbertas = [];
        this.entrada = {};
        this.adiantamento = {};
        this.servico = {};
        this.selectedParcelas = [];

        this.parcela = {}
        this.parcelasAbertas = []
        this.parcelasAbertasEntradas = []
        this.parcelasAbertasAditamento = []
        this.parcelasAbertasServico = []
    }
    
    Close() {
        this.Reset();
        this.dialog = false;
    }

    get saudacao(){
        let h = new Date().getHours();
        if (h <= 5) return 'Boa madrugada';
        if (h < 12) return 'Bom dia';
        if (h < 18) return 'Boa tarde';
        return 'Boa noite'; 
    }
}
    class ModelQuitacao {
        public data: string = new Date().toYYYYMMDD();;
    }
    
</script>

<style>
  tbody tr:nth-of-type(even) {
    background-color: rgba(236, 237, 237);
  }

  tbody tr:nth-of-type(odd) {
    background-color: rgb(255, 255, 255);
  }

  .v-data-table-header {
    background-color: #FEEDE4;
    color: white;
  }

  .v-data-footer {
    background-color: rgb(250 ,250, 250);
  }

  .theme--light.v-data-table thead tr th {
    color: white;
  }
</style>