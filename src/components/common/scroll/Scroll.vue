<template>
  <div ref="scroll_wrapper" class="wrapper">
    <!-- 要实现better-scroll还要一个div包裹内容 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 所有滚动的东西,用这个
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)
export default {
  name: 'Scroll',
  data() {
    return{
      scroll:null
    }
  },
  props:{
    data:{
      type:Object,
      default() {
        return null
      }
    },
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  // 等·挂载后它就行了， 忘了看官网
  mounted() {
    // this.initBscroll()
    // this.scroll.refresh()
      setTimeout(() => {
        this.initBscroll()
        // 监听滚动的位置
        this.scroll.on('scroll', (position) => {
        this.$emit("scroll", position)
      })
        // 3.监听上拉事件
        this.scroll.on('pullingUp', ()=>{
          // this.$emit('')
          console.log('上拉');
          this.$emit('pullingUp')
        })
      }, 20);

      
      
    // refresh()
  },
  methods: {
    initBscroll(){
      if(!this.$refs.scroll_wrapper){
        console.log('没有进行');
        return
      }
      // better-scroll初始化
      this.scroll = new BScroll(this.$refs.scroll_wrapper, {
          pullUpLoad: this.pullUpLoad,
          probeType:this.probeType,
          click:true,
          observeDOM:true
      })
      // this.bscroll.refresh()
    // this.$nextTick(()=>{
    //   this.scroll.refresh()
    //   // this.$refs.scroll.scroll.refresh()
    //   })

      // 监听滚动
      // this.scroll.on('scroll', (position)=>{
      //   // console.log(position);
      //   // this.$emit('scrollY',position)
      // })
      // 监听上拉加载 ,这只执行一次.所以等数据加载好渲染完成后执行this.bscroll.finishPullUp();让上拉加载再次执行
      // this.scroll.on('pullingUp', ()=>{
      //   console.log('上拉加载');
      //   setTimeout(() => {
      //   this.bscroll.finishPullUp();
      // },2000)
      // })
    },
    refresh(){
      // 重新计算refresh
      this.scroll && this.scroll.refresh()
    },
    enable(){
      // 重新启动refresh
      this.scroll && this.scroll.enable()
    },
    disable(){
      // 禁用refresh
      this.scroll && this.scroll.disable()
    },
    // 返回顶部
    scrollTo(x,y,h){
      this.scroll && this.scroll.scrollTo(x,y,h)
    },
    // 每次调用后恢复上拉函数
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    // 获取goods单个内容高度
    getScrollY() {
      return this.scroll() ? this.scroll.y : 0
    }
    
    
    // pullingUpHandler() {
    //   console.log('啦啦啦啦');
    // }

  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 200);
    }
  }
  
}
</script>

<style>

</style>