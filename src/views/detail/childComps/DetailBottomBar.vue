<template>
  <div class="botton-bar">
    <div class="bar-item bar-left">
      <div>
        <span class="iconfont icon-kefu"></span>
        <span class="text">客服</span>
      </div>
      <div>
        <span class="iconfont icon-dianpu"></span>
        <span class="text">店铺</span>
      </div>
      <div>
        <span class="iconfont icon-shoucang"></span>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailBottomBar',
  methods: {
    addToCart() {
      // 发送事件
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
@import "assets/css/iconfont.css";
.botton-bar {
  height: 15.3125vw;
  background-color: #fff;
  position: relative;
  display: flex;
  text-align: center;
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item>div {
  flex: 1;
  justify-content: center;
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
  flex-direction: column;
}
.bar-item>div .iconfont {
 font-size: 7.5625vw;
}
.bar-item>div .text{
  font-size: 4.0625vw;
}
.bar-right .cart{
  background-color: #ffeb12;
  font-size: 4.5625vw;
}
.bar-right .buy{
  background-color: #ff5777;
  font-size: 4.5625vw;
  color: #fff;
}
</style>