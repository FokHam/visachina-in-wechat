<template lang="html">
  <div class="insurance-order-detail">
    <div class="order-status">
      <div class="status"
        :class="{ paid: orderDetail.pay_status != 0}">
        订单状态：<span>{{ payStatusTxt[orderDetail.pay_status] }}</span>
      </div>
    </div>
    <div class="order-info"
      @click="goInsuranceDetail">
      <div class="item">
        <span class="content">{{ orderDetail.productName }}</span>
      </div>
      <div class="item">
        <span class="content">投保周期：{{ orderDetail.dateRange }}</span>
      </div>
      <i class="icon-more"></i>
    </div>
    <div class="order-info">
      <div class="item">
        <span class="label">订单编号：</span>
        <span class="content">{{ orderDetail.orderno }}</span>
      </div>
      <div class="item">
        <span class="label">投保份数：</span>
        <span class="content">{{ orderDetail.quantity }}</span>
      </div>
      <div class="item">
        <span class="label">出行目的：</span>
        <span class="content">{{ tripPurpose }}</span>
      </div>
      <div class="item"
        v-if="orderDetail.destination">
        <span class="label">目的地：</span>
        <span class="content">{{ destination }}</span>
      </div>
      <div class="item"
        v-if="orderDetail.visaCity">
        <span class="label">签证办理城市</span>
        <span class="content">{{ orderDetail.visaCity }}</span>
      </div>
      <div class="item">
        <span class="label">订单金额：</span>
        <span class="content enhance">￥{{ orderDetail.totalPrice }}</span>
      </div>
      <div class="item">
        <span class="label">承保状态：</span>
        <span class="content enhance">{{ orderDetail.status_detail }}</span>
      </div>
    </div>
    <div class="order-info"
      v-for="ip in orderDetail.insuredPerson">
      <div class="title">
        被保人 <span>{{ ip.surname + ip.name }} {{ ip.spell_surname + ip.spell_name }}</span>
      </div>
      <div class="item">
        <span class="label">证件类型：</span>
        <span class="content">{{ idTypeList[ip.id_type] }}</span>
      </div>
      <div class="item">
        <span class="label">证件号码：</span>
        <span class="content">{{ ip.id_number }}</span>
      </div>
      <div class="item">
        <span class="label">出生日期：</span>
        <span class="content">{{ ip.birthday }}</span>
      </div>
      <div class="item">
        <span class="label">性别：</span>
        <span class="content">{{ sexualList[ip.sexual] }}</span>
      </div>
      <div class="item">
        <span class="label">承保费用：</span>
        <span class="content">￥{{ ip.singlePrice }}</span>
      </div>
    </div>
    <div class="order-info">
      <div class="title">
        投保人 <span>{{ orderDetail.policyHolder.surname + orderDetail.policyHolder.name }} {{ orderDetail.policyHolder.spell_surname + orderDetail.policyHolder.spell_name }}</span>
      </div>
      <div class="item">
        <span class="label">证件类型：</span>
        <span class="content">{{ idTypeList[orderDetail.policyHolder.id_type] }}</span>
      </div>
      <div class="item">
        <span class="label">证件号码：</span>
        <span class="content">{{ orderDetail.policyHolder.id_number }}</span>
      </div>
      <div class="item">
        <span class="label">出生日期：</span>
        <span class="content">{{ orderDetail.policyHolder.birthday }}</span>
      </div>
      <div class="item">
        <span class="label">手机号码：</span>
        <span class="content">{{ orderDetail.policyHolder.phone }}</span>
      </div>
      <div class="item">
        <span class="label">电子邮箱</span>
        <span class="content">{{ orderDetail.policyHolder.email }}</span>
      </div>
    </div>
    <div class="order-info">
      <div class="item">
        <span class="label">受益人</span>
        <span class="content">法定受益人</span>
      </div>
    </div>
    <div class="order-button" v-if="orderDetail.pay_status == 0">
      <span class="price">保费：<span class="amount">￥{{ orderDetail.totalPrice }}</span></span>
      <span class="button pay-button" @click="payOrder">立即支付</span>
    </div>
    <div class="order-button" v-if="orderDetail.pay_status == 2&&orderDetail.refundFlag == 1">
      <span class="button cancel-button" @click="refundMsg=true">取消策略</span>
      <span class="button pay-button" @click="refundOrder">申请退款</span>
    </div>
    <div class="order-button" v-if="orderDetail.pay_status == 2&&orderDetail.refundFlag == 0">
      <span class="button cancel-button" @click="refundMsg=true">取消策略</span>
      <span class="button pay-button" @click="goInsuranceDetail">再次预定</span>
    </div>
    <message 
    v-if="refundMsg"
    @close="refundMsg=false"
    :text="'保险生效日期' + orderDetail.beginDate + ' 00:00:00前可以免费取消。逾期不可以取消。'">
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
        refundMsg:false,
        payStatusTxt:{"-2":"已退款","0":"未支付","2":"已支付"},
        sexualList: ["", "男", "女"],
        idTypeList: ["", "身份证", "护照", "出生证", "驾照", "港澳通行证", "军官证", "台胞证", "警官证"],
        orderDetail: {
          insuredPerson: [],
          policyHolder: {}
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
        this.$http.get(url, {params: send}).then((response) => {
          console.log(response.body);
          let body = JSON.parse(response.body);
          this.orderDetail = body.data;
        }, (response) => {
          console.log("服务器错误");
        });
      },
      goInsuranceDetail () {
        let url = "/insuranceDetail/" + this.orderDetail.product; //todo: 接口返回产品id后跳转
        this.$router.push(url);
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
                _this.$router.push('/insuranceSuccess/' + _this.$route.params.id)  
              }
            }
          });
        });
      }
    },
    computed: {
      tripPurpose () {
        let arr = ["", "旅游", "商务", "探亲", "留学", "务工", "其他"];
        return arr[this.orderDetail.tripPurposeId];
      },
      destination () {
        return this.orderDetail.destination.join("、");
      }
    },
    components: {
      Message
    }
  }
</script>

<style lang="less" scoped>
  .order-status {
    height: 4rem;
    background: url(/static/images/common/order-bg.png) no-repeat center;
    background-size: cover;
    margin-bottom: 0.3rem;
    .status{
      line-height: 4rem;
      color: #fff;
      font-size: 0.8rem;
      text-align: right;
      background-image: url('/static/images/common/icon-unpay.png');
      background-size: auto 2.6rem;
      background-repeat: no-repeat;
      background-position: left center;
      width: 13rem;
      margin: 0 auto;
      &.paid{
        background-image: url('/static/images/common/icon-pay.png');
      }
      span{
        color: #fff;
        font-size: 0.9rem;
      }
    }
  }
  .insurance-order-detail {
    padding-bottom: 2.3rem;
  }
  .title {
    padding-bottom: 0.3rem;
    font-size: 0.7rem;
    border-bottom: 1px solid #eee;
    margin-right: -1rem;
    color: #999;
    span {
      margin-left: 0.3rem;
      color: #999;
    }
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
    width: 4.5rem;
  }
  .content {
    flex: 1;
    color: #666;
    &.enhance {
      color: #58a6ea;
    }
    small {
      color: #999;
      font-size: 0.6rem;
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
</style>
