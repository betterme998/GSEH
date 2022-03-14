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
      bscroll:null
    }
  },
  props:{
    data:{
      type:Object,
      default() {
        return null
      }
    }
  },
  // 等·挂载后它就行了， 忘了看官网
  mounted() {
    // this.initBscroll()
    // this.scroll.refresh()
      setTimeout(() => {
        this.initBscroll()
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
          pullUpLoad: true,
          probeType:3,
          click:true,
          observeDOM:true
      })
      // this.bscroll.refresh()
    // this.$nextTick(()=>{
    //   this.scroll.refresh()
    //   // this.$refs.scroll.scroll.refresh()
    //   })

      // 监听滚动
      // this.bscroll.on('scroll', (position)=>{
      //   console.log(position);
      // })
      // 监听上拉加载 ,这只执行一次.所以等数据加载好渲染完成后执行this.bscroll.finishPullUp();让上拉加载再次执行
      // this.bscroll.on('pullingUp', ()=>{
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