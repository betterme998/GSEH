<template>
  <div class="goods-item" @click="itemClick">
    <!-- 不同数据可能路径不同 所以使用计算属性 判断 -->
    <img :src="showImage" @load="imgg" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <!-- <span class="iconfont "></span> -->
      <span class="price iconfont icon-renminbi">{{goodsItem.price}}</span>
      <span class="collect iconfont icon-shoucang">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"GoodsListItem",
  props: {
    goodsItem: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  beforeUnmount() {
    this.imgg = null;
  },
  methods:{
    imgg(){
      if(this.$route.path.indexOf('/home')) {
        this.$emit('detailimgload')
      }else if(this.$route.path.indexOf('/detail')){
        this.$emit('homeimgload')
      }
    },
    itemClick() {
      // 跳转详情页，因为要返回所以用push()
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  computed: {
    showImage() {
      // 如果取不到image就
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style>
@import "assets/css/iconfont.css";
.goods-item{
  /* position: relative; */
  width: 46.875vw;
  border-radius: 1.5625vw;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 1.875vw;
  /* 瀑布布局底部元素被分割，产生断行
  //auto：既不强迫也不禁止在元素内部断行并产生新列
  //avoid：避免在元素内部断行并产生新列 */
  -webkit-column-break-inside: avoid;
}
.goods-item img {
  width: 100%;
}
.goods-info{
  font-size: 2.55vw;
  padding:1vw 2vw;
  left: 0;
  right: 0;
  overflow: hidden;
}
.goods-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: .9375vw;
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  /* 超过两行省略号 */
  -webkit-line-clamp: 2;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 1.6875vw;
  position: relative;
  /* margin-left: 6.25vw; */
  font-size: 3.75vw;
  
}
.goods-info .icon-renminbi::before {
  content: '\e606';
  font-size: 3vw;
}
.goods-info .collect {
  position: relative;
  font-size: 3.75vw;

}
.goods-info .icon-shoucang::before {
  content: '\e8b9';
  font-size: 3vw;
}

</style>