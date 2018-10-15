/*包含直接更新状态数据的n个方法的集合*/

import Vue from 'vue'
import {
  RECEIVE_POSITION,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  SAVE_USER,
  RESET_USER ,
  SAVE_GOODS ,
  SAVE_RATINGS ,
  SAVE_INFO ,
  INCRMENT_COUNT ,
  DECRMENT_COUNT
} from './mutations-type'

export default {
  //直接更新state的position
  [RECEIVE_POSITION] (state ,{position}) {
    state.position = position
  },
  //直接更新state的categorys
  [RECEIVE_CATEGORYS] (state ,{categorys}) {
    state.categorys = categorys
  },
  //直接更新state的shops
  [RECEIVE_SHOPS] (state ,{shops}) {
    state.shops = shops
  },
  //保存user
  [SAVE_USER] (state ,{user}) {
    state.user = user
  },

  //清空user
  [RESET_USER] (state) {
    state.user = { }
  },

  //保存goods
  [SAVE_GOODS] (state,{goods}) {
    state.goods = goods
  },

  //保存ratings
  [SAVE_RATINGS] (state,{ratings}) {
    state.ratings = ratings
  },

  //保存info
  [SAVE_INFO] (state,{info}) {
    state.info = info
  },

  //增加count
  [INCRMENT_COUNT] (state ,{food}) {
    //由于food是state.goods里面的一部分数据  已经进行过数据绑定 改变food 就能改变state.foods
    //food是后来添加的count  初始时没有
    if(food.count){
      food.count ++ ;
    }else{
      //初始数据劫持（绑定） count时候来添加的属性  没有经过数据劫持 因此count更新并不会引起组件更新  因此需要对count初始数据绑定  使用$set(vm对象的方法) 或者set(Vue对象的方法)
      //food.count = 1
      Vue.set(food , 'count' , 1)

      //购物车食物列表只显示 CartControl点击一次的食物 点击两次只是增加count 不会增加显示次数
      state.cartList.push(food)
    }

  },

  //减少count
  [DECRMENT_COUNT] (state,{food}) {
    //判断    左边动画过程中 快速点击 count减少的bug
    if(food.count){
      food.count--
      if(food.count ===0 ){
        //为0时 将购物车食物列表中的count为0的食物从数组内移除
        const index = state.cartList.findIndex( item => item === food)
        state.cartList.splice(index,1)
      }
    }
  }
}
