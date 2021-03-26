import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from '@/router/index'
import './assets/icons/iconfont.css'
import './assets/element-ui/lib/theme-chalk/index.css'
import store from './vuex/index'
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  ElementUI,
  store,
  router,
  render:h=>h(App)
}).$mount('#app')
