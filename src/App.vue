<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar></main-tab-bar> 
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabbar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
/* 因为取了别名 所以会从src下面开始找这个文件，就是层级很深也没事，不用再写./ ../甚至../../ */
  @import "assets/css/base.css"; 
</style>
