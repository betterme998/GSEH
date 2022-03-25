<template>
  <swiper ref="swiper">
    <swiper-item  v-for="item in banners" :key="item.title" class="swiper-item">
      <a :href="item.link">
        <img @load="imgload" class="imgs" :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 导入轮播图组件
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: "HomeSwiper",
  data(){
    return{
    }
  },
  props: {
    banners:{
      type:Array,
      dafault() {
        return []
      }
    }
  },
  data(){
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  } ,
  methods:{
    imgload() {
      if(!this.isLoad){
          this.$emit('imgload3')
          this.$refs.swiper.handleDom();
          this.isLoad = true
      }
    }
  }
}
</script>

<style>
.swiper-item img{
  width: 100vw;
}
</style>