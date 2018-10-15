
import Vue from 'vue'
import router from './router'
import { Button } from 'mint-ui'

import App from './App'
import store from './store'
import TopHeader from './components/top-header/top-header.vue'
import CartControl from './components/cart-control/cart-control.vue'

//引入swiper的样式
import 'swiper/dist/css/swiper.min.css'

//直接引入mock  执行一遍就行
import './mock/mockServer'

//top-header四個組件都使用  因此注册成全局组件
Vue.component('TopHeader',TopHeader)
Vue.component('CartControl',CartControl)
//将mint-ui的组件Button注册成全局组件  而它的的名字不能乱写
// 组件有一个name属性专门用来注册它的的名字
Vue.component( Button.name ,Button)

const vm = new Vue({
  el: '#app',
  /*  //  注册组件
  components: { App },
  //  将组件写成组件标签的形式 放入模板内
  template: '<App/>'   就相当于创建一个标签元素
  render: function(createElement){
    return createElement(App)
  }  */
  render: h => h(App),
  //注册路由器
  router,
  //注册store
  store,

})

