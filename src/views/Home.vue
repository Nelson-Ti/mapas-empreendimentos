<template>
  <master-page>
    <v-card height="600px">

      <!-- <v-card-title>
        <v-icon large left color="primary">mdi-rocket</v-icon>
        <span class="title font-weight-medium">Meu espaço</span>
        <v-spacer/>    
      </v-card-title> -->

 
     
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon color="primary" class="mb-2" dark v-on="on" @click="Carregar()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </template>
          <span>Atualizar</span>
        </v-tooltip> 
      </v-card-title> -->

     <!--  <div>
        <v-row class="ma-6">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card class="ma-1" height="150" width="160"  :elevation="hover ? 24 : 2" @click="dialogListaContratos = true" >
              <div class="text-center py-6">
                <v-img class="center" height="70" width="90" src="../assets/images/home.png"></v-img>
                <p class="py-2 font-padrao">Meus Contratos</p>
              </div>  
            </v-card>
          </v-hover>

          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card class="ma-1" height="150" width="160" :elevation="hover ? 24 : 2" link @click="dialogExtrato = true">
              <div class="text-center py-6">
                <v-img class="center" height="70" width="70" src="../assets/images/extrato.png"></v-img>
                <p class="py-2 font-padrao">Extrato de pag.</p>
              </div>  
            </v-card>
          </v-hover>

         <v-hover v-slot:default="{ hover }" close-delay="200">
              <v-card class="ma-1" height="150" width="160"  :elevation="hover ? 24 : 2" link>
                  <div class="text-center py-6">
                    <v-img class="center" height="70" width="70" src="../assets/images/extrato.png"></v-img>
                    <p class="py-2 font-padrao">Extrato de pag.</p>
                  </div>  
              </v-card>
            </v-hover>

            <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card class="ma-1" height="150" width="160"  :elevation="hover ? 24 : 2" >
                <div class="text-center py-6">
                  <v-img class="center" height="70" width="70"
                    src="../assets/images/barcode.png">
                  </v-img>
                <p class="py-2 font-padrao">Gerar boletos</p>
                </div>  
            </v-card>
          </v-hover> 

          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card class="ma-1" height="150" width="160" :elevation="hover ? 24 : 2" link @click="dialogMeusDados = true">
              <div class="text-center py-6">
                <v-img class="center" height="70" width="70" src="../assets/images/user.png"></v-img>
              <p class="py-2 font-padrao">Meus dados</p>
              </div>  
            </v-card>
          </v-hover>

          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card link class="ma-1" height="150" width="160"  :elevation="hover ? 24 : 2" @click="AbrirWhatsApp()">
              <div class="text-center py-6">
                <v-img class="center" height="70" width="70" src="../assets/images/ajuda.png"></v-img>
                <p class="py-2 font-padrao">Ajuda</p>
              </div>  
            </v-card>
          </v-hover>
        </v-row>
      </div> <br><br>-->
    </v-card>

     <meus-dados v-model="dialogMeusDados" @fechou="dialogMeusDados = false"></meus-dados>
     <lista-contratos v-model="dialogListaContratos" @fechou="dialogListaContratos = false"></lista-contratos>
     <extrato-pagamento v-model="dialogExtrato" @fechou="dialogExtrato = false"></extrato-pagamento>


    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </master-page>
</template>

<script lang="ts">
import { PageBase } from "@/core/models/shared";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { ContratoService } from "../core/services/Clientes"
import { AssinanteService } from "@/core/services/Base";

@Component
export default class Home extends PageBase {
  loading: boolean = false;
  dialogCadastro: boolean = false;
  lista: any[] = [];
  item: any = {};
  service = new ContratoService();

  contratoAberto: number = 0;
  dialogMeusDados:boolean = false;

  dialogListaContratos:boolean = false;
  dialogExtrato:boolean = false;

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

  mounted(){
    this.Carregar();
  }
 
  AbrirWhatsApp(){
    new AssinanteService().WhatsApp(this.app.assinanteId).then(
      res => {
        let numero = res.data;
        console.log(numero)
        numero = numero.replaceAll("(", "");
        numero = numero.replaceAll(")", "");
        numero = numero.replaceAll("-", "");
        numero = numero.replaceAll(" ", "");
        numero = numero.trim();

        window.open(`https://api.whatsapp.com/send?phone=55${numero}`);
      },
      err =>{
        this.$swal('Aviso', err.message, 'error')
      })
  }

  headers = [
    { text: 'Contrato',  value: 'numero', align: "center", sortable: false},
    { text: 'Loteamento', value: 'empreendimento.nome', align: "center" , sortable: false},
    { text: 'Quadra', value: 'unidade.grupo.nome', align: "center" , sortable: false},
    { text: 'Lote', value: 'unidade.nome', align: "center", sortable: false },
  ]
}
</script>

<style>
/* max device width 
  @media screen and (max-device-width: 480px) {
  .mobile-center {
  
	}
}   */


.cardContrato{
  border-radius: 5px 5px 5px 5px !important;
}
.cardContrato:hover{
  border-radius: 10px 10px 10px 10px !important;
  box-shadow: 1px 1px 10px gray !important;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
