<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <p>参数信息</p>
    <table :key="index" class="info-size" v-for="(table, index) in paramInfo.sizes">
      <tr :key="indey" v-for="(tr, indey) in table">
        <td :key="indez" v-for="(td, indez) in tr">{{ td }}</td>
      </tr>
    </table>

    <table class="info-param">
      <tr :key="index" v-for="(info, index) in paramInfo.infos">
        <td class="info-param-key">{{ info.key }}</td>
        <td class="param-value">{{ info.value }}</td>
      </tr>
    </table>

    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img v-lazy="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.param-info {
  font-size: 4.375vw;
  padding: 6.25vw 4.6875vw;
  border-bottom: 1.5625vw solid #f2f5f8;
}
.param-info p {
  font-size: 4.6875vw;
  margin-bottom: 3.125vw;
}
.param-info table {
  width: 100%;
  border-collapse: collapse;
}
.param-info table tr {
  height: 13.125vw;
}
.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 29.6875vw;
}
.info-param {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.param-value {
  color: #eb4868;
}
.info-img img {
  width: 100%;
}
</style>