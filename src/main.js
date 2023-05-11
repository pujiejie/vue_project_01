import Vue from 'vue'
import App from './App.vue'
import router from './router/permission'

import store from './store'

import 'animate.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import 'normalize.css'



Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
