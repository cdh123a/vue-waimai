/*包含n个间接更新状态数据的方法的集合*/
import {
  RECEIVE_POSITION,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS ,
  SAVE_USER ,
  RESET_USER ,
  SAVE_GOODS ,
  SAVE_RATINGS ,
  SAVE_INFO ,
  INCRMENT_COUNT ,
  DECRMENT_COUNT ,
  CLEAR_CART_LIST
} from './mutations-type'
import {
  reqPosition ,
  reqFoodCategorys ,
  reqShops ,
  reqUser ,
  reqLogout ,
  reqGoods ,
  reqRatings ,
  reqInfo
} from '../api'


export default {
 async getPosition ({commit,state}) {
   //发送ajax请求
   const {latitude,longitude} = state ;
   const result = await reqPosition(`${latitude},${longitude}`)
   //触发mutations的对应回调
   if(result.code === 0){
     const position = result.data
     commit(RECEIVE_POSITION, {position})
   }
 },

  async getCategorys ({commit}) {
    //发送ajax请求
    const result = await reqFoodCategorys()
    //触发mutations的对应回调
    if(result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },

  async getShops ({commit,state}) {
    //发送ajax请求
    const {latitude,longitude } = state
    const result = await reqShops({latitude,longitude})
    //触发mutations的对应回调
    if(result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  //同步保存user
  saveUser ({commit},user) {
    commit(SAVE_USER,{user})
  },

  //请求userinfo  实现免登录  参数都在cookies里面的session
  async getUser ({commit}) {
    const result = await reqUser();
    if(result.code === 0){
      const user = result.data
      commit(SAVE_USER,{user})
    }
  },

  //请求退出登录
  async resetUser ({commit}) {
    const result = await reqLogout();
    if(result.code === 0){
      //清空user
      commit(RESET_USER)
    }
  },

  //保存mock返回的数据goods
  async saveGoods ({commit},callback) {
   const result = await reqGoods ();
   if(result.code === 0){
     const goods = result.data
     commit(SAVE_GOODS,{goods})
   }
   //到了这一步  状态数据已经更新完毕 执行回调
   typeof callback === 'function' &&  callback()
  },

  //保存mock返回的数据ratings
  async saveRatings ({commit},callback) {
    const result = await reqRatings ();
    if(result.code === 0){
      const ratings = result.data
      commit(SAVE_RATINGS,{ratings})
      typeof callback === 'function' &&  callback()
    }
  },

  //保存mock返回的数据info
  async saveInfo ({commit}) {
    const result = await reqInfo();
    if(result.code === 0){
      const info = result.data
      commit(SAVE_INFO,{info})
    }
  },

  //更新count
  updateCount ({commit},{isAdd,food}) {
   if(isAdd){
     //增加count
     commit(INCRMENT_COUNT,{food})
   }else{
     //减少count
     commit(DECRMENT_COUNT,{food})
   }
  },

  //清空cartCount
  clearCartList({commit}){
   commit(CLEAR_CART_LIST)
  }

}
