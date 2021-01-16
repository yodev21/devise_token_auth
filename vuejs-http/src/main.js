import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false
const vuetify = new Vuetify
Vue.use(Vuetify)
store.dispatch('autoLogin');
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
