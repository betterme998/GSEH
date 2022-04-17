<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton @click.native="checkClick" :is-checked="itemInfo.checked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="item-bottom">
        <div class="item-price">￥{{itemInfo.price}}</div>
        <div class="item-button">
          <div class="countss" v-show="itemInfo.buttonshow"  @click="increment" :disabled="itemInfo.count <=1">-</div>
          <div @click="buttons" class="item-count">x{{itemInfo.count}}</div>
          <div class="countss" v-show="itemInfo.buttonshow" @click="decrement">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'
export default {
  name:'CartListItem',
  data() {
    return {
      buttonshow:false
    }
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    CheckButton
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
    },
    buttons() {
      this.itemInfo.buttonshow = !this.itemInfo.buttonshow
    },
    increment() {
      if(this.itemInfo.count <= 1){
        this.itemInfo.count = 1
      }else {
        this.itemInfo.count--
      }
    },
    decrement() {
      this.itemInfo.count++
    }
  }
}
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 1.5625vw;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 6.25vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title, .item-desc{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img{
  padding: 1.5625vw;
}
.item-img img {
  width: 25vw;
  height: 31.25vw;
  object-fit: cover;
  display: block;
  border-radius: 1.5625vw;
}
.item-info{
  display: flex;
  flex-direction:column;
  justify-content: space-around;
  font-size: 5.3125vw;
  color: #335;
  padding: 0 3.125vw;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 4.075vw;
  color: #666;
}
.item-info .item-title {
  font-size: 4.7vw;
}
.item-bottom {
  display: flex;
  justify-content: space-between;
}
.item-bottom .item-price {
  color: orangered;
}
.item-count{
  font-size: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .9375vw;
  margin: 0 2vw;
  border-radius: 1.875vw;
  border: 1px solid #bdbbbb;
}
.item-button{
  display: flex;
  width: 18.75vw;
  justify-content: center;
}
.countss{
  flex: 1;
  font-size: 6vw;
  text-align: center;
}
</style>