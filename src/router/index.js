 // 注册路由
import Vue from 'vue'
import VueRouter from 'vue-router'

const Msite  = () => import('../pages/msite/msite.vue')
const Order  = () => import('../pages/order/order.vue')
const Profile  = () => import('../pages/profile/profile.vue')
const Search  = () => import('../pages/search/search.vue')
const Login  = () => import('../pages/login/login.vue')
const Shop  = () => import('../pages/shop/shop.vue')

 /*import Profile from '../pages/profile/profile.vue'
import Search from '../pages/search/search.vue'
import Order from '../pages/order/order.vue'
import Msite from '../pages/msite/msite.vue'
import Login from '../pages/login/login.vue'
import Shop from '../pages/shop/shop.vue'
 */
 import ShopGoods from '../pages/shop/shop-goods/shop-goods.vue'
 import ShopRatings from '../pages/shop/shop-ratings/shop-ratings.vue'
 import ShopInfo from '../pages/shop/shop-info/shop-info.vue'


 import A from '../pages/test/A.vue'
 import B from '../pages/test/B.vue'
 import B1 from '../pages/test/B1.vue'
 import B2 from '../pages/test/B2.vue'

 Vue.use(VueRouter)
 const router =  new VueRouter({
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
    },

    {
      path: '/a',
      component: A
    },
    {
      path: '/b',
      component: B,
      children: [
        {
          path: '/b/b1',
          component: B1
        },
        {
          path: '/b/b2',
          component: B2
        },
      ]
    },
  ]
})

 //全局守卫
 /* to 目标守卫
    from  当前守卫
    next函数，控制导航 ：  1.拦截
                           2.通过
                           3.跳转中断
    next（） 允许通过
    next（路由名）  跳转到目标路由
    next（false） 或者 不调用next  跳转中断
                           * */

 router.beforeEach((to,from,next) => {
   //当用户请求a或者b路由
   //当用户没有登录    直接跳转到login路由
   //拿到state  到main入口文件 将store保存在Vue函数对象上  Vue.store = store
   if(to.path === '/a'|| to.path==='/b'){
     if(!Vue.store.state.user._id){
       return next('/login')
     }
   }

   //请求其余的组件  放行  不然所有的组件请求都被拦截 没有啥显示
   next()
 })

 export default router ;
