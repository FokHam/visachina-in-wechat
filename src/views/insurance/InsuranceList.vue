<template>
  <div class="insurance-list">
    <router-link v-for="(item, index) in list" :to="'/insuranceDetail/' + item.id">
      <div class="insurance-item">
        <div class="img-wrapper">
          <img :src="item.image" alt="保险产品图片">
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
    <div class="empty" v-if="emptyDis">暂无相关产品</div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  created () {
    Indicator.open('加载中');
    let url = "/api/insurance/list";
    let send = { type: this.$route.params.type };
    this.$http.get(url, { params: send }).then((response) => {
      Indicator.close()
      let body = JSON.parse(response.body);
      console.log(JSON.parse(response.body));
      if (body.status === 1) {
        this.list = body.data.rows;
        if (body.data.rows.length == 0) {
          this.emptyDis = true
        }
      } else {
        console.log("服务器错误");
      }
    },(response) => {

    })
  },
  data: function () {
    return {
      list: [],
      emptyDis: false
    }
  }
}
</script>

<style lang="less" scoped>
  p,span,a{font-size: 0.7rem;}
  .empty {
    text-align: center;
    font-size: .7rem;
    color: #ccc;
    line-height: 6rem;
  }
  .insurance-list {
    padding: 1rem 0;
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
