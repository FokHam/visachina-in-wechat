<template>
  <div class="specific">
    <div class="tab-bar">
      <span @click="tab(1)" :class="{ active: selected === 1 }">产品详情</span>
      <span @click="tab(2)" :class="{ active: selected === 2 }">投保提示</span>
      <span @click="tab(3)" :class="{ active: selected === 3 }">索赔指引</span>
    </div>
    <div class="tab-container">
      <div v-if="selected === 1" class="product-detail">
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
      <div v-if="selected === 2"
        class="insurance-tips"
        v-html="insuranceDetail.web_tb">
      </div>
      <div v-if="selected === 3"
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
          selected: 1,
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
          ],
          tips: [
            "1、本产品由利宝保险有限公司承保，目前该公司在 重庆、北京、浙江、广东、山东、四川设有分支机构。 本产品的销售区域为全国，客户从慧择保险网购买， 后续理赔等相关事务均可由慧择保险网协助您办理。",
            "2、本产品承保年龄为0-85周岁（含0、85周岁）， 被保险人常住地为中华人民共和国境内，未成年人累 计意外身故保额以保监会规定为准。71周岁以上（含 71周岁）的被保险人，其涉及“意外身故及残疾保障”、 “公共交通工具意外保障”、“海外自驾车意外伤害”“急 性病身故保障”和“意外事故及突发疾病医疗费用”的保 险金额减半，保费不变。",
            "3、在同一保险期间内，每位被保险人仅限投保1份本 保险公司的旅行意外伤害保险。若同一被保险人就同 一旅行同时投保2份（或以上）任何旅行险产品，则仅 按保额最高者作出赔偿。",
            "4、本产品承保下列高风险运动：海拔6000米以下的休 闲旅游、远足徒步、登山运动、山地穿越、露营、固定 路线洞穴体验、野外生存、徒步穿越无人区（沙漠、戈 壁等）；定向运动、拓展活动、场地趣味活动、自行车 运动、山地自行车越野、场地/越野轮滑、自驾车旅行； 游泳、潜水（下潜深度不超过18米）、溯溪、划船、 帆船、帆板、皮划艇、漂流；人工/自然场地攀岩及下 降、攀冰、滑雪运动、骑马游玩、马术培训、马术比赛 （竞速赛、绕桶赛）、丛林飞跃、飞盘、溯溪、高海拔 登山、攀冰、海上摩托、速降。",
            "5、境外旅行期间内因罹患突发疾病或遭受意外伤害而 导致严重身体伤害，或预订的返回其日常居住地的公 共交通工具由于不可抗力的原因导致延误，无法如期 回到其日常居住地，保险公司将根据被保险人完成该 次旅行合理及必所的时间，自动延长保险期间，最高 可延期7天。"
          ]
        }
      },
    methods: {
      tab: function (n) {
        this.selected = n;
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
