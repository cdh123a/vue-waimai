/*包含直接更新状态数据的n个方法的集合*/
import {
  RECEIVE_POSITION,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  SAVE_USER,
  RESET_USER
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


}
