<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" 
        :key="index" 
        ref="TabControlTop"
        class="tab-control-item"
        :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  nane:"TabControl",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type:Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
    },
    
  }
}
</script>

<style>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 4.6875vw;
    height: 12.5vw;
    line-height: 12.5vw;
    background-color: #fff;
    z-index: 8;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 1.5625vw;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: .9375vw solid var(--color-tint);
  }
</style>