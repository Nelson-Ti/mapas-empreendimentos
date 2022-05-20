import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import VueTheMask from 'vue-the-mask';
import VueSweetAlert2 from 'vue-sweetalert2';

Vue.config.productionTip = false

import 'sweetalert2/dist/sweetalert2.min.css';

const sweetAlertOptions = {
  confirmButtonColor: '#F5621D',
  cancelButtonColor: '#E8AE0E',
};

Vue.use(VueTheMask);
Vue.use(VueSweetAlert2, sweetAlertOptions);

require('./components/');
import './assets/scripts/formatter'

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
