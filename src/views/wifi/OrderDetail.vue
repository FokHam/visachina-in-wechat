<template>
<div class="order-detail" id="order-detail">
  <div class="orderpage" v-if="orderData != ''">
    <div class="order_tatus">
      <div class="status" :class="{paid:orderData.pay_status == 1}">订单状态：<span v-if="orderData.pay_status == 0">待支付</span><span v-else>已支付</span></div>
    </div>
    <div class="proname">
      <router-link :to="'/wifiDetail/'+orderData.product">{{orderData.productName}}</router-link>
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
    
    <div class="creatpay" v-if="orderData.pay_status == 0">
      <div class="price">合计：<span>￥{{orderData.totalPrice}}</span></div>
      <div class="creatBtn" @click="payOrder">立即支付</div>
    </div>
    <div class="buyagain" v-else>再次购买</div>
  </div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
import wx from 'weixin-js-sdk'
export default{
  name: 'order-detail',
  created: function () {
    document.title = '订单详情'
    this.getData()
  },
  data:function(){
    return{
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
    payOrder:function(){
      Indicator.open('发起微信支付');
      var url = "/api/pay/index",send = {orderno:this.$route.params.id}
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
              _this.$router.push('/wifiSuccess/' + _this.$route.params.id)  
            }
          }
        });
      });
    }

  }
}
</script>

<style lang="less" scoped>
.order-detail{
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













  
  .creatpay{height: 2.5rem;
    background-color: #fff;
    overflow: hidden;
    .price{
      float: left;
      line-height:2.5rem;
      font-size: 0.8rem;
      width: 50%;
      text-indent: 0.8rem;
      span{
        color: #F55301;font-size: 0.9rem;
      }
    }
    .creatBtn{
      background-color: #008BE4;
      line-height: 2.5rem;
      font-size: 0.8rem;
      color: #fff;
      display: inline-block;
      float: right;
      text-align: center;
      width: 50%;
    }
  }
  .buyagain{
    background-color: #008BE4;
    line-height: 2.5rem;
    font-size: 0.8rem;
    color: #fff;
    text-align: center;
  }
}
</style>
