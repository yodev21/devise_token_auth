import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
Vue.config.productionTip = false
axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/vuejs-http-d8263/databases/(default)/documents"
// axios.defaults.headers.common["Authorization"] = "jajajaja";
// axios.defaults.headers.get["Accept"] = ""
new Vue({
  render: h => h(App),
}).$mount('#app')
