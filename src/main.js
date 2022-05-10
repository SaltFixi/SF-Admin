import Vue from 'vue'
import App from './App.vue'
import plugin from './plugin/index'
import router from './router/index'
import store from './store/index'
import Antd from 'ant-design-vue'
import '@/assets/css/index.less'
import './mock/index'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(plugin, {
  // silent: true // 开启静默模式，控制台所有打印均消失
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
