<template>
    <master-page>

        <v-card v-if="item.id > 0">

            <v-toolbar class="elevation-0" color="primary">
                <v-toolbar-title style="color: white">Meus dados</v-toolbar-title>
                <v-spacer/>
                <v-toolbar-items>
                    <v-btn dark text @click="AlterarEndereco(false)">Alterar Endereço</v-btn>
                    <v-btn dark text @click="Salvar()">Salvar</v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-text class="py-6">
                <v-row class="my-3">
                    <v-col cols="12" sm="12" md="12" lg="3" style="display: flex; justify-content: center">
                        <center>
                            <v-card height="250" min-width="300" max-width="300" class="mb-5">
                                <v-row>
                                    <v-col class="mx-2">
                                        <v-skeleton-loader v-bind="attrs = {boilerplate: true}" max-width="300" max-height="150" type="image" v-if="!usuario.foto"/>
                                        <v-img v-if="usuario.foto" contain :src="`data:image/jpeg;base64,${usuario.foto}`" style="max-height: 160px ; max-width: 275px"></v-img>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="ma-2">
                                        <div>
                                            <div v-if="!usuario.foto" >
                                                <v-file-input prepend-icon="mdi-camera" accept="image/png, image/jpeg" show-size label="Foto" v-model="foto" outlined dense @change="LoadImage()"/>
                                            </div>
                                            <div class="text-right" v-else>
                                                <v-btn icon @click="RemoveImage()"><v-icon>mdi-close</v-icon></v-btn>                    
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </center>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="9" style="display: flex; justify-content: center; align-items: center">
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="usuario.login" label="Login" :counter="45" maxlength="45" dense outlined disabled/>
                            </v-col>                        
                            <v-col cols="12" sm="6" md="5">
                                <v-text-field v-model="item.nome" label="Nome" :counter="100" maxlenght="100" dense outlined disabled/>
                            </v-col>                        
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field v-model="item.cnpjCpf" label="CPF" dense outlined disabled/>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <v-text-field v-model="item.rg" label="RG" :counter="15" maxlenght="15" dense outlined disabled/>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field v-model="item.orgaoExpedido" label="Órgão Expedidor" :counter="15" maxlenght="15" dense outlined disabled/>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field type="date" v-model="item.dataExpedicao" label="Data Expedição" dense outlined disabled/>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field type="date" v-model="item.dataNascimento" label="Data Nascimento" dense outlined disabled/>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field v-model="item.sexo.nome" label="Sexo" dense outlined disabled/>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field v-model="item.qualificacao.profissaoId" label="Profissão" dense outlined disabled/>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field v-model="item.qualificacao.nacionalidadeId" label="Nacionalidade" dense outlined disabled/>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field v-model="item.qualificacao.rendaBruta" label="Renda Bruta" dense outlined disabled/>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field v-model="item.qualificacao.rendaLiquida" label="Renda Liquida" dense outlined disabled/>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field v-model="item.qualificacao.estadoCivilId" label="Estado Civil" dense outlined disabled/>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="item.email" label="Email principal" :counter="120" maxlenght="120" dense outlined/>
                            </v-col>
                            <v-col cols="12" sm="6" md="2">
                                <v-text-field v-model="item.telefone" label="Telefone principal" :counter="15" maxlenght="15" v-mask="mskTelefone" dense outlined/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field v-model="item.endereco.cep" label="CEP" v-mask="mskCep" @change="ObterEndereco(item.endereco.cep)" disabled dense outlined/>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                        <v-text-field v-model="item.endereco.logradouro" label="Logradouro" disabled dense outlined/>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field v-model="item.endereco.numero" label="Número" disabled dense outlined/>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field v-model="item.endereco.complemento" label="Complemento" disabled dense outlined/>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                        <v-text-field v-model="item.endereco.bairro" label="Bairro" disabled dense outlined/>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select v-model="item.endereco.estadoId" :items="estados" item-value="id" item-text="nome" label="Estado" disabled dense outlined/>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-select v-model="item.endereco.municipioId" :items="municipios" item-value="id" item-text="nome" label="Municipio" disabled dense outlined/>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <v-dialog persistent v-model="dialogAlterarEndereco" max-width="80vw">
            <v-card>
                <v-toolbar class="elevation-0" color="primary">
                    <v-toolbar-title style="color: white">Alterar Endereço</v-toolbar-title>
                </v-toolbar>
                <v-card-text class="mt-3">
                    <span style="font-size: 18px; color: red">Para alterar o endereço é necessário o envio de um comprovante de residência.</span>
                    <v-file-input class="mt-3" v-model="documentoFile" label="Documento" accept="application/pdf" dense outlined/>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn text color="primary" @click="dialogAlterarEndereco = false">Cancelar</v-btn>
                    <v-btn text color="primary" @click="AlterarEndereco(true)">Enviar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </master-page>
</template>

<script lang="ts">
import { Estado, Municipio, Pessoa, PessoaDocumento } from "@/core/models/geral";
import { PageBase } from "@/core/models/shared";
import { PessoaService } from "@/core/services/Clientes";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import jiff from 'jiff';
import { ArquivoService, EnderecoService } from "@/core/services/shared";
import { UsuarioService } from "@/core/services/geral";
import { Usuario } from "@/core/models/geral/Usuario";

