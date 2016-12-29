<template>
  <div class="mask"
    v-if="detailObj"
    @mousedown="hide">
    <div class="room-detail">
      <p class="title">{{ detailObj.name }}</p>
      <p class="item"><span class="label">面积</span>{{ detailObj.area + "平方米" }}</p>
      <p class="item"><span class="label">早餐</span>{{ detailObj.breakfast ? "含早餐" : "不含早餐" }}</p>
      <p class="item" v-if="detailObj.maximum"><span class="label">可住</span>最多可住人数：{{ detailObj.maximum }}</p>
      <p class="item"><span class="label">宽带</span>{{ detailObj.wifi ? "免费无线上网" : "没得上网" }}</p>
      <div class="cancel-policy">
        <span class="sign">不可取消</span>
        <p class="word">预订成功后，订单无法取消。如订单不确认，将 全额退款至您的付款账户，敬请谅解。</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      detailObj: Object
    },
    methods: {
      hide () {
        this.$emit("hide");
      }
    }
  }
</script>

<style lang="less" scoped>
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    .room-detail {
      position: fixed;
      bottom: 0;
      background-color: #f6f6f6;
      width: 100%;
      padding: 1rem 1.5rem;
      box-sizing: border-box;
      text-align: center;
      .title {
        display: inline-block;
        font-size: 0.8rem;
        padding-bottom: 0.2rem;
        margin-bottom: 1rem;
        border-bottom: 0.05rem solid #333;
      }
      .item {
        text-align: left;
        .label {
          color: #999;
          margin-right: 0.7rem;
          line-height: 1.3rem;
        }
      }
      .cancel-policy {
        position: relative;
        margin: 0.5rem -0.5rem;
        padding: 0 0.5rem;
        border-top: 0.05rem solid #c0c0c0;
        text-align: left;
        .sign {
          position: absolute;
          color: #FF738D;
          font-size: 0.6rem;
          line-height: 1;
          padding: 0.1rem;
          border: 0.05rem solid #FF738D;
          border-radius: 0.1rem;
          top: 0.5rem;
        }
        .word {
          padding-left: 3.3rem;
          margin-top: 0.5rem;
          line-height: 1.2;
          color: #999;
          font-size: 0.6rem;
        }
      }
    }
  }
</style>
