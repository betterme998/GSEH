import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default {
  // mutations唯一的目的就是修改state中状态
    // mutations中的每个方法尽可能完成的事件比较单一一点
    // 有判断逻辑就有两种情况甚至更多，这时就要把它放到action里面
    // 数量加一
    [ADD_COUNTER](state, payload) {
      payload.count++
    },
    // 添加商品
    [ADD_TO_CART](state, payload) {
      // 给商品添加一个属性，来记录选中与不选中
      payload.checked = true
      payload.buttonshow = false
      state.cartList.push(payload)
    }
}