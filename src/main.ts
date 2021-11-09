import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import VueCompositionAPI from '@vue/composition-api'
import { provide } from '@vue/composition-api';

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI)

new Vue({
  setup() {
    provide('vuex-store', store);
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
