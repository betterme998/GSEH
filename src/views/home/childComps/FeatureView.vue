<template>
  <div class="feature">
    <a href="">
      <img @load="imgload2" src="~assets/img/home/recommend_bg.jpg" alt="">
    </a>
  </div>
</template>

<script>
export default {
  name:"FeatureView",
  methods(){
    imgload2:{
      this.$emit('imgload2')
    }
  }
}
</script>

<style>
  .feature img{
    width: 100%;
  }
</style>