<template>
<div class="wifi-order" id="wifi-order">
  <div class="top-part">
    <span class="left"></span><span class="right"></span>
    <div class="tit">{{pageData.name}}</div>
    <div class="counter">{{pageData.company}}</div>
    <div class="txt">最少预定{{pageData.erp_min_days}}天，最多预定90天</div>
  </div>
  <div class="quantity">
    <div class="tit">预定台数<span>(最多可预定5台)</span></div>
    <div class="count">
      <div class="btn less" :class="{off:quantity==1}" @touchstart="quantityLess"></div>
      <div class="ipt"><input type="number" readonly="readonly" v-model="quantity" maxlength="3"></div>
      <div class="btn plus" :class="{off:quantity==5}" @touchstart="quantityAdd"></div>
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
      <div class="txt">{{getAddress.name}}</div>
    </div>
    <div class="item" @click="counterDis=true,counterType=0">
      <div class="tit">还件点</div>
      <div class="txt">{{returnAddress.name}}</div>
    </div>
  </div>
  <div class="contactinfo">
    <div class="name item">
      <span class="txt">联系人</span>
      <span class="ipt"><input type="text" v-model="contactInfo.info.name" placeholder="请填写联系人姓名"></span>
    </div>
    <div class="phone item">
      <span class="txt">手机号</span>
      <span class="ipt"><input type="tel" v-model="contactInfo.info.tel" placeholder="接收订单确认信息"></span>
    </div>
    <div class="email item">
      <span class="txt">邮&#12288;箱</span>
      <span class="ipt"><input type="email" v-model="contactInfo.info.email" placeholder="请填写联系人邮箱"></span>
    </div>
    <div class="icon" @click="contactInfo.contact = true"></div>
  </div>
  <div class="creatorder">
    <div class="price">订单金额：<span>￥{{totalPrice}}</span></div>
    <div class="creatBtn" @click="verifyData">提交订单</div>
  </div>
  <counter
  v-if="counterDis"
  @comfirm="setCounter"
  @close="counterDis = false"
  :type="counterType">    
  </counter>
  <calendar
    v-if="pickingDate"
    v-on:confirm="setDate"
    type1="取件"
    type2="还件"
    :multipleDate="multipleDate"
    :pickType ="pickingType"
    :minDay="minday"
    :maxDay="maxday"
    :day1="startDate"
    :day2="endDate">
  </calendar>
  <contact-list
  v-if="contactInfo.contact"
  @confirm="contactConfirm"
  @close="contactInfo.contact=false">
  </contact-list>
</div>
</template>

<script>
import Calendar from "../../components/Calendar.vue";
import ContactList from "../../components/ContactList.vue";
import Counter from "./wifiorder/Counter.vue";
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
  name:"wifi-order",
  created: function () {
    document.title = '填写订单'
    this.getWifiDetails()
  },
  components: {
    Counter,
    Calendar,
    ContactList
  },
  data:function(){    
    return{
      pageData:{},
      quantity:1,
      getWifiTime:'',
      returnWifiTime:'',
      counterType:1,
      counterDis:false,
      getAddress:{"name":"","id":""},
      returnAddress:{"name":"","id":""},
      contactInfo:{"contact":false,"info":{"name":"","tel":"","email":""}},
      totalPrice:0,
      //calendar
      singleTime:0,
      minday:1,
      maxday:90,
      startDate:'',
      endDate:'',
      multipleDate:true,
      pickingType:1,
      pickingDate:false      
    }
  },
  methods:{
    getWifiDetails:function(){      
      Indicator.open('加载中...')
      var url = '/api/wifi/info?id='+this.$route.params.id
      this.$http.get(url).then(function(result){
        Indicator.close()
        console.log(result.body)
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.pageData = rst.data
          this.minday = parseInt(rst.data.erp_min_days)
          this.dateReset()
        }else {
          console.log(rst.msg)
        }
      });
    },
    dateReset:function(){
      var today = new Date();
      var sTime = new Date(today.getTime()+24*60*60*1000);
      var eTime = new Date(sTime.getTime()+24*60*60*1000*(this.pageData.erp_min_days-1));
      this.startDate = new Date(sTime.getFullYear(),sTime.getMonth(),sTime.getDate());
      this.endDate = new Date(eTime.getFullYear(),eTime.getMonth(),eTime.getDate());
    },
    quantityLess:function(){
      if (this.quantity == 1) {
        return false
      }
      this.quantity -= 1
    },
    quantityAdd:function(){
      if (this.quantity == 5) {
        return false
      }
      this.quantity += 1
    },
    setDate:function(s,e){
      this.pickingDate = false
      this.startDate = s
      this.endDate = e
      this.getWifiTime = s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate()
      this.returnWifiTime = e.getFullYear()+'-'+(e.getMonth()+1)+'-'+e.getDate()
    },
    setCounter:function(n,id){
      if (this.counterType == 1) {
        this.getAddress.name = n
        this.getAddress.id = id
      }
      if (this.counterType == 0) {
        this.returnAddress.name = n
        this.returnAddress.id = id
      }
      this.counterDis = false
    },
    contactConfirm:function(v){
      this.contactInfo.info=v
      this.contactInfo.contact=false
    },
    DateDiff:function(sDate1,sDate2){//sDate1和sDate2是2006-12-18格式  
      var aDate,oDate1,oDate2,iDays;
      aDate = sDate1.split("-");
      oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
      aDate = sDate2.split("-");
      oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); 
      iDays = parseInt(Math.abs(oDate1-oDate2) / 1000 / 60 / 60 / 24);
      return  iDays  
    },
    verifyData:function(){
      if (this.returnWifiTime == '') {
        Toast('请选择取还件日期')
        return false
      }else if (this.getAddress.id == '' || this.returnAddress.id == '') {
        Toast('请选择取还件地点')
        return false
      }else if (this.contactInfo.info.name == '' || this.contactInfo.info.tel == '' || this.contactInfo.info.email == '') {
        Toast('请完善联系人信息')
        return false
      }else{
        this.creatOrder()
      }
    },
    creatOrder:function(){
      Indicator.open('提交订单');
      var send = {
        productId:this.$route.params.id,
        count:this.quantity,
        useDate:this.getWifiTime,
        useEndDate:this.returnWifiTime,
        takeAddress:this.getAddress.id,
        returnAddress:this.returnAddress.id,
        contactName:this.contactInfo.info.name,
        contactMobile:this.contactInfo.info.tel,
        contactEmail:this.contactInfo.info.email
      };
      let header = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };
      var url = '/api/wifi/create_order';
      this.$http.post(url,send).then(function(result){
        Indicator.close();
        console.log(result.body)
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.$router.push('/wifiOrderDetail/'+rst.data.orderno)
        }else{
          Toast(rst.msg)
        }
      });
    }
  },
  watch:{
    returnWifiTime:function(old){
      var days = this.DateDiff(this.getWifiTime,this.returnWifiTime)
      var price = this.quantity * (days+1) * this.pageData.unitPrice
      this.totalPrice = price.toFixed(2)
    },
    quantity:function(old){
      if (this.returnWifiTime != '') {
        var days = this.DateDiff(this.getWifiTime,this.returnWifiTime)
        var price = old * (days+1) * this.pageData.unitPrice
        this.totalPrice = price.toFixed(2)
      }      
    },
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
      span{
        font-size: 0.5rem;
        color: #999999;
        padding-left: 0.5rem;
      }
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
