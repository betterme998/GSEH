<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
        :is-checked="isSelectAll" 
        class="check-button" 
        @click.native="checkClick"/>
      <div>全选</div>
    </div>
    
    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate">
      <!-- 这里显示商品个数 -->
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'
export default {
  name:"CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥'+ this.cartList.filter(item => {//过滤未选择的
        return item.checked
      }).reduce((preValue, item) =>{
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    // 全选按钮
    isSelectAll() {
      // return !(this.cartList.filter(item => !item.checked).length)
      if (this.cartList.length === 0){
        return false
      }
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      // 原来全部选中，让他全部不选中
      if(this.isSelectAll) {//
        this.cartList.forEach(item => item.checked = false)
      }else { //原先部分或全部不选中，让他全部选中
        this.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 12.5vw;
  padding:0 0 0 1.5625vw;
  background-color: #eee;
  position: relative;
  display: flex;
  align-content: center;
  /* line-height: 12.5vw; */
  font-size: 4vw;
}
.check-content{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 18.75vw;
}
.check-button {
  width: 6.25vw;
  height: 6.25vw;
}
.price{
  margin-left: 9.375vw;
  display: flex;
  align-items: center;
  flex: 1;
}
.calculate{
  width: 28.125vw;
  background-color: red;
  color: #fff;
  line-height: 12.5vw;
  text-align: center;
}

</style>