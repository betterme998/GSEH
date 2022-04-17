import { createStore } from 'vuex'
import  mutations from './mutations'
import actions from './actions'
import getters from './getters'
//2.创建Store对象
// 3.挂载Vue实例上
const state = {
  cartList: []
}
export default createStore({
  state,
  mutations,
  actions,
  getters
})
