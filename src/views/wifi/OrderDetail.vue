<template>
<div class="order-detail" id="order-detail">
  <div class="orderpage" v-if="orderData != ''">
    <div class="order_tatus">
      <div class="status" :class="{paid:orderData.pay_status != 0}">订单状态：<span>{{ payStatusTxt[orderData.pay_status] }}</div>
    </div>
    <div class="proname">
      <router-link :to="'/wifiDetail/'+orderData.product +'/'+ orderData.city">{{orderData.productName}}</router-link>
    </div>
    <div class="orderinfo">
      <dl><dd>订单金额：</dd><dt><span>￥{{orderData.totalPrice}}</span></dt></dl>
      <dl><dd>订单编号：</dd><dt>{{orderData.orderno}}</dt></dl>
      <dl><dd>租赁数量：</dd><dt>{{orderData.count}}台WIFI机器</dt></dl>
      <dl><dd>取机日期：</dd><dt>{{orderData.useDate}}</dt></dl>
      <dl><dd>还机日期：</dd><dt>{{orderData.useEndDate}}</dt></dl>
      <dl><dd>取机地点：</dd><dt>【{{orderData.takeAddress.name}}】{{orderData.takeAddress.address}}</dt></dl>
      <dl><dd>还机地点：</dd><dt>【{{orderData.returnAddress.name}}】{{orderData.returnAddress.address}}</dt></dl>
      <dl><dd></dd><dt></dt></dl>
    </div>
    <div class="contactinfo">
      <dl><dd>联系人：</dd><dt>{{orderData.contactName}}</dt></dl>
      <dl><dd>联系电话：</dd><dt>{{orderData.contactMobile}}</dt></dl>
      <dl><dd>电子邮箱：</dd><dt>{{orderData.contactEmail}}</dt></dl>
    </div>
    <div class="order-button" v-if="orderData.pay_status == 0">
      <span class="price">合计：<span class="amount">￥{{ orderData.totalPrice }}</span></span>
      <span class="button pay-button" @click="payOrder">立即支付</span>
    </div>
    <div class="order-button" v-if="orderData.pay_status == 2&&orderData.refundFlag == 1">
      <span class="button cancel-button" @click="refundMsg=true">取消策略</span>
      <span class="button pay-button" @click="refundOrder">申请退款</span>
    </div>
    <div class="order-button" v-if="orderData.pay_status == 2&&orderData.refundFlag == 0">
      <span class="button cancel-button" @click="refundMsg=true">取消策略</span>
      <span class="button pay-button" @click="goWifiDetail">再次预定</span>
    </div>
  </div>
  <message 
  v-if="refundMsg"
  @close="refundMsg=false"
  :text="'取件日期' + orderData.useDate + ' 00:00:00前可以免费取消。逾期不可以取消。'">
  </message>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import Message from "../../components/Message"
import wx from 'weixin-js-sdk'
export default{
  name: 'order-detail',
  created: function () {
    document.title = '订单详情'
    this.getData()
  },
  data:function(){
    return{
      refundMsg:false,
      payStatusTxt:{"-2":"已退款","0":"未支付","2":"已支付"},
      orderData:''
    }
  },
  methods:{
    getData:function(){      
      Indicator.open('加载订单详情');
      var url = "/api/orders/detail",send={orderno:this.$route.params.id}
      this.$http.get(url,{params:send}).then(function(result){
        Indicator.close();
        var rst = JSON.parse(result.body)
        console.log(result.body)
        if (rst.status == 1) {
          this.orderData = rst.data
        }else {
          console.log(rst.msg)
        }
      });
    },
    goWifiDetail () {
      let url = "/wifiDetail/" + this.orderData.product;
      this.$router.push(url);
    },
    cancelOrder () {
      MessageBox.confirm('确定取消此订单?').then(action => {
        let api = "/api/orders/cancel",send={orderno:this.$route.params.id}
        this.$http.get(api,{params:send}).then(function(result){
          let rst = JSON.parse(result.body)
          Toast(rst.msg)
          if (rst.status == 1) {
            this.getData();
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
            this.getData();
          }else{
            Toast(rst.msg)
          }
        });
      });
    },
    payOrder:function(){
      Indicator.open('发起微信支付');
      var url = "/api/pay/index",send = {orderno:this.$route.params.id}
      this.$http.get(url,{params:send}).then(function(result){
        Indicator.close();
        if (result.body.config.appId) {
          this.invokingWXPay(result.body)
        }else {
          alert('调起微信支付失败，请重试')
        }             
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
              _this.$router.push('/wifiSuccess/' + _this.$route.params.id)  
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
.order-detail{
  padding-bottom: 2.5rem;
  .order_tatus{
    height: 4rem;
    background-image: url('/static/images/visa/order-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .status{
      line-height: 4rem;
      color: #fff;
      font-size: 0.8rem;
      text-align: right;
      background-image: url('/static/images/visa/icon-unpay.png');
      background-size: auto 2.6rem;
      background-repeat: no-repeat;
      background-position: left center;
      width: 13rem;
      margin: 0 auto;
      &.paid{
        background-image: url('/static/images/visa/icon-pay.png');
      }
      span{
        color: #fff;   
        font-size: 0.9rem;     
      }
    }
  }
  .proname{
    padding: 0 0.8rem;
    background: #fff;    
    margin: 0.5rem 0 0.2rem;
    line-height: 2.5rem;
    a{
      display: block;
      font-size: 0.7rem;
      padding-right: 0.8rem;
      background-image: url('/static/images/visa/icon-right-blue.png');
      background-size: 0.5rem;
      background-repeat: no-repeat;
      background-position: right center;
    }
  }
  .orderinfo,.contactinfo{
    background-color: #fff;
    padding: 0.8rem;
    dl{
      position: relative;
      padding:0 0 0.4rem 3.7rem;
      &:last-child{padding-bottom: 0;}
      dd{
        position: absolute;
        left: 0;top: 0;
        width: 3.7rem;
        font-size: 0.6rem;
        color: #666;
        line-height: 1rem;
      }
      dt{
        font-size: 0.6rem;
        line-height: 1rem;
        span{
          font-size: 0.6rem;
          color: #008ce4;
        }
      }
    }
  }
  .contactinfo{
    margin-top: 1px;
    margin-bottom: 0.5rem;
  }  
  .order-button {
    position: fixed;
    bottom: 0;
    font-size: 0;    
    width: 100%;
    .button {
      display: inline-block;
      width: 50%;
      box-sizing: border-box;
      padding: 0.7rem 0;
      text-align: center;
    }
    .price {
      display: inline-block;
      width: 50%;
      box-sizing: border-box;
      padding: 0.7rem 0;
      background-color: #fff;
      padding-left: 1rem;
      color: #333;
      .amount {
        color: #fc4a4a;
      }
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
}
</style>
