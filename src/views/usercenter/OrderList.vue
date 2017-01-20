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
        v-if="order.status === status">
        <!-- hotel -->
        <div class="detail-box" v-if="order.type === 'hotel'">
          <p class="name">{{ order.cname + (order.ename ? "(" + order.ename + ")" : "") }}</p>
          <p class="address">{{ order.address }}</p>
          <p class="date">{{ order.startDate }}<span>至</span>{{ order.endDate }}<span>{{ order.nights + "晚/" + order.roomNum + "间"}}</span></p>
        </div>
        <!-- visa -->
        <div class="detail-box" v-if="order.type === 'visa'">
          <p class="name">{{ order.name }}</p>
          <p class="date"><span>预计</span>{{ order.date }}<span>出发</span></p>
        </div>
        <!-- wifi -->
        <div class="detail-box" v-if="order.type === 'wifi'">
          <p class="name">{{ order.name }}</p>
          <p class="date">{{ order.startDate }}<span>至</span>{{ order.endDate }}<span>{{ order.days + "天/" + order.num + "件"}}</span></p>
        </div>
        <!-- insurance -->
        <div class="detail-box" v-if="order.type === 'insurance'">
          <p class="name">{{ order.name }}</p>
          <p class="date">{{ order.startDate }}<span>至</span>{{ order.endDate }}<span>{{ order.days + "天/" + order.num + "人"}}</span></p>
        </div>
        <!-- verify -->
        <div class="detail-box" v-if="order.type === 'verify'">
          <p class="name">{{ order.name }}</p>
          <p class="date"><span>{{ order.peopleNum + "人 / " + order.copyNum + "副本"}}</span></p>
        </div>
        <div class="price-box">
          <p>
            {{ "¥" + order.amount }}
            <span class="status">未支付</span>
            <span class="refund">2人退款</span>
          </p>
          <div class="btn-wrapper">
            <span class="btn btn-grey">删除</span>
            <span class="btn">再次预定</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.status = Number(this.$route.params.status) || 1;
    },
    data () {
      return {
        orderList: [
          {
            type: "hotel",
            cname: "北京王府井希尔顿酒店",
            ename: "Hilton Beijing Wfz",
            address: "125/4-7 Suvka Lejah Mearz(Lazour)",
            startDate: "2017/01/20",
            endDate: "2017/01/22",
            roomNum: 1,
            nights: 2,
            amount: 698,
            status: 1
          },
          {
            type: "visa",
            name: "加拿大旅游签证 五年多次简单资料",
            date: "2017/01/30",
            amount: 3311,
            status: 1
          },
          {
            type: "wifi",
            name: "日本WiFi",
            startDate: "2017/01/20",
            endDate: "2017/01/25",
            num: 2,
            days: 5,
            amount: 221,
            status: 2
          },
          {
            type: "insurance",
            name: "“乐游全球”境外旅行保障计划（黄金计划）",
            startDate: "2017/01/20",
            endDate: "2017/01/25",
            num: 2,
            days: 5,
            amount: 115,
            status: 1
          },
          {
            type: "verify",
            name: "出生医学证明",
            peopleNum: 2,
            copyNum: 5,
            amount: 551,
            status: 1
          }
        ],
        status: 1
      }
    },
    methods: {
      switchStatus (n) {
        this.status = n;
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
