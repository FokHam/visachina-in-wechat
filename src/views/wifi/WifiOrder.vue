<template>
<div class="wifi-order" id="wifi-order">
  <div class="top-part">
    <span class="left"></span><span class="right"></span>
    <div class="tit">日本旅行WIFI租赁（广州取还）</div>
    <div class="counter">环球漫游柜台</div>
    <div class="txt">最小预定3天，最多预定99天</div>
  </div>
  <div class="quantity">
    <div class="tit">预定台数</div>
    <div class="count">
      <div class="btn less" :class="{off:quantity==1}" @click="quantityLess"></div>
      <div class="ipt"><input type="number" v-model="quantity" maxlength="3"></div>
      <div class="btn plus" @click="quantity+=1"></div>
    </div>
  </div>
  <div class="ordeript">
    <div class="item" @click="pickingDate=true,pickingType=1">
      <div class="tit">取件日期</div>
      <div class="txt">{{getWifiTime}}</div>
    </div>
    <div class="item" @click="pickingDate=true,pickingType=2">
      <div class="tit">还件日期</div>
      <div class="txt">{{returnWifiTime}}</div>
    </div>
    <div class="item" @click="counterDis=true,counterType=1">
      <div class="tit">取件点</div>
      <div class="txt">{{getAddress}}</div>
    </div>
    <div class="item" @click="counterDis=true,counterType=2">
      <div class="tit">还件点</div>
      <div class="txt">{{returnAddress}}</div>
    </div>
  </div>
  <div class="contactinfo">
    <div class="name item">
      <span class="txt">联系人</span>
      <span class="ipt"><input type="text" placeholder="请填写联系人姓名"></span>
    </div>
    <div class="phone item">
      <span class="txt">手机号</span>
      <span class="ipt"><input type="tel" placeholder="接收订单确认信息"></span>
    </div>
    <div class="email item">
      <span class="txt">邮&#12288;箱</span>
      <span class="ipt"><input type="email" placeholder="请填写联系人邮箱"></span>
    </div>
    <div class="icon"></div>
  </div>
  <div class="creatorder">
    <div class="price">订单金额：<span>￥1250</span></div>
    <div class="creatBtn">立即支付</div>
  </div>
  <counter
  v-if="counterDis"
  @comfirm="setCounter"
  :id="$route.params.id">    
  </counter>
  <calendar
    v-if="pickingDate"
    v-on:confirm="setDate"
    type1="取件"
    type2="还件"
    :multipleDate="multipleDate"
    :pickType ="pickingType"
    :minDay="minDay"
    :maxDay="maxDay"
    :day1="startDate"
    :day2="endDate">
  </calendar>
</div>
</template>

<script>
import Calendar from "../../components/Calendar.vue";
import Counter from "./wifiorder/Counter.vue";
import { Indicator } from 'mint-ui'
export default {
  name:"wifi-order",
  beforeCreate(){
    document.title = '填写订单'
    Indicator.open('加载中...')
  },
  created: function () {
    Indicator.close()
    
  },
  components: {
    Counter,
    Calendar
  },
  data:function(){
    var sTime = new Date(),eTime = new Date(sTime.getTime() + 24*60*60*1000*2)
    return{
      quantity:1,
      getWifiTime:'',
      returnWifiTime:'',
      counterType:1,
      counterDis:false,
      getAddress:'',
      returnAddress:'',




      //calendar
      minDay:3,
      maxDay:99,
      singleTime: 0,
      startDate: new Date(sTime.getFullYear(),sTime.getMonth(),sTime.getDate()),
      endDate: new Date(eTime.getFullYear(),eTime.getMonth(),eTime.getDate()),
      multipleDate: true,
      pickingType: 1,
      pickingDate: false      
    }
  },
  methods:{
    quantityLess:function(){
      if (this.quantity == 1) {
        return false
      }
      this.quantity -= 1
    },
    setDate:function(s,e){
      this.pickingDate = false
      this.startDate = s
      this.endDate = e
      this.getWifiTime = s.getFullYear()+'年'+(s.getMonth()+1)+'月'+s.getDate()+'日'
      this.returnWifiTime = e.getFullYear()+'年'+(e.getMonth()+1)+'月'+e.getDate()+'日'
    },
    setCounter:function(t){
      if (this.counterType == 1) {
        this.getAddress = t
      }
      if (this.counterType == 2) {
        this.returnAddress = t
      }
      this.counterDis = false

    }
  },
  watch:{
    quantity:function(old){
      if (old < 1) {
        this.quantity = 1
      }
      
    }
  }
}

