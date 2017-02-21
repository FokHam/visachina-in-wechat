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
        <div class="proname">{{pagedata.productName}}</div>
        <div class="desc">
          <div class="txt">{{pagedata.contactName}}购买了{{pagedata.productName}}</div>
          <div class="date">使用时间：<span>{{pagedata.useDate}}</span>至<span>{{pagedata.useEndDate}}</span></div>
          <div class="location">取机地点：<span>{{pagedata.takeAddress.name}}</span></div>
          <div class="location">还机地点：<span>{{pagedata.returnAddress.name}}</span></div>
          <div class="time">{{pagedata.cdate}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default{
  name: 'order-success',
  created: function () {
    document.title = '支付结果'
    this.pagedata()
  },
  data:function(){
    return{
      payStatus:false,
      pagedata:''
    }
  },
  methods:{
    getPayResult:function(){
      Indicator.open('获取支付结果');
      var url = '/api/pay/result',send = {type:"wifi",orderno:this.$route.params.id}
      this.$http.get(url,{params:send}).then(function(result){
        var rst = JSON.parse(result.body)
        this.payStatus = rst.data
        var url = "/api/orders/detail",send={orderno:this.$route.params.id}
        this.$http.get(url,{params:send}).then(function(result){
          Indicator.close();
          var rst = JSON.parse(result.body)
          console.log(result.body)
          if (rst.status == 1) {
            this.pagedata = rst.data
          }else {
            console.log(rst.msg)
          }
        });        
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
      .desc{
        padding:1rem 1rem 0;
        .txt{
          font-size: 0.7rem;
          color: #666666;
          line-height: 1.3rem;
        }
        .date{
          line-height: 1.3rem;
          font-size: 0.7rem;
          color: #999999;
          span{
            color: #018be3;
            font-size: 0.7rem;
          }
        }
        .location{
          line-height: 1.3rem;
          font-size: 0.7rem;
          color: #999999;
          span{
            color: #666666;
            font-size: 0.7rem;
          }
        }
        .time{
          font-size: 0.7rem;
          color:#999999;
          text-align: right;
          padding: 0.8rem 0 1.2rem;
        }
      }
      
    }
  }
}
</style>
