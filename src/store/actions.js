/*包含n个间接更新状态数据的方法的集合*/
import {
  RECEIVE_POSITION,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS ,
  SAVE_USER ,
  RESET_USER
} from './mutations-type'
import {
  reqPosition ,
  reqFoodCategorys ,
  reqShops ,
  reqUser ,
  reqLogout
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

  async resetUser ({commit}) {
    const result = await reqLogout();
    if(result.code === 0){
      //清空user
      commit(RESET_USER)
    }
  }
}