</script>

<style lang="less" scoped>
.wifi-order{
  .top-part{
    margin:10px 10px 0;
    background-image: url('/static/images/wifi/bg-top.png');
    background-color: #5db3ea;
    background-size: auto 100%;
    background-repeat: no-repeat;
    padding: 20px 0;
    border-radius: 10px;
    position: relative;
    span{
      height: 1rem;width: 1rem;background-color: #f6f6f6;
      border-radius: 0.9rem;position: absolute;
      top: 55%;
      &.left{left: -0.5rem;}
      &.right{right: -0.5rem;}
    }
    .tit{
      font-size: 0.8rem;padding-bottom: 10px;
      color: #fff;text-align: center;
    }
    .counter{
      font-size: 0.7rem;padding-bottom: 25px;
      color: #fff;text-align: center;
    }
    .txt{
      font-size: 0.6rem;
      color: #0EEEEE;text-align: center;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.5);
      padding-bottom: 8px;
    }
  }
  .quantity{ 
    padding:50px 10px 20px;margin-top: -30px;margin-bottom: 10px;
    background-color: #fff;height: 20px;overflow: hidden;
    .tit{
      float: left;font-size: 0.7rem;line-height: 20px;
    }
    .count{
      float: right;
      height: 20px;
      .btn{
        height: 1rem;width: 1rem;float: left;
        background-color: #008be4;border-radius: 2px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0.6rem;        
        &.off{
          background-color: #eeeeee;
        }
        &.less{background-image: url('/static/images/wifi/icon-less.png');}
        &.plus{background-image: url('/static/images/wifi/icon-plus.png');}
      }
      .ipt{
        height: 1rem;float: left;width: 1.6rem;
        padding: 0 0.1rem;
        input{
          height: 1rem;
          width: 1.6rem;
          border: none;
          background-color: #fff;
          display: block;
          text-align: center;
          font-size: 0.7rem;
        }
      }
    }
  }
  .ordeript{
    padding: 0 10px;
    margin-bottom: 10px;
    .item{
      margin-bottom: 5px;height: 37px;position: relative;
      background-color: #fff;border-radius: 3px;
      &:last-child{margin-bottom: 0;}
      .tit{
        font-size: 0.7rem;line-height: 37px;padding-left: 10px;
        width: 90px;position: absolute;left: 0;top: 0;
      }
      .txt{
        padding-left: 100px;margin-right:10px;
        font-size: 0.7rem;color: #008BE4;
        text-align: right;line-height: 37px;height: 37px;
        background-image: url('/static/images/wifi/icon-right-gray.png');
        background-repeat: no-repeat;
        background-position:right center;
        background-size: 10px; padding-right: 20px; 
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .contactinfo{
    padding-left: 10px;position: relative;
    background-color: #fff;
    margin: 0 10px 70px;
    border-radius: 3px;
    .item{position: relative;
      height: 40px;line-height: 40px;
      border-top: 1px solid #CCCCCC;
      .ipt{padding-left: 60px;
        display: block;
        input{
          border: none;color: #000;
          display: block;
          background-color: #fff;
          width: 100%;
          line-height: 40px;        
        }
      }
      .txt{
        position: absolute;left: 0;top: 0;line-height: 40px;
        font-size: 0.7rem;color: #000;padding-right: 5px;width: 60px;
      }
      &:first-child{border-top: none;}
      &.name,&.phone{margin-right: 55px;border-right: 1px solid #CCCCCC;}
    }
    .icon{
      height: 80px;width: 55px;
      background-image: url('/static/images/visa/icon-contact.png');
      background-size: 22px;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      top: 0;right: 0;
    }
  }
  .creatorder{
    padding:10px 0;height: 30px;
    background-color: #fff;
    overflow: hidden;
    margin-top: 20px;
    position: fixed;bottom: 0;width: 100%;
    .price{
      float: left;margin-left: 10px;
      line-height: 30px;
      font-size: 0.7rem;
      span{
        color: #F55301;font-size: 0.8rem;
      }
    }
    .creatBtn{
      background-color: #008BE4;padding: 0 20px;margin-right: 10px;
      line-height: 30px;text-align: center;border-radius: 4px;
      font-size: 0.7rem;color: #fff;display: inline-block;float: right;
    }
  }
}
</style>
