<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content2"
            :probe-type="3"
            :pull-up-load='true'
             ref="scroll">
      <detail-swiper @imageLoad="imageLoad" :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'

import Scroll from 'components/common/scroll/Scroll.vue'

import {getDetail, GoodsInfo, Shop} from "network/detail"
export default {
  name:'Detail',
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      // console.log(res);
      const data = res.result;
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      
      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
      // console.log(this.shop);

    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content2{
    height: 92.253521126vh;
    overflow: hidden;
  }
</style>