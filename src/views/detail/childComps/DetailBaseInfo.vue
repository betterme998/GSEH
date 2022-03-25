<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <!-- 标题 -->
    <div class="info-title">{{goods.title}}</div>
    <!-- 价格 -->
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <!-- 快递信息 -->
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <!-- 24h发货 -->
    <div class="info-services">
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailBaseInfo',
  props: {
    goods: {
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info{
    margin-top: 4.6875vw;
    padding: 0 2.5vw;
    color: #999;
    border-bottom: 1.5625vw solid #f2f5f8;
  }
  .info-title {
    color: #222;
  }
  .info-price {
    margin-top: 3.125vw;
  }
  .info-price .n-price {
    font-size: 7.5vw;
    color: var(--color-high-text);
  }
  .info-price .o-price {
    font-size: 4.0625vw;
    margin-left: 1.5625vw;
    text-decoration: line-through;
  }
  .discount {
			color: #fff;
			font-size: 3.75vw;
			border-radius: 31.25vw;
			padding: .625vw 1.875vw;
      margin-left: 2vw;
			background-color: var(--color-high-text);
	}
  .info-other {
		display: flex;
		color: #999;
		font-size: 3.75vw;
		padding: 3.125vw 1.25vw;
    justify-content: space-between;
		border-bottom: 1px solid #ededed;
	}
  .info-other span{
  }
  .info-services {
		display: flex;
		font-size: 3.75vw;
		color: #333;
		padding: 3.125vw 1.25vw;
		justify-content: space-between;
	}
  .info-services img {
			width: 3.75vw;
			height: 3.75vw;
			vertical-align: middle;
	}
</style>