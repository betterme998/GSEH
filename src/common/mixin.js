import BackTop from "components/content/backTop/BackTop.vue"

// 这段代码时练习混入，无作用
export const itemListenerMoxin = {
  mounted(){
    // console.log("mixin 代码复用");
  }
}

// 导出一个混入对象 回到顶部的组件
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop:false,
    }
  },
  methods: {
     // 回到顶部
    // 修饰符.native修饰符什么时候使用？ 在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    listanShoBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}