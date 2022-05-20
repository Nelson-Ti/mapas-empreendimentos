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
            <v-form @submit.prevent="Confimar()">
              <v-card class="elevation-1">
                <v-card-title>
                  <v-row class="pa-5" align="center" justify="center">
                    <v-img src="../assets/images/logo.png" max-width="300" />
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-text-field label="Nova Senha" prepend-icon="mdi-lock" v-model="acesso.senhaNova" @click:append-outer="() => esconderSenha1 = !esconderSenha1" 
                    :type="esconderSenha1 ? 'password' : 'text'" :append-outer-icon="esconderSenha1 ? 'mdi-eye' : 'mdi-eye-off'"/>
                    <v-text-field label="Repetir Senha" prepend-icon="mdi-lock" v-model="repetirSenha" @click:append-outer="() => esconderSenha2 = !esconderSenha2" 
                    :type="esconderSenha2 ? 'password' : 'text'" :append-outer-icon="esconderSenha2 ? 'mdi-eye' : 'mdi-eye-off'"/>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn type="submit" color="primary" width="35%" :loading="loading">Redefinir Senha</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { AutenticadorService } from "@/core/services/geral";
import router from "@/router";
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  public loading: boolean = false;
  esconderSenha1: boolean = true;
  esconderSenha2: boolean = true;
  acesso: any = {
    login: "",
    senhaNova: "",
    token: ""
  };
  fieldRules: any[] = [(v: any) => !!v || "Campo obrigatório"];
  service = new AutenticadorService();
  repetirSenha: string = "";

  mounted(){
    this.acesso.token = this.$route.params.token;
  }

  Confimar() {
    if(this.acesso.senhaNova != this.repetirSenha){
        this.$swal('Aviso', "As senhas informadas não são iguais!", 'warning');
    }
    else{
        this.loading = true;
        this.service.ResetarSenha(this.acesso).then(
            res => {
                this.$swal('Aviso', res.data, res.status == 200 ? 'success' : 'warning');
                this.$router.push({name:"Login"})
            },
            err => {
                this.$swal('Aviso', err.response.data, err.response.status === 400 ? 'warning' : 'error');
            }
        ).finally(() => {
            this.loading = false;
        });
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