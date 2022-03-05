<template>
  <div id="app">
    <div id="tab-bar">
      <!-- 封装完tabbar后只给它一个插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"TabBar"
}
</script>

<style>
 #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0 -.3125vw .3125vw rgba(100, 100, 100, .1);
  }

</style>