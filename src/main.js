import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  apolloProvider: createProvider(),
  store,
  router,
  render: h => h(App)
}).$mount('#app')
