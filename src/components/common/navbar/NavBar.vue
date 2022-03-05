<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
  .nav-bar {
    display: flex;
    height: 13.75vw;
    line-height: 13.75vw;
    text-align: center;
    box-shadow: 0 .3125vw .3125vw rgba(100, 100, 100, .1);
  }
  .left, .right {
    width: 18.75vw;
    /* background-color: blue; */
  }
  .center {
    flex: 1;
    /* background-color: chartreuse; */
  }
</style>