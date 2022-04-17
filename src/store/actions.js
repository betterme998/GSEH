import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default {
      // 通过action进行分发，
      addCart(context, payload) { //action第一个参数 context 上下文的意思这里可以看成 state
        return new Promise((resolve, reject) => {
          // payload新添加的商品
        // let oldProduct = null;
        // for(let item of state.cartList){//如果相等就说明 cartlist里面已经有这种商品，这是把它给oldProduct
        //   if(item.iid === payload.iid){
        //     oldProduct = item
        //   }
        // }
        // 1.查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)//find 查找
  
        if(oldProduct) {
        // 2.判断oldproduct是否有值，如果有就记录商品数量加一
          // oldProduct.count +=1
          context.commit(ADD_COUNTER,oldProduct)
          resolve('当前商品数量+1')
        }else { //没有就在payload中定义商品数量为1.并加入到cartList
          payload.count = 1
          // state.cartList.push(payload)
          context.commit(ADD_TO_CART,payload)
          resolve('添加了新的商品')
        }
        })
        
      }
}