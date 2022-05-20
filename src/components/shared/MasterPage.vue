<template>
    <v-app>
        <v-card flat>
            <v-app-bar color="primary" dark flat extended src="../../assets/images/bg.jpg" extension-height="250">                
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"/>
                
                <v-spacer/>
                
                <v-btn @click="MudarTema()" icon>
                    <v-icon color="'white'">mdi-invert-colors</v-icon>
                </v-btn> 
                
                <v-btn @click="FullScreen()" icon>
                    <v-icon color="white">mdi-fullscreen</v-icon>
                </v-btn>
                
                <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon>
                            <v-icon color="white">mdi-account</v-icon>
                        </v-btn>
                    </template>
                    
                    <v-list dense>
                        <v-list-item @click="AlterarSenha()">
                            <v-list-item-icon><v-icon>mdi-lock-reset</v-icon></v-list-item-icon>
                            <v-list-item-title>Alterar Senha</v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="Logout()">
                            <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
                            <v-list-item-title>Sair</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

            </v-app-bar>  

            <v-card class="mx-md-5" style="margin-top: -250px;">
                <v-toolbar flat class="grey--text" v-if="icone">
                    <v-toolbar-title>
                            <div v-if="icone" class="d-flex mb-1">
                                <div class="d-flex pt-3">
                                    <v-avatar color="white" size="40" class="elevation-2">
                                        <v-icon size="25" color="primary">{{ icone }}</v-icon>
                                    </v-avatar>
                                </div>

                                <div class="pl-3 pt-3">
                                    <h4 class="font-weight-medium">{{ titulo }}</h4>
                                    <div class="caption">{{ subTitulo }}</div>
                                </div>
                            </div>
                        </v-toolbar-title>
                        <v-spacer/>
                        <slot name="menu"></slot>
                </v-toolbar>
                <v-divider v-if="icone"/>

                <div v-if="!icone"> 
                    <slot/>
                </div>

                <v-card-text v-else> 
                    <slot/>
                </v-card-text>
            </v-card>
        </v-card>

        <v-navigation-drawer v-model="drawer" fixed temporary width="300">

            <template v-slot:prepend>
                <v-list-item>
                    <v-list-item-avatar>
                        <img v-if="app.usuarioFoto" :src="`data:image/gif;base64,${app.usuarioFoto}`"/>
                        <v-icon v-else>mdi-account</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{app.usuarioNome}}</v-list-item-title>
                        <v-list-item-subtitle>SCAE</v-list-item-subtitle>                    
                    </v-list-item-content>
                </v-list-item>
            </template>

            <v-divider/>

            <v-list nav dense>
                <v-list-item-group active-class="blue-grey--text text--accent-4">
                    <v-list-item to="/">
                        <v-list-item-icon> <v-icon>mdi-home</v-icon> </v-list-item-icon>
                        <v-list-item-content> <v-list-item-title>Principal</v-list-item-title> </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>

                <v-list-group prepend-icon="mdi-cash-multiple">
                    <template v-slot:activator>
                        <v-list-item-title>Financeiro</v-list-item-title>
                    </template>
                    
                    <div>
                        <v-list-item @click="dialogListaContratos = true">
                            <v-list-item-title>Meus Contratos</v-list-item-title>
                        </v-list-item>
                    </div>
                </v-list-group>

                <v-list-group prepend-icon="mdi-cog">
                    <template v-slot:activator>
                        <v-list-item-title>Configuração</v-list-item-title>
                    </template>
                    
                    <div>
                        <v-list-item @click="dialogMeusDados = true">
                            <v-list-item-title>Meus Dados</v-list-item-title>
                        </v-list-item>
                    </div>
                </v-list-group>

                <v-list-item @click="AbrirWhatsApp()">
                    <v-list-item-icon> <v-icon>mdi-help-circle</v-icon> </v-list-item-icon>
                    <v-list-item-content> <v-list-item-title>Preciso de ajuda</v-list-item-title> </v-list-item-content>
                </v-list-item>

            </v-list>

            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block color="error" @click="Logout()">SAIR</v-btn>
                </div>
            </template>

        </v-navigation-drawer>

        <alterar-senha v-model="dialogAlterarSenha" @fechou="dialogAlterarSenha = false"/>
        <meus-dados v-model="dialogMeusDados" @fechou="dialogMeusDados = false"></meus-dados>
        <lista-contratos v-model="dialogListaContratos" @fechou="dialogListaContratos = false"></lista-contratos>
    </v-app>
</template>

<script lang="ts">
import { PageBase } from "@/core/models/shared";
import { AssinanteService } from "@/core/services/Base";
import { UsuarioService } from "@/core/services/geral";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class MasterPage extends PageBase {
    @Prop() private icone!: string;
    @Prop() private titulo!: string;
    @Prop() private subTitulo!: string;

    drawer:boolean = false;
    active:boolean = false;
    dialogAlterarSenha: boolean = false;
    dialogMeusDados:boolean = false;
    dialogListaContratos:boolean = false;

    mounted() {
        this.$vuetify.theme.dark = this.app.temaEscuro;
    }

    FullScreen(){
        let elem = document.documentElement;
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } 
        else {
            document.exitFullscreen();
        }
    } 

    AbrirWhatsApp(){

        new AssinanteService().WhatsApp(this.app.assinanteId).then(
            res => {
                let numero = res.data;
                numero = numero.replaceAll("-", "");
                numero = numero.replaceAll(" ", "");
                numero = numero.trim();
                window.open(`https://api.whatsapp.com/send?phone=55${numero}`);
            },
            err =>{
                this.$swal('Aviso', err.message, 'error')
            }
        )
    }

    MudarTema(){
        const usuarioService = new UsuarioService();
        usuarioService.MudarTema(this.app.usuarioId).then(
            res => super.MudarTema(res.data),
            err => this.$swal('Aviso', err.message, 'error')
        );
    };   
    
    AlterarSenha(){
        this.dialogAlterarSenha = true;
    };

    Logout() {
        localStorage.clear();
        this.$vuetify.theme.dark = false;
        this.$router.push({name: 'Login'});
    };
}
</script>

<style >

    .drawerSize{
        size: 80%;
    }

    .col-12 {
        padding-top: 5px !important;
        padding-bottom: 0px !important;
    }

    .buscaRapida{
        margin-top: 25px !important; 
        margin-right: 20px;
    }

</style>

