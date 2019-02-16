import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import homeComponent from '../pages/home'
import memberComponent from '../pages/member'
import searchComponent from '../pages/search'
import shopcarComponent from '../pages/shopcar'
import newlistComponent from '../pages/newlist'
import newinfoComponent from '../pages/newinfo'
import photoComponent from '../pages/photolist'
import  photoinfoComponent from '../pages/photoInfo'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: homeComponent },
    { path: '/member', component: memberComponent },
    { path: '/search', component: searchComponent },
    { path: '/shopcar', component: shopcarComponent },
    { path: '/home/newlist', component: newlistComponent },
    { path: '/home/newinfo/:id', component: newinfoComponent },
    { path: '/home/photolist',component: photoComponent },
    { path: '/home/photoinfo/:id',component: photoinfoComponent }



  ],
  linkActiveClass: 'mui-active'
})
