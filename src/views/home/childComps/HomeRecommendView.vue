<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.title" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'HomeRecommendView',
  props: {
    recommends:{
      type:Array,
      default (){
        return []
      }
    }
  }
}
</script>

<style>
  .recommend{
    display: flex;
    width: 100vw;
    text-align: center;
    font-size: 3.75vw;
    padding: 3.125vw 0 6.25vw;
    border-bottom: 2.5vw solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img {
    width: 21.875vw;
    height: 21.875vw;
    margin-bottom: 3.125vw;
  }
</style>