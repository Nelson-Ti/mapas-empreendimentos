<template>
  <v-app id="inspire">
    <div class="appParallax background">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 47.1" class="appParallax__svg">
        <path data-v-a8bf403a d="M300,46.9L0,47.1V8.9c0,0,21.1,14.3,65.2,14.1c40.6-0.2,76.4-23,128-23C243.3,0,300,16.4,300,16.4V46.9z" class="appParallax__path"/>
      </svg>
    </div>
    <v-main>
      <v-container style="margin-top: 10%" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            
              <v-card class="elevation-1 py-2">
                <v-card-title>
                  <v-row class="pa-5" align="center" justify="center">
                    <v-img src="../assets/images/logo.png" max-width="300" />
                  </v-row>
                </v-card-title> 
                
                <div v-if="!resetarSenha && !cadastrarUsuario">
                  <v-form @submit.prevent="Login()">
                    <v-card-text>
                      <v-text-field label="CPF/CNPJ" prepend-icon="mdi-account" v-model="acesso.login" v-mask="mask"/>
                      <v-text-field label="Senha" prepend-icon="mdi-lock" v-model="acesso.senha" @click:append-outer="() => esconderSenha = !esconderSenha" 
                        :type="esconderSenha ? 'password' : 'text'" :append-outer-icon="esconderSenha ? 'mdi-eye' : 'mdi-eye-off'"/>
                    </v-card-text>
                    <v-card-actions class="px-6">
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <a style="text-decoration: underline;" @click="ResetarSenha(false)">Esqueceu a senha?</a>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <a style="text-decoration: underline;" @click="CadastrarUsuario(false)">Não possui cadastro?</a>
                        </v-col>
                      </v-row>
                      <v-spacer/>
                      <v-btn type="submit" color="primary" width="30%" :loading="loading">Login</v-btn>
                    </v-card-actions>
                  </v-form>
                </div>

                <div v-else-if="resetarSenha && !cadastrarUsuario">
                  <v-form @submit.prevent="ResetarSenha(true)">
                    <v-card-text>
                      <v-text-field label="Cpf/Cnpj" prepend-icon="mdi-account" v-model="resetarModel.login" v-mask="mask"/>
                    </v-card-text>
                    <v-card-actions class="px-6">
                      <v-btn color="secondary" width="30%" :loading="loading" @click="resetarSenha = false">Voltar</v-btn>
                      <v-spacer/>
                      <v-btn type="submit" color="primary" width="30%" :loading="loading">Redefinir</v-btn>
                    </v-card-actions>
                  </v-form>
                </div>

                <div v-else>
                  <v-form @submit.prevent="CadastrarUsuario(true)">
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field label="CPF/CNPJ" prepend-icon="mdi-account" v-model="cpfCnpj" v-mask="mask"/>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field label="Login" prepend-icon="mdi-account" v-model="cpfCnpj" disabled/>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="px-6">
                      <v-btn color="secondary" width="30%" :loading="loading" @click="cadastrarUsuario = false">Voltar</v-btn>
                      <v-spacer/>
                      <v-btn type="submit" color="primary" width="30%" :loading="loading">Cadastrar</v-btn>
                    </v-card-actions>
                  </v-form>
                </div>

              </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { PessoaService } from "@/core/services/Clientes";
import { AutenticadorService } from "@/core/services/geral";
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  public loading: boolean = false;
  private esconderSenha: boolean = true;
  acesso: { login: string; senha: string } = {
    login: "",
    senha: ""
  };
  fieldRules: any[] = [(v: any) => !!v || "Campo obrigatório"];
  service = new AutenticadorService();
  pessoaService = new PessoaService();
  token: string = '';
  resetarSenha: boolean = false;
  cadastrarUsuario: boolean = false;
  resetarModel: any = {
    login: "",
    senhaNova: "",
    token: ""
  }
  cpfCnpj: string = '';
  mskCnpj = process.env.VUE_APP_MSK_CNPJ;
  maskCpf = process.env.VUE_APP_MSK_CPF;
  mask = process.env.VUE_APP_MSK_CPF;

  mounted(){
    this.token = this.$route.params.token;
  }

  @Watch('resetarModel.login')
  @Watch('acesso.login')
  @Watch('cpfCnpj')
  WathCPFCNPJ(val: any){
    if(val.length > 14){
      this.mask = this.mskCnpj;
    }
    else{
      this.mask = this.maskCpf;
    }
  }

  @Watch('token')
  WatchToken(){

    if(!this.token)
      return;

    this.service.ConfirmarEmail(this.token).then(
      res =>{
        this.$swal('Aviso', res.data, res.status == 200 ? 'success' : 'warning');
      },
      err =>{
        this.$swal('Aviso', err.response.data, err.response.status === 400 ? 'warning' : 'error')
      }
    )
  }

  Login() {
    this.loading = true;

    this.service.AutenticarCliente(this.acesso).then(
      res => {
        localStorage.setItem('sessionApp', JSON.stringify(res.data));                  
        this.$swal('Aviso', res.data, res.status == 200 ? 'success' : 'warning');
        this.$router.push({ name: 'Home' });
      },
      err => {
        localStorage.clear();
        this.$swal('Aviso', err.response.data, err.response.status === 400 ? 'warning' : 'error')
      }
    ).finally(() => {
      this.loading = false;
    });
  }

  CadastrarUsuario(realizar: boolean){
    if(realizar){
      this.loading = true;
      this.pessoaService.CriarUsuario(this.cpfCnpj).then(
        res => {
          this.$swal('Aviso', res.data, res.status == 200 ? 'success' : 'warning');
        },
        err =>{
          this.$swal('Aviso', err.response.data, err.response.status === 400 ? 'warning' : 'error')
        }
      ).finally(() => {
        this.loading = false;
      })
    }
    else{
      this.cadastrarUsuario = true;
    }
  }

  ResetarSenha(executar: boolean){
    if(executar){
      this.loading = true;
      this.service.ResetarSenha(this.resetarModel).then(
        res => {
          this.$swal('Aviso', res.data, res.status == 200 ? 'success' : 'warning');
          setTimeout(() => {
            location.reload(true);
          }, 2500);
        },
        err => {
          this.$swal('Aviso', err.response.data, err.response.status === 400 ? 'warning' : 'error');
        }
      ).finally(() => {
        this.loading = false;
      })
    }
    else{
      this.resetarSenha = true;
    }
  }
}
</script>

<style scoped lang="css">
@media only screen and (max-width: 600px) {
  .appParallax {
    max-height: 250px !important;
  }
}

.background {
  background-image: url("../assets/images/bg.jpg");
}
.appParallax {
  max-height: 350px;
  width: 100%;
  background-size: cover;

  position: fixed;
  left: 0px;
  top: 0px;

  z-index: 0;
}
.appParallax__svg {
  z-index: 999;
  margin-top: 200px;
}
.appParallax__path {
  z-index: 0;
  fill: #fafafa;
}
</style>