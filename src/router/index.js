 // 注册路由
import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from '../pages/msite/msite.vue'
import Order from '../pages/order/order.vue'
import Profile from '../pages/profile/profile.vue'
import Search from '../pages/search/search.vue'
import Login from '../pages/login/login.vue'
import Shop from '../pages/shop/shop.vue'
 import ShopGoods from '../pages/shop/shop-goods/shop-goods.vue'
 import ShopRatings from '../pages/shop/shop-ratings/shop-ratings.vue'
 import ShopInfo from '../pages/shop/shop-info/shop-info.vue'

 Vue.use(VueRouter)
export default new VueRouter({
  routes : [
    {
      path : '/msite',
      component : Msite ,
      meta : {
        show :true
      }
    },
    {
      path : '/order',
      component : Order ,
      meta : {
        show :true
      }
    },
    {
      path : '/search',
      component : Search,
      meta : {
        show :true
      }
    },
    {
      path : '/profile',
      component : Profile,
      meta : {
        show :true
      }
    },
    {
      path : '/login',
      component : Login
    },
    {
      path : '/shop',
      component : Shop ,
      children : [
        {
          path : '/shop/goods',
          component : ShopGoods
        },
        {
          path : '/shop/ratings',
          component : ShopRatings
        },
        {
          path : '/shop/info',
          component : ShopInfo
        },
        {
          path : '/shop',
          redirect: '/shop/goods'
        }
      ]
    },
    {
      path : '/',
      redirect : '/msite'
    }
  ]
})
