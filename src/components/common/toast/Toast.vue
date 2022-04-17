<template>
  <div class="toast" v-show="show">
    <div>{{massage}}</div>
  </div>
</template>

<script>
export default {
  name:"Toast",
  props: {
    massage: {
      type:String,
      default: ''
    },
    show: {
      type: Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.toast{
  width: auto;
  height: 9.375vw;
  position: fixed;
  transform: translate(-50%,-50%);
  text-align: center;
  top: 50%;
  left: 50%;
  color: #fff;
  background-color: rgba(0, 0, 0, .5);
  padding: 3.125vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5vw;
}
</style>