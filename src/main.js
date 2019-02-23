import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
//导入vuex
import Vuex from 'vuex'
//全局注册组件
Vue.use(Vuex)
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
Vue.component('commont', commont)
//定义全局轮播图组件
import swiper from './components/swiper.vue'
Vue.component('swiper', swiper)
//指定post传递参数的格式
Vue.http.options.emulateJSON = true;
//导入全局缩列图组件
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)
//上拉加载 下拉刷新
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
let car = JSON.parse(localStorage.getItem('car') || '[]')
/* 全局创建Vuex.store实例 */
const store = new Vuex.Store({
  state: {
    /* 专门用来存储数据的 */
    car,
  },
  mutations: {
    /* 如果需要操作store中state数据，只能通过this.$store.state.*** */
    addToCar(state, goodInfo) {
      let flag = false
      state.car.some(item => {
        if (item.id == goodInfo.id) {
          item.count += parseInt(goodInfo.count)
          return flag = true
        }
      })
      if (!flag) {
        state.car.push(goodInfo)
      }
      // let index = state.car.findIndex(item => {
      //   if (item.id == goodInfo.id) {
      //     if (index == -1) {
      //       state.car.push(goodInfo)
      //     } else {
      //       state.car[index].count += parseInt(goodInfo.count)
      //     }
      //   }
      // })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateCount(state, goodInfo) {
      state.car.forEach(item => {
        if (item.id == goodInfo.id) {
          item.count = goodInfo.count
        }
        return true
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }

  },
  getters: {
    /* 只是负责对外提供数据 */
    totalCount(state) {
      let sum = 0
      state.car.forEach(item => sum += item.count)
      return sum
    },
    goodCount(state) {
      /* 手动创建一个addobj
      let addObj={88:5,87:9} */
      let addObj = {}
      state.car.forEach(item => {
        addObj[item.id] = item.count
      })
      return addObj
    }
  }

})




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
