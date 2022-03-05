<template>
<div class="goods-box">
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.iid" :goods-item="item"/>
  </div>
</div>
</template>

<script>
import GoodsListItem from "./GoodesListItem.vue"

export default {
  name: "GoodsList",
  props: {
    goods:{
      type:Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style>
.goods-box{
  display: flex;
  justify-content: center;
  background-color: #EFEFED;
  border-radius: 3.5vw;
  padding:1.3vw 0;
}
.goods{
   column-count: 2;
   column-gap: 1.875vw;
}
</style>