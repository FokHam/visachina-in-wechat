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
        v-if="status === 1 || (order.status === orderStatus && order.pay_status === payStatus) || (order.status === orderStatus && order.deleteFlag === deleteStatus) || (order.pay_status === payStatus && order.deleteFlag === deleteStatus)">
        <!-- hotel -->
        <div class="detail-box" v-if="order.type === 'hotel'">
          <p class="name" @click="goToDetail(order.type,order.orderno)">{{ order.productName }}</p>
          <p class="address">{{ order.address }}</p>
          <p class="date">{{ order.dateRange }}<span>{{ order.quantity }}</span></p>
        </div>
        <!-- visa -->
        <div class="detail-box" v-if="order.type === 'visa'">
          <p class="name" @click="goToDetail(order.type,order.orderno)">{{ order.productName }}</p>
          <p class="date">{{ order.cdate }}<span> 共{{ order.quantity }}人</span></p>
        </div>
        <!-- wifi -->
        <div class="detail-box" v-if="order.type === 'wifi'">
          <p class="name" @click="goToDetail(order.type,order.orderno)">{{ order.productName }}</p>
          <p class="date">{{ order.dateRange }}<span>{{ order.quantity }}</span></p>
        </div>
        <!-- insurance -->
        <div class="detail-box" v-if="order.type === 'insurance'">
          <p class="name" @click="goToDetail(order.type,order.orderno)">{{ order.productName }}</p>
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
            <span class="status" v-if="order.status >= 0">{{ statusList[order.pay_status] }}</span>
            <span class="refund" v-else>已失效</span>
          </p>
          <div class="btn-wrapper">
            <span class="btn btn-grey" 
            v-if="order.pay_status == 0 && order.status == 0" 
            @click="cancelOrder(order.orderno)">取消订单</span>
            <span class="btn btn-grey" v-if="order.deleteFlag == 1" @click="deleteOrder(order.orderno)">删除订单</span>
            <span class="btn" v-if="order.pay_status == 0 && order.status == 0" @click="payOrder(order.orderno,order.type)">立即支付</span>
            <span class="btn" v-else @click="bookAgain(order)">再次预定</span>
            <span class="btn btn-grey" v-if="order.refundFlag == 1" @click="refundOrder(order.orderno)">退款</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  import { Toast } from 'mint-ui'
  import { Indicator } from 'mint-ui'
  import { MessageBox } from 'mint-ui';
  export default {
    data () {
      return {
        statusList: {
          "-2": "已退款",
          "0": "未付款",
          "2": "已付款"
        },
        orderList: [],
        payStatus: 99,
        orderStatus: 99,
        deleteStatus:99,
        status: 1,
      }
    },
    created () {
      this.getList();
      this.switchStatus(Number(this.$route.params.status) || 1)
    },
    methods: {
      getList () {
        Indicator.open('加载订单列表')
        let url = "/api/orders/list"
        this.$http.get(url).then((response) => {
          Indicator.close()
          console.log(response.body);
          let body = JSON.parse(response.body);
          this.orderList = body.data.rows;
        }, (response) => {
          console.log("服务器错误");
        })
      },
      switchStatus (n) {
        this.status = n;
        switch (n) {
          case 1:
            this.orderStatus = 99;
            this.payStatus = 99;
            this.deleteStatus = 99;
            break;
          case 2:
            this.orderStatus = "0";
            this.payStatus = "0";
            this.deleteStatus = 99;
            break;
          case 3:
            this.orderStatus = 99;
            this.payStatus = "-2";
            this.deleteStatus = 1;
            break;
          case 4:
            this.orderStatus = "-1";
            this.payStatus = 99;
            this.deleteStatus = 1;
            break;
        }
      },
      bookAgain (obj) {
        let url = "/" + obj.type + "Detail/" + obj.product;
        this.$router.push(url);
      },
      goToDetail (type,orderno) {
        switch (type) {
          case 'visa':
          this.$router.push('/visaOrderDetail/'+orderno);
          break;
          case 'hotel':
          this.$router.push('/hotelOrderDetail/'+orderno);
          break;
          case 'wifi':
          this.$router.push('/wifiOrderDetail/'+orderno);
          break;
          case 'insurance':
          this.$router.push('/insuranceOrderDetail/'+orderno);
          break;
        }
      },
      cancelOrder (orderno) {
        MessageBox.confirm('确定取消此订单?').then(action => {
          let api = "/api/orders/cancel",send={orderno:orderno}
          this.$http.get(api,{params:send}).then(function(result){
            let rst = JSON.parse(result.body)
            Toast(rst.msg)
            if (rst.status == 1) {
              this.getList();
            }
          });
        });
      },
      deleteOrder (orderno) {
        MessageBox.confirm('确定删除此订单?').then(action => {
          let api = "/api/orders/delete",send={orderno:orderno}
          this.$http.get(api,{params:send}).then(function(result){
            let rst = JSON.parse(result.body)
            Toast(rst.msg)
            if (rst.status == 1) {
              this.getList();
            }
          });
        });
      },
      refundOrder(orderno){
        MessageBox.confirm('确定申请退款?').then(action => {
          var api = "/api/refund/index",send={
            orderno:orderno
          }
          this.$http.get(api,{params:send}).then(function(result){
            var rst = JSON.parse(result.body)            
            if (rst.status == 1) {
              Toast('退款成功')
              this.getList();
            }else{
              Toast(rst.msg)
            }
          });
        });
      },
      payOrder:function(orderno,type){
        Indicator.open('发起微信支付');
        var url = "/api/pay/index",send = {orderno:orderno}
        this.$http.get(url,{params:send}).then(function(result){
          Indicator.close();
          this.invokingWXPay(result.body,orderno,type)                
        });
      },
      invokingWXPay:function(rst,orderno,type){
        const _this = this
        wx.config({
          debug: false,
          appId: rst.config.appId, // 必填，公众号的唯一标识
          timestamp: rst.config.timestamp, // 必填，生成签名的时间戳
          nonceStr: rst.config.nonceStr, // 必填，生成签名的随机串
          signature: rst.config.signature,// 必填，签名，见附录1
          jsApiList: ["chooseWXPay"]
        });
        wx.ready(function(){
          wx.chooseWXPay({
            timestamp: rst.payParams.timeStamp, 
            nonceStr: rst.payParams.nonceStr, // 支付签名随机串，不长于 32 位
            package: rst.payParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: rst.payParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: rst.payParams.paySign, // 支付签名
            success: function (res) {
              if (res.errMsg == 'chooseWXPay:ok') {
                switch (type) {
                  case 'visa':
                    _this.$router.push('/visaSuccess/' + orderno)
                    break;
                  case 'hotel':
                    _this.$router.push('/hotelSuccess/' + orderno)
                    break;
                  case 'wifi':
                    _this.$router.push('/wifiSuccess/' + orderno)
                    break;
                  case 'insurance':
                    _this.$router.push('/insuranceSuccess/' + orderno)
                    break;                  
                }
              }
            }
          });
        });
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
