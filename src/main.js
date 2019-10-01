import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
//导入所有组件
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(Mint)
//导入方法
import {getRequest} from './utils/api'
import {postRequest} from './utils/api'

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
