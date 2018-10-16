/*包含n个 getter 计算属性的方法集合*/
export default {
 //购物车显示的购买食物的列表
  cartList (state) {
    const arr = [];
    state.goods.forEach( food => {

    })
    return arr ;
  },


  //购物车显示的count总数
  totalCount (state) {
    return state.cartList.reduce( (prve,currFood) => prve + currFood.count ,0)
  },

  //购物车总价格
  totalPrice (state) {
    return state.cartList.reduce( (prve,currFood) => prve + currFood.count*currFood.price ,0)
  },

  //生成好评的总数
  tatalGoodContent (state){
    return state.ratings.reduce((prve,curr) => prve+(curr.rateType === 0 ? 1 : 0),0)
  }
}
