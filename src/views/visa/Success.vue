<template>
<div class="order-success" id="order-success">
  <div class="successpage" v-if="pagedata != ''">
    <div class="status">
      <div class="txt" v-if="pagedata.status == 1">支付成功</div>
      <div class="txt" v-else>支付失败</div>
    </div>
    <div class="orderinfo">
      <div class="top"></div>
      <div class="line"></div>
      <div class="detail">
        <div class="proname">法国旅游签证</div>
        <div class="list">
          <ul>
            <li><span class="name">周方晗</span><span class="type">在职</span></li>
            <li><span class="name">张三</span><span class="type">退休</span></li>
          </ul>
        </div>
        <div class="desc">
          <span class="txt">申请了法国旅游签证</span>
          <span class="time">2017-02-07 13:42</span>
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
    document.title = '订单详情'
    this.getPayResult()
  },
  data:function(){
    return{
      pagedata:''
    }
  },
  methods:{
    getPayResult:function(){
      Indicator.open('获取支付结果');
      var url = '/api/pay/result',send = {type:"visa",orderno:this.$route.params.id}
      this.$http.get(url,{params:send}).then(function(result){
        console.log(result.body)
        Indicator.close();
        this.pagedata = JSON.parse(result.body)        
      });
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
    }
  }
}
</style>
