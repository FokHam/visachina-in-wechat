<template>
  <div class="specific">
    <div class="tab-bar">
      <span @click="tab(1)" :class="{ active: viewNum === 1 }">产品详情</span>
      <span @click="tab(2)" :class="{ active: viewNum === 2 }">投保提示</span>
      <span @click="tab(3)" :class="{ active: viewNum === 3 }">索赔指引</span>
    </div>
    <div class="tab-container">
      <div v-if="viewNum === 1" class="product-detail">
        <div class="pd-item">
          <p class="title">
            <i class="icon-feature"></i>产品特色
          </p>
          <p class="content">
            {{ feature }}
          </p>
        </div>
        <div class="pd-item">
          <p class="title">
            <i class="icon-guarantee"></i>保障内容
          </p>
          <div v-for="item in guarantee" class="grt-item">
            <p class="item-title">{{ item.title }}</p>
            <p v-for="item in item.items" class="detail">
              <i class="icon-tick"></i>{{ item.name }}
              <span>{{ item.amount + "元" }}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-if="viewNum === 2"
        class="insurance-tips"
        v-html="insuranceDetail.web_tb">
      </div>
      <div v-if="viewNum === 3"
        class="insurance-tips"
        v-html="insuranceDetail.web_sp">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
          viewNum: 1,
          feature: "境外旅行期间的意外伤害、住院医疗、紧急救援、旅行不便等其他特色服务。",
          guarantee: [
            {
              title: "旅程阻碍保障",
              items: [{
                  name: "行李延误",
                  amount: 6000
                }, {
                  name: "旅程延误",
                  amount: 7000
                }, {
                  name: "旅行证件遗失",
                  amount: 10000
                }, {
                  name: "旅行证件没遗失",
                  amount: 0.5
              }]
            },
            {
              title: "个人意外伤害和医疗保障",
              items: [{
                  name: "意外身故和伤残",
                  amount: 210000
                }, {
                  name: "医药补偿",
                  amount: 60000
                }, {
                  name: "旅行绑架及非法拘禁",
                  amount: 180000
                }]
            },
            {
              title: "紧急救援",
              items: [{
                  name: "意外及急性病医疗",
                  amount: 10000
                }, {
                  name: "既往疾病急救医药补偿",
                  amount: 3000
                }, {
                  name: "紧急医疗运送和送返",
                  amount: 5000
                }]
            },
            {
              title: "个人财务保障",
              items: [{
                  name: "手机及平板电脑保障",
                  amount: 10000
                }, {
                  name: "随身财产",
                  amount: 3000
                }, {
                  name: "不随身财产",
                  amount: 5000
                }]
            }
          ]
        }
      },
    methods: {
      tab: function (n) {
        this.viewNum = n;
      }
    },
    computed: {
      insuranceDetail () {
        return this.$store.state.insurance.productDetail;
      }
    }
  }
</script>

<style lang="less" scoped>
  .icon-tick {
    position: absolute;
    height: 0.7rem;
    width: 0.7rem;
    left: 0;
    background: url(/static/images/insurance/tick.png) no-repeat center;
    background-size: contain;
  }
  .icon-feature, .icon-guarantee {
    position: absolute;
    left: 0.75rem;
    width: 0.8rem;
    height: 0.8rem;
    background: url(/static/images/insurance/product.png) no-repeat center;
    background-size: contain;
  }
  .icon-guarantee {
    background: url(/static/images/insurance/safeguard.png) no-repeat center;
    background-size: contain;
  }
  .tab-bar {
    display: flex;
    span {
      flex: 1;
      text-align: center;
      line-height: 2rem;
      background-color: #fff;
      color: #333;
      margin-bottom: 0.1rem;
      &.active {
        color: #008BE4;
        border-bottom: 0.1rem solid #008BE4;
        margin-bottom: 0;
      }
    }
  }
  .tab-container {
    .pd-item {
      padding: 0.75rem;
      margin-bottom: 0.8rem;
      background-color: #fff;
      &:last-child {
        margin-bottom: 0;
      }
      .title {
        position: relative;
        line-height: 1;
        padding-left: 1.8rem;
        margin-left: -0.75rem;
        margin-bottom: 0.5rem;
        border-left: 0.1rem solid #008BE4;
        font-size: 0.8rem;
      }
      .content {
        color: #666;
      }
      .grt-item {
        margin-bottom: 0.7rem;
        .item-title {
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
          padding-bottom: 0.25rem;
          border-bottom: 0.05rem solid #ccc;
          padding-top: 0.25rem;
          margin-right: -0.75rem;
        }
        .detail {
          padding-left: 1rem;
          margin: 0.5rem 0;
          position: relative;
          line-height: 1;
          color: #666;
          span {
            float: right;
            color: #666;
          }
        }
      }
    }
    .insurance-tips {
      padding: 1rem 0.75rem;
      background-color: #fff;
      p {
        margin-bottom: 1rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
