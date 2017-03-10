<template lang="html">
  <div class="hotel-order-detail">
    <div class="page-empty" v-if="orderDetail != ''">
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
        <router-link :to="'/hotelMap/' + orderDetail.latitude + '/' + orderDetail.longitude" class="link"><i class="icon-address"></i>酒店地图</router-link>
        <span class="link" @click="callTel(orderDetail.telephone)"><i class="icon-phone"></i>酒店电话</span>
      </div>
      <div class="order-info">
        <div class="item">
          <span class="label">订单状态：</span>
          <span class="content enhance">{{ orderDetail.booking_status_detail }}</span>
        </div>
        <div class="item">
          <span class="label">订单编号：</span>
          <span class="content">{{ orderDetail.orderno }}</span>
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
          <span class="content">{{orderDetail.check_in_end}}</span>
        </div>
        <div class="item">
          <span class="label">入住人：</span>
          <span class="content"><span v-for="item in orderDetail.guest">{{item.name+' '}}</span></span>
        </div>
        <div class="item">
          <span class="label">联系手机：</span>
          <span class="content">{{orderDetail.contact.phone}}</span>
        </div>
      </div>
      <div class="order-button" v-if="orderDetail.pay_status == 0">
        <span class="button cancel-button" @click="cancelOrder">取消订单</span>
        <span class="button pay-button" @click="payOrder">立即支付</span>
      </div>
      <div class="order-button" v-if="orderDetail.pay_status == 2&&orderDetail.refundFlag == 1">
        <span class="button cancel-button" @click="refundMsg=true">取消策略</span>
        <span class="button pay-button" @click="refundOrder">申请退款</span>
      </div>
      <div class="order-button" v-if="orderDetail.pay_status == 2&&orderDetail.refundFlag == 0">
        <span class="button cancel-button" @click="refundMsg=true">取消策略</span>
        <span class="button pay-button" @click="buyAgain">再次预定</span>
      </div>
    </div>
    <message 
    v-if="refundMsg"
    @close="refundMsg=false"
    :text="orderDetail.cancel_policy">
    </message>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  import { Toast } from 'mint-ui'
  import { Indicator } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  import Message from "../../components/Message"
  export default {
    data () {
      return {
        orderDetail: '',
        refundMsg:false
      }
    },
    created () {
      this.getOrder();
    },
    methods: {
      getOrder:function() {
        let url = "/api/orders/detail";
        let send = {
          orderno: this.$route.params.id
        };
        this.$http.get(url, {params: send}).then((response) => {
          console.log(response.body);
          let body = JSON.parse(response.body);
          this.orderDetail = body.data;
        }, (response) => {
          console.log("服务器错误");
        });
      },
      goHotelDetail:function() {
        let url = "/hotelDetail/"+this.orderDetail.product;
        this.$router.push(url);
      },
      callTel:function(num){
        if (num != '') {
          window.location.href = 'tel:'+num
        }else{
          Toast('暂无酒店电话')
        }
      },
      cancelOrder () {
        MessageBox.confirm('确定取消此订单?').then(action => {
          let api = "/api/orders/cancel",send={orderno:this.$route.params.id}
          this.$http.get(api,{params:send}).then(function(result){
            let rst = JSON.parse(result.body)
            Toast(rst.msg)
            if (rst.status == 1) {
              this.getOrder();
            }
          });
        });
      },
      refundOrder () {
        MessageBox.confirm('确定申请退款?').then(action => {
          let api = "/api/refund/index",send={orderno:this.$route.params.id}
          this.$http.get(api,{params:send}).then(function(result){
            var rst = JSON.parse(result.body)            
            if (rst.status == 1) {
              Toast('退款成功')
              this.getOrder();
            }else{
              Toast(rst.msg)
            }
          });
        });
      },
      buyAgain () {
        this.$router.push('/hotelDetail/'+this.orderDetail.product);
      },
      payOrder () {
        Indicator.open('发起微信支付');
        let url = "/api/pay/index",send = {orderno:this.$route.params.id}
        this.$http.get(url,{params:send}).then(function(result){
          Indicator.close();
          this.invokingWXPay(result.body)                
        });
      },
      invokingWXPay:function(rst){
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
                _this.$router.push('/hotelSuccess/' + _this.$route.params.id)  
              }
            }
          });
        });
      }
    },
    components: {
      Message
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
