<template>
  <div class="back-top">
    <span class="iconfont icon-TOP"></span>
  </div>
</template>

<script>
export default {
  name:"BackTop"
}
</script>

<style scoped>
@import "assets/css/iconfont.css";
.back-top{
  width: 13.4375vw;
  height: 13.4375vw;
  position: fixed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 4.5vw;
  bottom: 22.1875vw;
  font-size: 4.5vw;
  color: #ff0000;
  background-color: #fff;
}
.back-top .icon-TOP{
  font-size: 6.5vw;
}
</style>