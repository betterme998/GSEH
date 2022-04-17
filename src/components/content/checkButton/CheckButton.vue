<template>
  <div class="check-button">
    <div class="nocheck" :class="{check: isChecked}"></div>
    <img v-show="isChecked" src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.check-button, .nocheck{
  width: 6.25vw;
  height: 6.25vw;
}  
.check-button img{
  width: 6.25vw;
  border-radius: 50%;
}
.nocheck{
  position: absolute;
  border: 2px solid #aaa;
  border-radius: 50%;
}
.check {
  border: 2px solid #ff8198;
}
.noimg{
  
}
</style>