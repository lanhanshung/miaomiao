import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入字体图标样式
import './assets/css/icon.css'

// 引入全局样式
import './assets/css/common.css'

// 引入axios模块
import axios from 'axios'
// 在原型上添加
Vue.prototype.axios=axios

// 引入scroll组件
import Scroller from '@/components/Scroll'
//注册全局组件
Vue.component("Scroller",Scroller);

// 引入loading组件
import Loading from '@/components/Loading'
//注册全局组件
Vue.component("Loading",Loading);

Vue.config.productionTip = false

// 定义全局过滤器
Vue.filter('setWH',(url,arg)=>{
  
  return url.replace(/w\.h/,arg)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
