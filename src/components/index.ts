import Vue from 'vue'

import MasterPage   from "./shared/MasterPage.vue";
import AlterarSenha from "./shared/AlterarSenha.vue";
import CadastroContrato from "./clientes/Contrato/Cadastro.vue";
import MeusDados from "./clientes/pessoa/MeusDados.vue";
import ListaContratos from "./clientes/Contrato/ListaContratos.vue";
import ExtratoPagamento from "./clientes/Contrato/ExtratoPagamento.vue";

Vue.component("master-page", MasterPage);
Vue.component("alterar-senha", AlterarSenha);
Vue.component("cadastro-contrato", CadastroContrato);
Vue.component("meus-dados", MeusDados);
 
Vue.component("lista-contratos", ListaContratos);
Vue.component("extrato-pagamento", ExtratoPagamento);
