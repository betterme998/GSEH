<template>
  <div class="cart-list">
    <scroll class="cart-list-content"
          :probe-type="3"
          :pull-up-load='true'
          ref="scroll">
      <div>
        <cart-list-item v-for="(item, index) in cartList" 
                      :key="index" 
                      :item-info="item"/>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from "components/common/scroll/Scroll.vue"
import CartListItem from "./CartListItem.vue"

export default {
  name:'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  components:{
    Scroll,
    CartListItem
  },
  activated(){
    this.$refs.scroll.refresh()
  },
  activated() {
    for(let i =0; i<this.cartList.length;i++){
      this.cartList[i].buttonshow = false
    }
  },
}
</script>

<style scoped>
.cart-list-content {
  height: 76.5845074255vh;
  overflow: hidden;
  position: relative;
}
</style>