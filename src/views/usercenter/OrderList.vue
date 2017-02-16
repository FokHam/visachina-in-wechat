<template>
  <div class="order-list">
    <ul class="tabs">
      <li class="tab-btn"
        :class="{active: status === 1}"
        @click="switchStatus(1)">全部</li>
      <li class="tab-btn"
        :class="{active: status === 2}"
        @click="switchStatus(2)">待付款</li>
      <li class="tab-btn"
        :class="{active: status === 3}"
        @click="switchStatus(3)">退款</li>
      <li class="tab-btn"
        :class="{active: status === 4}"
        @click="switchStatus(4)">失效</li>
    </ul>
    <ul class="orders">
      <li class="order-item"
        :class="order.type"
        v-for="order in orderList"
        v-if="status === 1 || order.status === status">
        <!-- hotel -->
        <div class="detail-box" v-if="order.type === 'hotel'">
          <p class="name">{{ order.productName }}</p>
          <p class="address">{{ order.address }}</p>
          <p class="date">{{ order.dateRange }}<span>{{ order.quantity }}</span></p>
        </div>
        <!-- visa -->
        <div class="detail-box" v-if="order.type === 'visa'">
          <p class="name">{{ order.productName }}</p>
          <p class="date"><span>预计</span>{{ order.date }}<span>出发</span></p>
        </div>
        <!-- wifi -->
        <div class="detail-box" v-if="order.type === 'wifi'">
          <p class="name">{{ order.productName }}</p>
          <p class="date">{{ order.dateRange }}<span>{{ order.quantity }}</span></p>
        </div>
        <!-- insurance -->
        <div class="detail-box" v-if="order.type === 'insurance'">
          <p class="name">{{ order.productName }}</p>
          <p class="date">{{ order.dateRange }}<span>{{ order.quantity }}</span></p>
        </div>
        <!-- verify -->
        <div class="detail-box" v-if="order.type === 'verify'">
          <p class="name">{{ order.productName }}</p>
          <p class="date"><span>{{ order.quantity }}</span></p>
        </div>
        <div class="price-box">
          <p>
            {{ "¥" + order.totalPrice }}
            <span class="status">{{ statusList[order.status] }}</span>
            <span class="refund"></span>
          </p>
          <div class="btn-wrapper">
            <span class="btn btn-grey">删除</span>
            <span class="btn"
              @click="bookAgain(order)">再次预定</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        statusList: {
          "-2": "退款",
          "0": "未付款",
          "2": "已付款"
        },
        orderList: [],
        status: "0"
      }
    },
    created () {
      this.getList();
      this.status = Number(this.$route.params.status) || 1;
    },
    methods: {
      getList () {
        let url = "/api/orders/list";
        this.$http.get(url).then((response) => {
          console.log(JSON.parse(response.body));
          let body = JSON.parse(response.body);
          this.orderList = body.data.rows;
        }, (response) => {
          console.log("服务器错误");
        })
      },
      switchStatus (n) {
        this.status = n;
      },
      bookAgain (obj) {
        let url = "/" + obj.type + "Detail/" + obj.product;
        this.$router.push(url);
      }
    },
    watch: {
      '$route' (to) {
        this.status = Number(to.params.status) || 1;
      }
    }
  }
</script>

<style lang="less" scoped>
  .tabs {
    display: flex;
    background-color: #fff;
    text-align: center;
    border-bottom: 0.05rem solid #f0f0f0;
    .tab-btn {
      padding: 0.6rem 0;
      flex: 1;
      font-size: 0.8rem;
      color: #666;
      &.active {
        color: #008BE4;
        border-bottom: 0.15rem solid #008BE4;
      }
    }
  }
  .order-item {
    background-color: #fff;
    margin-bottom: 0.5rem;
    border-bottom: 0.05rem solid #C0C0C0;
    .detail-box {
      padding: 0.8rem 1rem 0;
      padding-left: 2rem;
      .name {
        padding-left: 1.3rem;
        margin-left: -1.3rem;
        margin-bottom: 0.2rem;
        line-height: 1rem;
        background-repeat: no-repeat;
        background-position: left top;
        background-size: 1rem 1rem;
        word-break: break-all;
      }
      .address {
        color: #999;
        margin-bottom: 0.8rem;
      }
      .date {
        padding-bottom: 1rem;
        span {
          font-size: 0.6rem;
          margin: 0 0.2rem;
          color: #999;
        }
      }
    }
    .price-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0;
      padding: 0.8rem 1rem;
      padding-left: 1.5rem;
      border-top: 0.05rem solid #eee;
      span {
        line-height: 1;
      }
      .status {
        margin-left:0.5rem;
        margin-right: 0.5rem;
        color: #008BE4;
      }
      .refund {
        color: #F84C00;
      }
      .btn-wrapper {
        align-self: flex-end;;
        vertical-align: middle;
        .btn {
          display: inline-block;
          width: 3rem;
          text-align: center;
          line-height: 1;
          padding: 0.2rem;
          border: 0.05rem solid #008BE4;
          margin-left: 0.3rem;
          border-radius: 0.15rem;
          color: #008BE4;
          &.btn-grey {
            border-color: #999;
            color: #999;
          }
        }
      }
    }
    &.hotel {
      .date {
        padding-bottom: 0.5rem;
      }
      .name {
        background-image: url(/static/images/usercenter/hotel.png);
      }
    }
    &.visa {
      .name {
        background-image: url(/static/images/usercenter/visa.png);
      }
      .date {
        span:first-child {
          margin-left: 0;
        }
      }
    }
    &.wifi {
      .name {
        background-image: url(/static/images/usercenter/wifi.png);
      }
    }
    &.insurance {
      .name {
        background-image: url(/static/images/usercenter/insurance.png);
      }
    }
    &.verify {
      .name {
        background-image: url(/static/images/usercenter/HSmark.png);
      }
    }
  }
</style>
