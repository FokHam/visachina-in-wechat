<template>
<div class="order-success" id="order-success">
  <div class="successpage" v-if="pagedata != ''">
    <div class="status">
      <div class="txt" v-if="payStatus == true">支付成功</div>
      <div class="txt fail" v-else>支付失败</div>
    </div>
    <div class="orderinfo">
      <div class="top"></div>
      <div class="line"></div>
      <div class="detail">
        <div class="proname">{{pagedata.product.name}}</div>
        <div class="list">
          <ul>
            <li v-for="item in pagedata.guests"><span class="name">{{item.value}}</span><span class="type">{{typeList[item.vgroup-1]}}</span></li>
          </ul>
        </div>
        <div class="desc">
          <span class="time">{{pagedata.pay_time}}</span>
        </div>
        <div class="btns">
          <div><span @click="checkOrder()">查看订单</span></div>
          <div><router-link to="/home">返回首页</router-link></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default{
  name: 'order-success',
  created: function () {
    document.title = '支付结果'
    this.getPayResult()
  },
  data:function(){
    return{
      typeList:['在职','自由职业','在校学生','退休人员','学龄前儿童','家庭主妇'],
      payStatus:false,
      pagedata:''
    }
  },
  methods:{
    getPayResult:function(){
      Indicator.open('获取支付结果');
      var url = '/api/pay/result',send = {type:"visa",orderno:this.$route.params.id}
      this.$http.get(url,{params:send}).then(function(result){
        var rst = JSON.parse(result.body)
        this.payStatus = rst.data
        var url_ = "/api/visa/order_detail",send_={orderno:this.$route.params.id}
        this.$http.get(url_,{params:send_}).then(function(result){
          Indicator.close();
          var rst = JSON.parse(result.body)
          if (rst.status == 1) {
            this.pagedata = rst.data
          }else {
            console.log(rst.msg)
          }
        });        
      });
    },
    checkOrder () {
      history.go(-1)
    }

  }
}
</script>

<style lang="less" scoped>
.order-success{
  .status{
    background: -webkit-linear-gradient(top, #5079dc, #475cc2);
    .txt{
      font-size: 1rem;
      color: #fff;
      text-align: center;
      padding: 5rem 0 1rem;
      background-image: url('/static/images/visa/icon-success.png');
      background-position: center 1rem;
      background-size: 3.5rem;
      background-repeat: no-repeat;
      &.fail{
        background-image: url('/static/images/visa/icon-fail.png');
      }
    }
  }
  .orderinfo{
    margin: 1rem 0.5rem;
    .top{
      height: 0.8rem;
      border: 0.2rem solid #507adc;
      background-color: #4643a0;      
      border-radius: 1rem;
    }
    .line{
      margin:-0.7rem 0.2rem 0;
      height: 0.4rem;
      background: -webkit-linear-gradient(top, #4643a0, #fff);
    }
    .detail{
      background-color: #fff;
      background-image: url('/static/images/visa/icon-sx.png');
      background-repeat: no-repeat;
      background-position: center bottom;
      background-size: 2rem;
      margin:0rem 0.2rem 0;
      .proname{
        color: #999999;
        line-height: 2.5rem;
        font-size: 0.8rem;
        padding-left: 1rem;
        border-bottom: 1px dashed #eeeeee;
      }
      .list{
        padding:0.8rem 0 0.8rem 1rem;
        li{
          .name{
            display: inline-block;
            width: 4rem;
            color:#666666;
          }
          .type{
            display: inline-block;
            border:1px solid #999999;
            color: #999999;
            padding:0 0.6rem;
            border-radius: 0.2rem;
          }
        }
      }
      .desc{
        padding:0 0.8rem 1rem 0;
        span{
          display: block;
          text-align: right;
        }
        .txt{
          color: #008be4;
          font-size: 0.8rem;
        }
        .time{
          color: #999999;
          font-size: 0.6rem;
        }
      }
      .btns{
        padding: 0 0 1.2rem;
        overflow: hidden;
        div{
          display: block;
          width: 50%;
          float: left;
          text-align: center;
          a,span{
            display: inline-block;
            height: 1rem;
            border: 1px solid #028DE4;
            color: #028DE4;
            padding: 0.1rem 0.7rem;
            font-size: 0.6rem;
            line-height: 1rem;
            border-radius: 1rem;
          }
        }
      }
    }
  }
}
</style>
