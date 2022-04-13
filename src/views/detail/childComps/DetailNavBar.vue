<template>
  <div>
    <nav-bar>
      <template #left>
        <div @click="backClick"><span class="iconfont icon-fanhui" ></span></div>
      </template>
      <template #center>
        <div class="title">
          <div v-for="(item, index) in titles" :key="index"
               class="title-item"
               :class="{active: index === currentIndex}"
               @click="titleClick(index)"
          >{{item}}</div>
        </div>
      </template>
      <template #right></template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name:'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles:['商品', '参数', '评论', '推荐'],
      currentIndex: 0 //默认选中
    }
  },
  methods:{
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
@import 'assets/css/iconfont.css';
.title{
  display: flex;
}
.title-item{
  flex: 1;
  font-size: 4.0625vw;
}
.active{
  color:var(--color-high-text);
}
.icon-fanhui{
  font-size: 5.6625vw;
  margin-top: 3.125vw;
}
</style>