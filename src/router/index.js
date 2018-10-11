 // 注册路由
import Vue from 'vue'
import VueRouter from 'vue-router'

 import Msite from '../pages/msite/msite.vue'
import Order from '../pages/order/order.vue'
import Profile from '../pages/profile/profile.vue'
import Search from '../pages/search/search.vue'
import Login from '../pages/login/login.vue'

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
      path : '/',
      redirect : '/msite'
    }
  ]
})
