/*ajax请求回来的数据  多个组件同时使用的数据*/
export default {
  latitude : 40.10038 ,
  longitude : 116.36867 ,
  /*根据返回数据的类型来确定初始化容器的类型*/
  position : { },
  categorys : [ ],
  shops : [ ],

  //登录界面 返回响应数据user
  user : { } ,

  goods : [ ],
  ratings : [ ],
  info : { },

  //初始化购物车列表显示的购买食物数组
  cartList: [],
}
