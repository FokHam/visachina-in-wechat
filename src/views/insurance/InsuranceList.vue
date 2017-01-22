<template>
  <div class="insurance-list">
    <router-link v-for="(item, index) in list" :to="'/insuranceDetail/' + item.id">
      <div class="insurance-item">
        <div class="img-wrapper">
          <img :src="imgPath[index]" alt="保险产品图片">
          <p>{{ item.name }}{{ item.planName ? " - " + item.planName : "" }}</p>
          <div class="label-list">
            <span v-for="labelItem in item.label">{{ labelItem }}</span>
          </div>
        </div>
        <div class="info-wrapper clearfix">
          <div class="indemnity-list">
            <div v-for="plan in item.plans" class="indemnity clearfix">
              <span class="title">{{ plan.name }}</span>
              <span class="amount">{{ plan.texts }}</span>
            </div>
          </div>
          <div class="price-box">
            <span class="age">{{ item.age }}</span>
            <span class="price">{{ "¥" + item.price }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  created () {
    let url = "/insurance/list";
    let send = { type: this.$route.params.type };
    this.$http.get(url, { params: send }).then((response) => {
      let body = JSON.parse(response.body);
      console.log(JSON.parse(response.body));
      if (body.status === 1) {
        this.list = body.data.rows;
      } else {
        console.log("服务器错误");
      }
    },(response) => {

    })
  },
  data: function () {
    return {
      imgPath: [
        "/static/images/insurance/pic1.png",
        "/static/images/insurance/pic2.png",
        "/static/images/insurance/pic3.png",
        "/static/images/insurance/pic1.png",
        "/static/images/insurance/pic2.png",
        "/static/images/insurance/pic3.png",
        "/static/images/insurance/pic1.png",
        "/static/images/insurance/pic2.png",
        "/static/images/insurance/pic3.png",
        "/static/images/insurance/pic1.png",
        "/static/images/insurance/pic2.png",
        "/static/images/insurance/pic3.png"
      ],
      list: [
        {
          name: "“乐游全球”境外旅行保障计划 黄金计划",
          id: 123,
          imgPath: "/static/images/insurance/pic1.png",
          label: ["意外伤害", "意外伤害", "紧急救援"],
          indemnity: [
            {
              name: "意外身故/伤残",
              amount: "300,000"
            }, {
              name: "旅行变更",
              amount: "100,00"
            }, {
              name: "意外及急性病医疗",
              amount: "10,000,000"
            }
          ],
          age: "18-85岁",
          price: 222
        },{
          name: "“乐游全球”境外旅行保障计划 黄金计划",
          id: 321,
          imgPath: "/static/images/insurance/pic2.png",
          label: ["意外伤害", "意外伤害", "意外起飞"],
          indemnity: [
            {
              name: "意外身故/伤残",
              amount: "1,000"
            }, {
              name: "旅行变更",
              amount: "500"
            }, {
              name: "玩的不开心",
              amount: "10,000"
            }
          ],
          age: "1-100岁",
          price: 886
        },{
          name: "“乐游全球”境外旅行保障计划 黄金计划",
          id: 321,
          imgPath: "/static/images/insurance/pic3.png",
          label: ["意外伤害", "意外坠楼", "意外起飞"],
          indemnity: [
            {
              name: "意外中彩票/伤残",
              amount: "1,000"
            }, {
              name: "旅行变更",
              amount: "500"
            }, {
              name: "玩的太开心",
              amount: "10,000"
            }
          ],
          age: "1-100岁",
          price: 886
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .insurance-list {
    padding: 1rem 0;
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
        left: 0.5rem;
        color: #fff;
      }
      .label-list {
        top: 1.8rem;
        margin-left: 0.5rem;
        span {
          margin-right: 0.3rem;
        }
      }
      span {
        padding: 0.15rem 0.25rem;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 0.1rem;
        color: #fff;
      }
    }
    .info-wrapper {
      position: relative;
      .indemnity-list {
        width: 50%;
        float: left;
        margin: 0.1rem 0.5rem 0.4rem;
        .indemnity {
          line-height: 0.9rem;
          span {
            font-size: 0.6rem;
            color: #666;
          }
          .title {
            float: left;
          }
          .amount {
            float: right;
          }
        }
      }
      .price-box {
        position: absolute;
        right: 0.5rem;
        bottom: 0.4rem;
        .price {
          font-size: 1rem;
          color: #FC4949;
        }
        .age {
          margin-right: 0.2rem;
          font-size: 0.5rem;
          color: #999;
        }
      }
    }
  }
</style>
