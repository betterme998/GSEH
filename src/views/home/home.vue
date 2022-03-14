<template>
  <div id="home">
    <nav-bar class="home-nav"><template #center><p>购物车</p></template></nav-bar>
    <scroll :data="$data" class="wrapper" ref="scroll">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view @imgload2="imgload2"/>
      <tab-control class="tab-control" 
                  :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"/>
      <goods-list @imgload="imgload" :goods="showGoods"/>
    </scroll>

    <ul>
      <li>12888888888</li>
      <li>1888888882</li>
      <li>1888888882</li>
      <li>1888888882</li>
      <li>1888888882</li>
      <li>1888888882</li>
      <li>1888888882</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
      <li>12</li>
    </ul>
  </div>
</template>

<script>
// 导入home中的封装过的子组件轮播图
import HomeSwiper from "./childComps/HomeSwiper.vue"
import HomeRecommendView from "./childComps/HomeRecommendView.vue"
import FeatureView from "./childComps/FeatureView.vue"

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from "components/content/TabControl/TabControl.vue"
import GoodsList from "components/content/goods/GoodsList.vue"
import Scroll from "components/common/scroll/Scroll.vue"


// 没有用default导出，所以要大括号,导入数据请求
import {getHomeMultidata, getHomeGoods} from 'network/home';



export default {
  name:'home',
  data() {
    return {
      banners:[],
      recommends:[],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType:'pop'
    }
  },
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    GoodsList,
    Scroll
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // created函数比较特殊，当我们在比较特的函数做事情的时候最好只在里面写主要逻辑，更加详细的逻辑不要再里面写
        // 这意味这create只写网络请求代码，里面具体请求代码，我们放到methods里面，

    // 1请求多个数据,并保存下来,
    
    this.$nextTick(()=>{
      this.getHomeMultidata()
    })

    // 首先请求三类商品第一页数据,并保存下来保存到goods中
    // this.getHomeGoods('pop')
    // this.getHomeGoods('new')
    // this.getHomeGoods('sell')
    this.$nextTick(()=>{
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    })
  },
  methods: {
    // 事件监听方法
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = "pop"
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    imgload(){
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 150);
    },
    imgload2(){
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 150);
    },

    // 网络请求相关代码下面
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(this.recommends);
        setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 150);
      })
    },
    getHomeGoods(type) {
      // 要请求第几页的数据不能写死，因为不好复用，到时候再次调用时还是从第1页开始
      const page = this.goods[type].page + 1
      // 首先把流行，新品，精选的第一页数据请求下来，其他的等上拉加载只请求
      getHomeGoods(type, page).then(res =>{
        // 拿到数据后保存，不然会销毁,因为要保存很多次的数据首页用push（...）
        this.goods[type].list.push(...res.data.list)
        // 当数据添加进去后，page要加1
        this.goods[type].page += 1
        // this.$nextTick(()=>{
        //   this.$refs.scroll.refresh()
        // })
        setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 150);
        console.log(res);
        // console.log(11)
      })    
    }

  }
}
</script>

<style scoped>
  #home{
    padding-top: 13.75vw;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 固定navbar */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .wrapper{
    height: 83.6267605vh;
    overflow: hidden;
  }
  .tab-control{
    position: sticky;
    top: 13.75vw;
  }
</style>