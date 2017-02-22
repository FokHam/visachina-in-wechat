<template>
<div class="order-detail" id="order-detail">
  <div class="orderpage" v-if="orderData != ''">
    <div class="order_tatus">
      <div class="status" :class="{paid:orderData.pay_status == 1}">订单状态：<span v-if="orderData.pay_status == 0">待支付</span><span v-else>已支付</span></div>
    </div>
    <div class="basic_info">
      <dl><dd>订单编号：</dd><dt>{{orderData.orderno}}</dt></dl>
      <dl><dd>预定时间：</dd><dt>{{orderData.cdate}}</dt></dl>
      <dl><dd>订单金额：</dd><dt><span>￥{{orderData.totalPrice}}</span></dt></dl>
    </div>
    <div class="product_info">
      <router-link :to="'/visaDetail/'+orderData.product.id">
        <div class="name">{{orderData.product.name}}</div>
        <div class="desc">停留天数{{orderData.product.info.staydays}}，有效期限{{orderData.product.info.expirydate}}，{{orderData.product.info.interview==0?'无需面试':'需要面试'}}</div>
      </router-link>
    </div>
    <div class="order_items">
      <div class="item" v-for="item in orderData.guests">
        <div class="top" v-if="item.guestStatus > -1">
          <router-link to="/progressDetail">
            <div class="time">{{item.cdate}}</div>        
            <div class="status">{{item.guestStatusName}}</div>
          </router-link>
        </div>
        <div class="top" v-else>
            <div class="time">{{orderData.cdate}}</div>        
            <div class="status">未支付</div>
        </div>
        <div class="center">
          <div class="name">{{item.value}}</div>
          <div class="email">（{{typeList[item.vgroup-1]}}）发送所需资料</div>
        </div>
        <div class="bottom">
          <div class="refund">退款</div>
          <div class="express" v-if="false">顺丰快递 85463654654</div>
        </div>
      </div>
    </div>
    <div class="receive_address">
      <div class="title">邮寄信息</div>
      <div class="content">
        <div class="address">请确认材料原件无误，将材料原件邮寄到以下地址：<br>
        <span class="black">深圳市罗湖区迎春路海外联谊大厦2919室</span> <span class="red">（此地址不接受快递到付，敬请谅解)</span></div>
        <div class="contact">收件人：<span>周方晗</span><span>15692452605</span></div>
      </div>
    </div>
    <div class="contact_address">
      <div class="title">联系人信息</div>
      <div class="content">
        <dl><dd>姓名：</dd><dt>{{orderData.receipt_info.name}}</dt></dl>
        <dl><dd>电话：</dd><dt>{{orderData.receipt_info.tel}}</dt></dl>
        <dl><dd>邮箱：</dd><dt>{{orderData.receipt_info.email}}</dt></dl>
      </div>
    </div>
    <div class="contact_address">
      <div class="title">收货地址</div>
      <div class="content">
        <dl><dd>收件人：</dd><dt><span>{{orderData.delivery_info.name}}</span><span>{{orderData.delivery_info.phone}}</span></dt></dl>
        <dl><dd>地址：</dd><dt>{{orderData.delivery_info.province+orderData.delivery_info.city+orderData.delivery_info.zone+orderData.delivery_info.address}}</dt></dl>
      </div>
    </div>
    <div class="invoce_info" v-if="orderData.invoice">
      <div class="title">发票信息</div>
      <div class="name">{{orderData.invoice.header}}</div>
      <div class="address">{{orderData.invoice.province+orderData.invoice.city+orderData.invoice.zone+orderData.invoice.address}}</div>
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
    document.title = '订单详情';
    this.getData();
  },
  data:function(){
    return{
      typeList:['在职','自由职业','在校学生','退休人员','学龄前儿童','家庭主妇'],
      orderData:''
    }
  },
  methods:{
    getData:function(){      
      Indicator.open('加载订单详情');
      var url = "/api/visa/order_detail",send={orderno:this.$route.params.id}
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
        debug: true,
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
              _this.$router.push('/visaSuccess/' + _this.$route.params.id)  
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
  .basic_info{
    margin-bottom: 0.5rem;
    background: #fff;
    padding: 0.5rem 0.8rem;
    dl{
      overflow:hidden;
      line-height: 1.5rem;
      dd{
        float: left;
        color: #999999;
        font-size: 0.7rem;
        width: 4rem;
      }
      dt{
        float: left;
        color: #333333;
        font-size: 0.7rem;
        span{
          font-size: 0.7rem;
          color: #008be4;
        }
      }
    }
  }
  .product_info{
    margin-bottom: 0.3rem;
    background: #fff;
    padding: 0.5rem 0.8rem;
    .name{
      color: #333333;
      font-size: 0.8rem;
      line-height: 1.5rem;
      margin-bottom: 0.3rem
    }
    .desc{
      color: #999999;
      font-size: 0.6rem;
      line-height: 1.2rem;
    }
    a{
      display: block;
      padding-right: 0.8rem;
      background-image: url('/static/images/visa/icon-right-blue.png');
      background-size: 0.5rem;
      background-repeat: no-repeat;
      background-position: right center;
    }
  }
  .order_items{
    .item{
      margin-bottom: 0.3rem;
      background-color: #fff;
      padding-left: 0.8rem;
      .top{
        padding-right: 0.8rem;
        border-bottom: 1px solid #eeeeee;
        overflow: hidden;
        line-height: 2rem;
        .time{
          float: left;
          font-size: 0.7rem;
          color: #666666;
        }
        .status{
          float: right;
          font-size: 0.7rem;
          color: #008be4;
        }
        a{
          display: block;
          overflow:hidden;
          padding-right: 0.8rem;
          background-image: url('/static/images/visa/icon-right-blue.png');
          background-size: 0.5rem;
          background-repeat: no-repeat;
          background-position: right center;
        }
      }
      .center{
        padding:1rem 0.8rem 0.8rem 0;
        overflow: hidden;
        line-height: 1.5rem;
        .email{
          float: right;
          font-size: 0.7rem;
          color: #008be4;
          border:1px solid #999999;
          border-radius: 0.2rem;
          padding: 0 0.5rem 0 0.5rem;
        }
        .name{
          float: left;
          font-size: 0.8rem;
          color: #333;
        }
      }
      .bottom{
        padding:0 0.8rem 0.8rem 0;
        overflow:hidden;
        .refund{
          float: right;
          border:1px solid #999999;
          border-radius: 0.2rem;
          color: #999999;
          font-size: 0.7rem;
          line-height: 1.5rem;
          padding: 0 0.8rem 0 0.8rem;
        }
        .express{
          float: right;
          font-size: 0.8rem;
          color: #999999;
          line-height: 1.5rem;
        }
      }      
    }
  }
  .receive_address{
    margin-bottom: 0.3rem;
    background-color: #fff;
    padding-left: 0.8rem;
    .title{
      padding-right: 0.8rem;
      border-bottom: 1px solid #eeeeee;
      overflow: hidden;
      line-height: 2rem;
      font-size: 0.8rem;
      color: #999999;
    }
    .content{
      padding-bottom: 0.5rem;
      .address{
        padding: 0.5rem 0.8rem 0.5rem 0;
        line-height: 1.2rem;
        font-size: 0.7rem;
        color: #999999;
        .black{color: #333333;font-size: 0.8rem;}
        .red{color: #ff401a;font-size: 0.8rem;}
      }
      .contact{
        font-size: 0.8rem;
        color: #999999;
        span{
          color: #333333;margin-right: 1rem;font-size: 0.8rem;
        }
      }
    }    
  }
  .contact_address{
    margin-bottom: 0.3rem;
    background-color: #fff;
    padding-left: 0.8rem;
    .title{
      padding-right: 0.8rem;
      border-bottom: 1px solid #eeeeee;
      overflow: hidden;
      line-height: 2rem;
      font-size: 0.8rem;
      color: #999999;
    }
    .content{
      padding:0.5rem 0.8rem 0.5rem 0;
      dl{
        position: relative;
        padding-left: 3.5rem;
        dd{
          font-size: 0.8rem;
          color: #999999;
          line-height: 1.5rem;
          position: absolute;
          left: 0;
          top: 0;
          width: 3.5rem;
        }
        dt{
          font-size: 0.8rem;
          line-height: 1.5rem;
          span{
            font-size: 0.8rem;
            display: inline-block;width: 50%;
          }
        }
      }      
    }    
  }
  .invoce_info{
    margin-bottom: 0.3rem;
    background-color: #fff;
    padding-left: 0.8rem;
    padding-bottom: 0.5rem;
    .title{
      padding-right: 0.8rem;
      overflow: hidden;
      line-height: 2rem;
      font-size: 0.8rem;
      color: #999999;
    }
    .name,.address{
      font-size: 0.8rem;
      color: #333333;
      line-height: 1.4rem;
    }        
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
