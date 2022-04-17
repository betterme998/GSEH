<template>
<div class="goods-box">
  <div class="goods">
    <goods-list-item @homeimgload="imgload" @detailimgload="detailimgload" v-for="item in goods" :key="item.iid" :goods-item="item"/>
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
  },
  methods:{
    // imgload(){
    //  if(this.$route.path.indexOf('/home')){
    //    this.$emit('detailimgload')
    //    console.log(this.$route.path);
    //   }else if(this.$route.path.indexOf('/detail')) {
    //     this.$emit('homeimgload')
    //   }
    // }
    imgload(){
       this.$emit('homeimgload')
       
    },
    detailimgload(){
      this.$emit('detailimgload')
    }
  }
}
</script>

<style>
.goods-box{
  display: flex;
  justify-content: center;
  background-color: #EFEFED;
  border-radius: 3.5vw 3.5vw 0 0;
  padding:1.3vw 0;
}
.goods{
   /* column-count: 2;
   column-gap: 1.875vw; */
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   padding: .9375vw;
}
</style>