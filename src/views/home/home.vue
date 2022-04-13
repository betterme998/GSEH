<template>
  <div id="home">
    <nav-bar ref="homenav" 
             class="home-nav"
             :style="{}"><template #center><p>购物车</p></template></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                  ref="tabControl1"
                  v-show="isTabFixed"
                  class="tab-control2"
                  :style="{top:homenavTop+'px'}"
                  @tabClick="tabClick"/>
    <scroll :data="$data"
            :probe-type="3" 
            :pull-up-load='true'
            class="wrapper" 
            ref="scroll" 
            @pullingUp="pullingUp"
            @scroll="cotentScroll">
      <home-swiper @imgload3='imgload3' :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view @imgload2="imgload2"/>
      <tab-control :titles="['流行', '新款', '精选']"
                  ref="tabControl2"
                  @tabClick="tabClick"/>
      <goods-list @homeimgload="imgload" :goods="showGoods"/>
    </scroll>
    <!-- 给组件添加点击 要加上原始的修饰符native -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import BackTop from "components/content/backTop/BackTop.vue"


// 没有用default导出，所以要大括号,导入数据请求
import {getHomeMultidata, getHomeGoods} from 'network/home';
import {debounce} from "common/utils"



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
      currentType:'pop',
      isShowBackTop:false,
      navAanTabHeight:0,
      tabOffsetTop:0,
      homenavTop:0,
      isTabFixed:false,
      clickItemtop0:0,
      clickItemtop:0,
      clickItemtop2:0,
      clickItemtop3:0
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
    Scroll,
    BackTop
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('home destroyed');
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
  mounted() {
    // 1.获取tabControl的offsetTop
    // 所有组件都有一个属性$el:用于获取组件中的元素的
    // 但是拿到的高度不包括元素内图片的高度，所以要在图片加载完成后计算出最终的offsetTop
    // this.$refs.tabControl.$el.offsetTop
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  deactivated() {
    
  },
  methods: {
    // 事件监听相关方法方法

    
    tabClick(index){
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      switch(index){
        case 0:
          this.currentType = "pop"
          if(-this.clickItemtop < this.tabOffsetTop){
            this.$refs.scroll.scrollTo(0,-this.tabOffsetTop,0)
          }else{
            this.$refs.scroll.scrollTo(0,this.clickItemtop,0)
          }
          break
        case 1:
          this.currentType = 'new'
          if(-this.clickItemtop2 < this.tabOffsetTop){
            this.$refs.scroll.scrollTo(0,-this.tabOffsetTop,0)
          }else{
            this.$refs.scroll.scrollTo(0,this.clickItemtop2,0)
          }
          break
        case 2:
          this.currentType = 'sell'
          if(-this.clickItemtop3 < this.tabOffsetTop){
            this.$refs.scroll.scrollTo(0,-this.tabOffsetTop,0)
          }else{
            this.$refs.scroll.scrollTo(0,this.clickItemtop3,0)
          }
          break
      }
      
      // 同步两个tabControl的点击

    },
    // 图片渲染完成重新计算bs高度
    imgload(){
      // this.debounce(this.$refs.scroll.refresh,50)
      // this.refresh()
      const refresh = debounce(this.$refs.scroll.refresh,10)
      refresh()
    },
    imgload2(){
      this.imgload()
    },
    imgload3(){
      this.imgload()
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      this.homenavTop = this.$refs.homenav.$el.offsetHeight;
      this.navAanTabHeight = this.$refs.tabControl1.$el.offsetHeight + this.$refs.homenav.$el.offsetHeight;

      // console.log(this.navAanTabHeight);
    },
    // 回到顶部
    // 修饰符.native修饰符什么时候使用？ 在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    // 监听滑动显示隐藏backTop按钮
    cotentScroll(position){
      // 1.判断Backtop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2.决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop

      // 3.保存goods单个类型移动高度
      // if(this.$refs.tabControl2.currentIndex = 0){
      //   // this.clickItemtop = position.y
      //   console.log(position.y);
      // }else if(this.$refs.tabControl2.currentIndex = 1){
      //   this.clickItemtop2 = position.y
      // }else{
      //   this.clickItemtop3 = position.y
      // }
      // console.log(this.clickItemto2);
      // console.log(this.$refs.tabControl2.currentIndex);
      switch(this.$refs.tabControl1.currentIndex){
        case 0:
          this.clickItemtop = position.y
          break
        case 1:
          this.clickItemtop2 = position.y
          break
        case 2:
          this.clickItemtop3 = position.y
          break
      }
      // this.clickItemtop0 = position.y



      

      

      
    },
    // 监听上拉加载更多
    pullingUp(){
      this.getHomeGoods(this.currentType)
    },

    // 监听滑动解决使用better-scroll，position:sticky;失效  待添加该功能
    // scrollY(position){
    //   this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    //   console.log(this.tabOffsetTop);
    // },

    // 网络请求相关代码下面
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(this.recommends);
        setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 50);
      })
    },
    getHomeGoods(type) {
      // 要请求第几页的数据不能写死，因为不好复用，到时候再次调用时还是从第1页开始
      const page = this.goods[type].page + 1
      // 首先把流行，新品，精选的第一页数据请求下来，其他的等上拉加载只请求
      getHomeGoods(type, page).then(res =>{
        // 拿到数据后保存，不然会销毁,因为要保存很多次的数据首页用push（...）
        if(res.data.list.length !==0){
          this.goods[type].list.push(...res.data.list)
        // 当数据添加进去后，page要加1
        this.goods[type].page += 1
        }
        
        // this.$nextTick(()=>{
        //   this.$refs.scroll.refresh()
        // })
        setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 50);
        // console.log(res);
        // 每次上拉加载后需要执行这个方法
        this.$refs.scroll.finishPullUp()
      })    
    }

  }
}
</script>

<style scoped>
  #home{
    /* padding-top: 13.75vw; */
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    
    /* 固定navbar */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control2{
   position: fixed;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .wrapper{
    height: 83.6267605vh;
    overflow: hidden;
    position: relative;
  }

</style>