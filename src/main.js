import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goodsPage from 'components/goods/goods'
import ratingsPage from 'components/ratings/ratings'
import sellerPage from 'components/seller/seller'

import 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)
const routes = [
  {
    path: '/goods',
    component: goodsPage
  },
  {
    path: '/ratings',
    component: ratingsPage
  },
  {
    path: '/seller',
    component: sellerPage
  }
]
const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
