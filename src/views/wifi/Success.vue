<template>
<div class="order-success" id="order-success">
  <div class="status">
    <div class="txt">支付成功</div>
  </div>
  <div class="orderinfo">
    <div class="top"></div>
    <div class="line"></div>
    <div class="detail">
      <div class="proname" @touchstart="tapsuccess">日本WIFI</div>
      <div class="desc">
        <div class="txt">江思敏购买了日本WIFI</div>
        <div class="date">使用时间：<span>2017/1/30</span>至<span>2017/2/9</span></div>
        <div class="location">取机地点：<span>深圳宝安机场T3国际出发</span></div>
        <div class="time">2017/1/30 21:15</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default{
  name: 'order-success',
  created: function () {
    document.title = '订单详情'
  },
  data:function(){
    return{
      
    }
  },
  methods:{
    tapsuccess:function(){
      WeixinJSBridge.invoke(
         'getBrandWCPayRequest', {
             "appId" : gsfdgfdgsfd,
             "timeStamp" : dsfgsdfgdsfg,
             "nonceStr" : nondfsgdfsceStr,
             "package" : sdfgsdfgsdf,
             "signType" : "MD5",
             "paySign" : sign
         },
         function(res){
          console.log(res)
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
      
    }
  }
}
</style>
