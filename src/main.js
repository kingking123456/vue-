import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
//导入mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
//注册全局组件mint-ui
Vue.use(Mint);
//导入mui样式
import './libs/mui/css/mui.css'
//导入mui字体图标样式
import './libs/mui/css/icons-extra.css'
//导入初始化样式
import './style/common.css'
//api接口路径
Vue.http.options.root = 'http://www.lovegf.cn:8899/api/'
//格式化时间格式
import moment from 'moment'

//定义全局过滤器
Vue.filter('dataFormat', function (message, patter = "YYYY:MM:DD HH:ss:mm") {
  return moment(message).format(patter)
})
//全局注册评论组件
import commont from './components/commont.vue'
Vue.component('commont',commont)
//指定post传递参数的格式
Vue.http.options.emulateJSON = true;
//导入全局缩列图组件
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)





Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
