import App from './App'
import store from './store'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import http from './http'
import { navTo } from './utils'
Vue.prototype.$navTo = navTo
Vue.config.productionTip = false
Vue.prototype.$http = http
App.mpType = 'app'
const app = new Vue({
  ...App,
  store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
    store,
  }
}
// #endif
