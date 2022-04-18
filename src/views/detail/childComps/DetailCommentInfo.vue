<template>
  <div>
    <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right" />
        </div>
      </div>
      <div class="info-user">
        <img v-lazy="commentInfo.user.avatar" alt="" />
        <span>{{ commentInfo.user.uname }}</span>
      </div>
      <div class="info-detail">
        <p>{{ commentInfo.content }}</p>
        <div class="info-other">
          <span class="date">{{ showDate }}</span>
          <span>{{ commentInfo.style }}</span>
        </div>
        <div class="info-imgs">
          <img :key="index" v-lazy="item" alt="" v-for="(item, index) in commentInfo.images" />
        </div>
      </div>
    </div>
    <div class="comment-info" style="color: red;" v-else>暂无用户评论</div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object
    }
  },
  computed: {
    // 只要服务器返回的是时间都不会返回2022-3-31这种格式 因为不同地方显示时间的方式不同如2022/3/31
    // 服务器会以Unix时间元年为起点，返回对应的时间戳
    // 问题： 如何将时间戳 转成时间格式化字符串
    // 时间戳：1535694719（秒）
    // 1.将时间戳转成Date对象,要乘以1000
    // const date = new Date(1535694719*1000)
    // 2.将date进行格式化，转成对应的字符串。因为太常用所以有方法。接受两个参数1.data 2."yyyy-MM-dd hh:mm" 分隔符随便写
    // y:year年
    // M：Month 月
    // d:day 日
    // h：hours小时(h(12小时)/H(24小时))
    // m:minutes分钟
    // s:seconds 秒钟
    showDate: function () {
      // 1.将时间戳转成data对象
      let date = new Date(this.commentInfo.created * 1000);
      // 2.将data进行格式化
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style scoped>
.comment-info {
  padding: 1.5625vw 3.75vw;
  color: #333333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header {
  line-height: 15.625vw;
  height: 15.625vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.header-title {
  font-size: 4.6875vw;
  float: left;
}
.header-more {
  font-size: 4.0625vw;
  float: right;
  margin-right: 3.125vw;
}
.info-user {
  padding: 3.125vw 0 1.5625vw;
}
.info-user img {
  width: 13.125vw;
  height: 13.125vw;
  border-radius: 50%;
}
.info-user span {
  font-size: 4.6875vw;
  position: relative;
  top: --4.6875vw;
  margin-left: 3.125vw;
}
.info-detail {
  padding: 0 1.5625vw 4.6875vw;
}
.info-detail p {
  font-size: 4.375vw;
  line-height: 1.5;
  color: #777777;
}
.info-detail .info-other {
  font-size: 3.75vw;
  margin-top: 3.125vw;
  color: #999999;
}
.info-other .date {
  margin-right: 2.5vw;
}
.info-imgs {
  margin-top: 3.125vw;
}
.info-imgs img {
  width: 21.875vw;
  height: 21.875vw;
  margin-right: 1.5625vw;
  object-fit: cover;
}
</style>