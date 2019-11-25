import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,  // 将Vue-Router注入全局Vue实例
  store,   // 将Vuex注入全局Vue实例
}).$mount('#app')
