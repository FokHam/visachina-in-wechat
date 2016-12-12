<template>
  <div class="insurance-list">
    <div class="insurance-item">
      <div class="img-wrapper">
        <img src="/static/images/insurance/pic1.png" alt="保险产品图片">
        <p>“乐游全球”境外旅行保障计划 黄金计划</p>
        <div class="label-list">
          <span>意外伤害</span>
          <span>紧急救援</span>
        </div>
      </div>
      <div class="info-wrapper">
        <div class="indemnity-list">
          <div class="indemnity">
            <span class="title">意外身故/伤残</span>
            <span class="amount">300,000元</span>
          </div>
          <div class="indemnity">
            <span class="title">意外身故/伤残</span>
            <span class="amount">300,000元</span>
          </div>
          <div class="indemnity">
            <span class="title">意外身故/伤残</span>
            <span class="amount">300,000元</span>
          </div>
        </div>
        <div class="price">
          <span class="age">18-85岁</span>
          <span class="price">¥299</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      list: [
        {
          name: "“乐游全球”境外旅行保障计划 黄金计划",
          label: ["意外伤害", "意外伤害", "紧急救援"],
          indemnity: [
            {
              title: "意外身故/伤残",
              amount: "300000"
            }, {
              title: "旅行变更",
              amount: "10000"
            }, {
              title: "意外及急性病医疗",
              amount: "10000000"
            }
          ]
        }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(to.params.type);
    next();
  }
}
</script>

<style lang="less" scoped>
  .insurance-list {
    background-color: #f0f0f0;
  }
  .insurance-item {
    margin: 0 0.5rem 1rem;
    background: #fff;
    border-radius: 0.25rem;
    overflow: hidden;
    .img-wrapper {
      position: relative;
      p,.label-list {
        position: absolute;
      }
      p {
        top: 0.5rem;
        color: #fff;
      }
      .label-list {
        top: 1.5rem;
        margin-left: 0.5rem;
      }
      span {
        padding: 0.15rem 0.25rem;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 0.1rem;
        color: #fff;

      }
    }
    .info-wrapper {
      .indemnity span {
        color: #666;
      }
      .amount {
        float: right;

      }
    }
  }
</style>
