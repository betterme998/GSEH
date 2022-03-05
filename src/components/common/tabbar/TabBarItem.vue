<template>
    <div class="tab-bar-item" @click="itemClik">
      <div v-if="!isActive" :style="activeStyle"><slot name="item-icon"></slot></div>
      <div v-else :style="activeStyle"><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: '#F8709E'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      // 改变tabbaritem的颜色 动态决定isActive的布尔值
      isActive() {
        //  /home -> item1(/home) = true
        //  /home -> item1(/category) = false
        //  /home -> item1(/cart) = false
        //  /home -> item1(/profile) = false
        return this.$route.path.indexOf(this.path) !==-1
      },
      // 让用户在使用组件时可以动态改变颜色
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClik() {
        this.$router.replace(this.path).catch(err=>err)
      }
    }
  }
</script>

<style>
@import "assets/css/iconfont.css";
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 15.3125vw;
    font-size: 3.75vw;
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
  }
  .iconfont{
    font-size: 7.5vw;
}
.item-icon-active{
  color: #1296db;
  margin-top: .9375vw;

}



</style>