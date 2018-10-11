
import Vue from 'vue'
import router from './router'

import App from './App'
import store from './store'
import TopHeader from './components/top-header/top-header.vue'

//引入swiper的样式
import 'swiper/dist/css/swiper.min.css'




//top-header四個組件都使用  因此注册成全局组件
Vue.component('TopHeader',TopHeader)

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
  store
})

