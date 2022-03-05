<template>
      <tab-bar>
      <!-- 让别人在用tabbaritem时传入一个颜色 可以改变tabbaritem的颜色 avtiveColor='blue' -->
      <tab-bar-item path="/home">
        <template #item-icon><span class="iconfont icon-shouye"></span></template>
        <template #item-icon-active><span class="iconfont icon-shouye-copy"></span></template>
        <template #item-text><span>首页</span></template>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <template #item-icon><span class="iconfont icon-fenlei"></span></template>
        <template #item-icon-active><span class="iconfont icon-fenlei-copy"></span></template>
        <template #item-text><span>分类</span></template>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <template #item-icon><span class="iconfont icon-gouwuche"></span></template>
        <template #item-icon-active><span class="iconfont icon-gouwuche-copy"></span></template>
        <template #item-text><span>购物车</span></template> 
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <template #item-icon><span class="iconfont icon-wode"></span></template>
        <template #item-icon-active><span class="iconfont icon-wode-copy"></span></template>
        <template #item-text><span>我的</span></template> 
      </tab-bar-item>
    </tab-bar>
</template>

<script>
// tabbar组件。  TabBarItem组件，就是首页 分类 购物车 我的
import TabBar from '../../common/tabbar/TabBar.vue'
import TabBarItem from '../../common/tabbar/TabBarItem.vue'

export default {
  name:'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>