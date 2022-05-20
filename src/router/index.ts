import Vue from 'vue'
import VueRouter, { NavigationGuardNext, RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const verificaPerfil = (next: NavigationGuardNext<Vue>, isCliente: boolean) => { 

  // const sessionApp = JSON.parse(localStorage.sessionApp);

} 

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Home', component: () => import("../views/Home.vue") },
  { path: '/login', name: 'Login', component: () => import("../views/Login.vue") },
  { path: "/login/:token", name: "ConfirmaEmail", component: () => import("../views/Login.vue")},
  { path: "/login/resetSenha/:token", name: "ResetarSenha", component: () => import("../views/ResetarSenha.vue")},
  { path: '/pessoa', name: 'Pessoa', component: () => import("../views/MeusDados.vue") },
] 

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
