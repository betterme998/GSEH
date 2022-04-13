<template>
    <swiper ref="swiper" class="detail-swiper">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img ref="image" @load="DatailImageLoad" class="detailImg" :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name:'DetailSwiper',
  data(){
    return{
      ImageLoad:false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default(){
        return []
      }
    }
  },
  mounted(){
    
    // this.$refs.swiper.startTimer();
  },
  methods:{
    DatailImageLoad() {
      if(this.ImageLoad === false){
         // 当图片加载时再去获取轮播图的图片个数
        this.$refs.swiper.handleDom()
        this.$emit('imageLoad')
      }
      this.ImageLoad = true
      // console.log(this.$refs.image.length);
    }
  }
}
</script>

<style scoped>
  .detail-swiper{
    height: 93.75vw;
  }
  .detailImg{
    /* height:93.75vw; */
    width:100vw;
    /* object-fit: contain; */
  }
</style>