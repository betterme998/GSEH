<template>
  <div class="image-info" v-if="Object.keys(imagesInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ imagesInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div :key="index" v-for="(item, index) in imagesInfo.detailImage">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img
          v-for="(image, imageIndex) in item.list"
          :key="imageIndex"
          :src="image"
          @load="imgLoad"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      count: 0,
      imagesLength: 0
    };
  },
  props: {
    imagesInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  beforeUnmount() {
    this.imgLoad = null
  },
  methods: {
    imgLoad() {
      if ((++this.count === this.imagesLength) && (this.$route.path.indexOf('/home'))) {
        this.$emit("imgLoad");
        console.log('详情页');
      }
    }
  },
  watch: {
    imagesInfo() {
      this.imagesLength = this.imagesInfo.detailImage[0].list.length;
    }
  }
};
</script>

<style scoped>
.image-info {
  padding: 6.25vw 0;
  border-bottom: 1.5625vw solid #f2f5f8;
}
.info-desc {
  padding: 0 4.6875vw;
}
.info-desc .start,
.info-desc .end {
  position: relative;
  width: 28.125vw;
  height: 1px;
  background-color: #a3a3a5;
}
.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  position: absolute;
  bottom: 0;
  width: 1.5625vw;
  height: 1.5625vw;
  content: "";
  background-color: #333333;
}
.info-desc .end::after {
  right: 0;
}
.info-desc .desc {
  font-size: 4.375vw;
  padding: 4.6875vw 0;
}
.info-key {
  font-size: 4.6875vw;
  margin: 3.125vw 0 3.125vw 4.6875vw;
  color: #333333;
}
.info-list img {
  width: 100%;
}
</style>
