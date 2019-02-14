import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import homeComponent from '../pages/home'
import memberComponent from '../pages/member'
import searchComponent from '../pages/search'
import shopcarComponent from '../pages/shopcar'
import newlistComponent from '../pages/newlist'
import newinfoComponent from '../pages/newinfo'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: homeComponent },
    { path: '/member', component: memberComponent },
    { path: '/search', component: searchComponent },
    { path: '/shopcar', component: shopcarComponent },
    { path: '/home/newlist', component: newlistComponent },
    { path: '/home/newinfo/:id', component: newinfoComponent }



  ],
  linkActiveClass: 'mui-active'
})
