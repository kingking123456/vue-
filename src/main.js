import Vue from 'vue'
import App from './App'
import router from './router'
//导入mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
//注册全局组件mint-ui
Vue.use(Mint);
//导入mui样式
import './libs/mui/css/mui.css'



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
