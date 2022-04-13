<template>
  <div id="detail">
    <detail-nav-bar ref="detailnavbat" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content2"
            :probe-type="3"
            :pull-up-load='true'
             ref="scroll"
             @scroll="contentScroll">
      <detail-swiper @imageLoad="imageLoad" :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :images-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends" @detailimgload="goodsimgload"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import { onUpdated } from 'vue'
// 混入练习 1.导入
import {itemListenerMoxin} from 'common/mixin'

import Scroll from 'components/common/scroll/Scroll.vue'

import {getDetail, GoodsInfo, Shop, GoodsParam, getRecommend} from "network/detail"
import {debounce} from "common/utils"
export default {
  name:'Detail',
  data(){
    return {
      iid:null,
      count:0,
      detailnavbarr:0,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends: [],
      themeTopYs:[],
      currentIndex:0
    }
  },
  // 练习混入 2.导入  这就被导入到mounted中了
  mixins: [itemListenerMoxin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
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

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.取出评论信息 有些没有评论所以要判断一下
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

      
    })

      // 3.请求推荐数据
    getRecommend().then(res =>{
      this.recommends = res.data.list
    })
  },
  mounted() {
    this.detailnavbarr = this.$refs.detailnavbat.$el.offsetHeight;
  },
  updated() {
    // 当拿到数据后会执行updated方法，对界面进行更新，updated里面保证是有值的

    
  },

  methods:{
    imageLoad(){
      const refresh = debounce(this.$refs.scroll.refresh,10)
      refresh()
    },
    imgLoad() {
      const refresh = debounce(this.$refs.scroll.refresh,10)
      refresh()
      this.themeTopYs = []
        // 获取各个标题的offsetTop
        // 根据最新的数据，对应的DOM是已经被渲染出来的
        // 但是图片是依然没有被加载完的
        // offsetTop值不对的时候一般都是图片的问题。
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop); //参数的offsetTop
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop); //评论的offsetTop
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop+this.detailnavbarr); //推荐的offsetTop
        console.log(this.themeTopYs);
    },
    goodsimgload() {
      const refresh = debounce(this.$refs.scroll.refresh,10)
      refresh()
    },
    titleClick(index) {
      this.themeTopYs = []
        // 获取各个标题的offsetTop
        // 根据最新的数据，对应的DOM是已经被渲染出来的
        // 但是图片是依然没有被加载完的
        // offsetTop值不对的时候一般都是图片的问题。
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop); //参数的offsetTop
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop); //评论的offsetTop
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop); //推荐的offsetTop
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
        console.log("dian");
    },
    contentScroll(position) {
      // 监听滚动 改变navbar样式
      // 1.获取y值
      const positionY = -position.y + this.detailnavbarr
      // console.log(this.themeTopYs[0]);
      // 2.positionY和主题中值进行对比
      // [0,7938,9120,9452]
      // positionY 在 0 和 7938之间， index = 0
      // positionY 在 7938 和 9120之间， index = 1
      // positionY 在 9120 和 9452之间， index = 2
      // positionY 在 9120 之后， index = 3
      let length = this.themeTopYs.length
      for(let i = 0; i < length; i++){
        // if ((positionY > this.themeTopYs[i]) && (positionY <this.themeTopYs[i+1])) {
        //   console.log(i+1);
        // }
        // 因为监听滚动比较频繁，所有在判断它处于那个位置之前，先判断他们是否一致，不一致再判断。
        if(this.currentIndex !== i &&(((i < length -1) && ((positionY >= this.themeTopYs[i]) && (positionY <this.themeTopYs[i+1]))) || ((i === length -1) && (positionY > this.themeTopYs[i])))) {
          // 用来记录当前位置
          this.currentIndex = i;
          // 传入Detailnabbar
          this.$refs.detailnavbat.currentIndex = this.currentIndex
        }
      }
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