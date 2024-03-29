import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/index.scss'
import './permission'
import {i18n} from '@/i18n';
import token from '@/mixins/token'
Vue.mixin(token)

// uses element-ui
Vue.use(ElementUI)
// uses bootstrap-vue
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
