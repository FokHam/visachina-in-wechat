<template lang="html">
  <div class="hotel-order-detail">
    <div class="order-info"
      @click="goHotelDetail">
      <div class="item">
        <span class="label">酒店名称：</span>
        <span class="content">{{ orderDetail.productName }}</span>
      </div>
      <div class="item">
        <span class="label">房型：</span>
        <span class="content">{{ orderDetail.roomName }}</span>
      </div>
      <div class="item">
        <span class="label">间数/晚数：</span>
        <span class="content">{{ orderDetail.quantity }}</span>
      </div>
      <div class="item">
        <span class="label">入住时间：</span>
        <span class="content">{{ orderDetail.dateRange }}</span>
      </div>
      <i class="icon-more"></i>
    </div>
    <div class="order-info hotel-address">
      <div class="item">
        <span class="label">酒店地址：</span>
        <span class="content">{{ orderDetail.address }}</span>
      </div>
    </div>
    <div class="hotel-link">
      <span class="link"><i class="icon-address"></i>酒店地图</span>
      <span class="link"><i class="icon-phone"></i>酒店电话</span>
    </div>
    <div class="order-info">
      <div class="item">
        <span class="label">订单状态：</span>
        <span class="content enhance">{{ orderDetail.pay_status }}</span>
      </div>
      <div class="item">
        <span class="label">订单编号：</span>
        <span class="content">{{ orderDetail.id }}</span>
      </div>
      <div class="item">
        <span class="label">下单时间：</span>
        <span class="content">{{ orderDetail.cdate }}</span>
      </div>
      <div class="item">
        <span class="label">订单金额：</span>
        <span class="content enhance">￥{{ orderDetail.totalPrice }}</span>
      </div>
    </div>
    <div class="order-info">
      <div class="item">
        <span class="label">最晚到店：</span>
        <span class="content">次日5:00</span>
      </div>
      <div class="item">
        <span class="label">入住人：</span>
        <span class="content">张三 李四 王五</span>
      </div>
      <div class="item">
        <span class="label">联系手机：</span>
        <span class="content">12345678912</span>
      </div>
    </div>
    <div class="order-button">
      <span class="button cancel-button">取消订单</span>
      <span class="button pay-button">立即支付</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        orderDetail: {
          id: "",
          totalPrice: "",
          status: "",
          pay_status: "",
          cdate: "",
          productName: "",
          quantity: "",
          dateRange: "",
          name: "",
          roomName: ""
        }
      }
    },
    created () {
      this.getOrder();
    },
    methods: {
      getOrder () {
        let url = "/api/orders/detail";
        let send = {
          orderno: this.$route.params.id
        };
        console.log(send);
        this.$http.get(url, {params: send}).then((response) => {
          console.log(JSON.parse(response.body));
          let body = JSON.parse(response.body);
          this.orderDetail = body.data;
        }, (response) => {
          console.log("服务器错误");
        });
      },
      goHotelDetail () {
        let url = "/hotelDetail/"; //todo: 接口返回产品id后跳转
        this.$router.go(url);
      }
    }
  }
</script>

<style lang="less" scoped>
  .hotel-order-detail {
    padding-bottom: 3rem;
  }
  .order-info {
    background-color: #fff;
    padding: 0.5rem 1rem;
    margin-bottom: 0.7rem;
    position: relative;
    .item {
      display: flex;
      padding: 0.3rem 0;
    }
    .icon-more {
      position: absolute;
      right: 0.5rem;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 0.5rem;
      height: 0.5rem;
      background: url(/static/images/hotel/more.png) center no-repeat;
      background-size: contain;
    }
  }
  .label {
    color: #aaa;
    display: inline-block;
    width: 4rem;
    height: 100%;
  }
  .content {
    flex: 1;
    &.enhance {
      color: #58a6ea;
    }
    small {
      color: #999;
      font-size: 0.6rem;
    }
  }
  .hotel-address {
    margin-top: -0.5rem;
    margin-bottom: 0;
  }
  .hotel-link {
    font-size: 0;
    background-color: #fff;
    padding: 0 0.6rem;
    margin-bottom: 0.7rem;
    .link {
      display: inline-block;
      width: 50%;
      padding: 0.5rem;
      box-sizing: border-box;
      text-align: center;
      border-top: 1px solid #f1f1f1;
      color: #999;
    }
  }
  .order-button {
    font-size: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .button {
      display: inline-block;
      width: 50%;
      box-sizing: border-box;
      padding: 0.7rem 0;
      text-align: center;
    }
    .cancel-button {
      background-color: #fff;
      color: #333;
    }
    .pay-button {
      background-color: #58a6ea;
      color: #fff;
    }
  }
</style>
