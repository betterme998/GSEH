<template>
  <div>
    <nav-bar class="nav-bar">
      <template #center><p>购物车({{length}})</p></template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"
import CartList from "./childComps/CartList.vue"
import CartBottomBar from "./childComps/CartBottomBar.vue"

// vuex中的知识点，可以把getters里的方法直接拿过来用，可以去看vuex文档getter
import { mapGetters } from 'vuex'
import {debounce} from "common/utils"
export default {
  name:'cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // ...mapGetters(['cartLength']) //可以写数组，也可以写对象
    ...mapGetters({
    // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    length: 'cartLength'
    })
  },
  methods() {
    const refresh = debounce(this.$refs.scroll.refresh,10)
      refresh()
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  font-size: 5vw;
  color: #fff;
}
</style>