@Component
export default class Home extends PageBase {
    loading: boolean = false;
    item: Pessoa = new Pessoa();
    itemOriginal!: Pessoa;
    service = new PessoaService();
    tabActive: any = {};
    mskTelefone = process.env.VUE_APP_MSK_TELEFONE;
    mskCep = process.env.VUE_APP_MSK_CEP;
    enderecoService = new EnderecoService();
    estados: Estado[] = [];
    municipios: Municipio[] = [];
    usuario: Usuario = new Usuario();
    usuarioOriginal!: Usuario;
    usuarioService = new UsuarioService();
    foto: any = null;

    dialogAlterarEndereco: boolean = false;
    documento = new PessoaDocumento();
    documentoFile: any = null;

    @Watch("item.endereco.estadoId")
    onEstadoIdChanged(value: number) {
        this.CarregarMunicipio(value);
    }

    @Watch("dialogAlterarEndereco")
    AlterarEnderecoWatch(){
        if(!this.dialogAlterarEndereco){
            this.documento = new PessoaDocumento();
        }
    }

    @Watch("documentoFile")
    async DocumentoWatch(){
        if(this.documentoFile == null){
            this.documento = new PessoaDocumento();
            return;
        }

        const arquivoService = new ArquivoService();
        let dados = await arquivoService.Ler(this.documentoFile);
        this.documento.nome = this.documentoFile.name;
        this.documento.tamanho = this.documentoFile.size / 1024;
        this.documento.tipo = this.documentoFile.type;
        this.documento.dados = dados.replace(/^[^,]*,/, "");
    }

    mounted(){
        
        this.Carregar();

        this.enderecoService.ObterEstados().then(
            res => {
                this.estados = res.data.items;
            },
            err => {
                if (!err.response) {
                    this.$swal("Aviso", "Não foi possível acessar a API", "error");
                } 
                else {
                    this.$swal("Aviso", err.response.data, "error");
                }
            }
        )
        
    }

    async LoadImage(){

        if (!this.foto)
            return;

        const arquivoService = new ArquivoService();
        const dados = await arquivoService.Ler(this.foto);
        this.usuario.foto = dados.replace(/^[^,]*,/, "");
    } 

    RemoveImage(){
        this.usuario.foto = null;
        this.foto = null;
    }

    CarregarMunicipio(estadoId: number){
        this.enderecoService.ObterMunicipios(estadoId).then(
            res => {
                this.municipios = res.data.items;
            },
            err => this.$swal('Aviso', err.message, 'error')      
        );
    }

    Carregar(){
        this.loading = true;
        this.service.ObterPorId(this.app.clienteId, "Endereco.Municipio.Estado, TipoPessoa, Sexo, Qualificacao.Profissao, Documentos").then(
            res => {
                this.item = new Pessoa(res.data);
                this.itemOriginal = jiff.clone(this.item);
                this.CarregarUsuario();
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

    CarregarUsuario(){
        this.usuarioService.ObterPorId(this.item.usuarioId).then(
            res => {
                this.usuario = new Usuario(res.data);
                this.usuarioOriginal = jiff.clone(this.usuario);
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

    ObterEndereco(cep){
        this.enderecoService.ObterPorCep(cep).then(
            res => {
                let endereco = res.data;
                if (endereco) {
                    this.item.endereco.logradouro = endereco.logradouro;
                    this.item.endereco.bairro = endereco.bairro;
                    this.item.endereco.municipio = endereco.municipio;
                    this.item.endereco.estado = endereco.estado;
                }
            },
            err => {
                this.$swal('Aviso', err.message, 'error');
            }
        );
    }

    AlterarEndereco(alterar: boolean){
        if(alterar){
            if(this.documentoFile == null){
                this.$swal("Aviso", "Nenhum arquivo foi inserido!", "warning");
            }
            else{
                this.documento.trocaEndereco = true;
                this.documento.pessoaId = this.item.id;
                this.item.documentos.push(this.documento);
                this.Salvar().then(
                    res => {
                        this.$swal("Aviso", 'Sua solicitação de alteração de endereço foi enviada com sucesso!', "success");
                        this.Carregar();
                    } 
                )
            }
        }
        else{
            this.dialogAlterarEndereco = true
        }
    }

    async Salvar(){
        let patchModel = jiff.diff(this.itemOriginal, this.item, false);

        await this.service.Salvar(patchModel, this.item.id).then(
            res => {
                this.SalvarUsuario();
            },
            err => {
                if (err.response.status == 400) {
                    this.$swal("Aviso", err.response.data.title, "warning");
                } else {
                    this.$swal("Aviso", err.response.data, "error");
                }
            }
        )
    }

    async SalvarUsuario(){
        let patchModel = jiff.diff(this.usuarioOriginal, this.usuario, false);

        await this.usuarioService.Salvar(patchModel, this.usuario.id).then(
            res => {
                if(!this.dialogAlterarEndereco){
                    this.$swal("Aviso", "Operação realizada com sucesso!", res.status == 201 || res.status == 200 ? "success" : "warning");
                    this.Carregar();
                }
            },
            err => {
                if (err.response.status == 400) {
                    this.$swal("Aviso", err.response.data.title, "warning");
                } else {
                    this.$swal("Aviso", err.response.data, "error");
                }
            }
        ).finally(() => {
            this.dialogAlterarEndereco = false;
        })
    }

}
</script>
