<template>
  <swiper>
    <swiper-item  v-for="item in banners" :key="item.title" class="swiper-item">
      <a :href="item.link">
        <img class="imgs" :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 导入轮播图组件
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: "HomeSwiper",
  props: {
    banners:{
      type:Array,
      dafault() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  } 
}
</script>

<style>
.swiper-item img{
  width: 100vw;
}
</style>