/*包含直接更新状态数据的n个方法的集合*/
import {
  RECEIVE_POSITION,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
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
}
