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
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"/>
    <toast :show="show" :massage="massage"/>
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
import DetailBottomBar from './childComps/DetailBottomBar.vue'
// 混入练习 1.导入
import {itemListenerMoxin,backTopMixin} from 'common/mixin'

import Scroll from 'components/common/scroll/Scroll.vue'

import {getDetail, GoodsInfo, Shop, GoodsParam, getRecommend} from "network/detail"
import {debounce} from "common/utils"

import Toast from "components/common/toast/Toast.vue"
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
      currentIndex:0,
      show:false,
      massage:''
    }
  },
  // 练习混入 2.导入  这就被导入到mounted中了
  mixins: [itemListenerMoxin,backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast,
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
  beforeUnmount() {
    this.imageLoad = null;
    this.imgLoad = null
    this.goodsimgload = null
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
      // 以空间换时间
      // 下面的判断复制，可以在positionY后面加入一个最大值Number.MAX_VALUE ,不循环最后一项。 
      // for(let i = 0; i < length-1; i++){
      //   if((positionY > this.themeTopYs[i]) && (positionY <this.themeTopYs[i+1])) {
      //     this.currentIndex = i;
      //     this.$refs.detailnavbat.currentIndex = this.currentIndex
      //   }
      // }
      for(let i = 0; i < length; i++){
        // 因为监听滚动比较频繁，所有在判断它处于那个位置之前，先判断他们是否一致，不一致再判断。
        if(this.currentIndex !== i &&(((i < length -1) && ((positionY >= this.themeTopYs[i]) && (positionY <this.themeTopYs[i+1]))) || ((i === length -1) && (positionY > this.themeTopYs[i])))) {
          // 用来记录当前位置
          this.currentIndex = i;
          // 传入Detailnabbar
          this.$refs.detailnavbat.currentIndex = this.currentIndex
        }
      }

      // 1.判断Backtop是否显示,用到混入
      this.listanShoBackTop(position)
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]; //图片
      product.title = this.goods.title; //标题
      product.desc = this.goods.desc; //描述
      product.price = this.goods.realPrice; //价格
      product.iid = this.iid; //商品唯一标识

      // 将商品添加到购物车里
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart',product).then(res => {
        this.show = true;
        this.massage = res;
        setTimeout(() => {
          this.show = false
        },1500)
      }) //因为有多种情况 所以用action

      // 3.添加到购物车成功
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
    overflow: hidden;
  }
  .content2{
    height: 83.62676056388vh;
    overflow: hidden;
  }
</style>