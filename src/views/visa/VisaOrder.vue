<template>
<div class="visa-order" id="visa-order">
  <div class="top-part" v-if="visaInfomation != ''">
    <div class="tit">{{visaInfomation.name}}</div>
    <div class="desc">停留天数{{visaInfomation.info.staydays}}，有效期限{{visaInfomation.info.expirydate}}，{{visaInfomation.info.interview==0?'无需面试':'需要面试'}}</div>
    <!--<div class="estimated">
      <div class="inner" @click="openDatepicker">
        <span v-if="estimated_date != ''">{{estimated_date}}<i>出行</i></span>
        <span v-else>预计什么时候出发？</span>
      </div>
    </div>-->
  </div>
  <div class="clientname">
    <div class="item-hd">
      <div class="tit">申请人<i class="help">help</i></div>
      <div class="addbtn" @click="comDisplay.passenger=true,pushHistory()">添加申请人</div>
    </div>
    <div class="namelist" v-if="visaOrderData.passenger.length != 0">
      <ul>
        <li v-for="(item, index) in visaOrderData.passenger" :class="{left:index % 2 == 0}"><span class="name">{{item.surname+item.name}}</span><span class="type">{{typeList[item.type-1]}}</span></li>
      </ul>
    </div>
  </div>
  <div class="contactinfo">
    <div class="name item">
      <span class="txt">联系人</span>
      <span class="ipt"><input v-model="visaOrderData.contact.name" type="text" placeholder="请填写联系人姓名"></span>
    </div>
    <div class="phone item">
      <span class="txt">手机号</span>
      <span class="ipt"><input v-model="visaOrderData.contact.tel" type="text" placeholder="接收订单确认信息"></span>
    </div>
    <div class="email item">
      <span class="txt">邮&#12288;箱</span>
      <span class="ipt"><input v-model="visaOrderData.contact.email" type="text" placeholder="请填写联系人邮箱"></span>
    </div>
    <div class="icon" @click="comDisplay.contact=true"></div>
  </div>
  <div class="invoice" @click="setInvoice">
    <span>发票</span><i v-if="visaOrderData.invoice.need == 1">{{visaOrderData.invoice.header}}</i>
  </div>
  <div class="express">
    <div class="item-hd">
      <div class="tit">收货地址</div>
      <div class="addbtn" v-if="visaOrderData.express.name == ''" @click="comDisplay.delivery=true">添加地址</div>
      <div class="addbtn" v-else @click="comDisplay.delivery=true">修改地址</div>
    </div>
    <div class="addressinfo" v-if="visaOrderData.express.name != ''">
      <div class="item">
        <span class="txt">收&#8194;货&#8194;人：</span>
        <span class="name">{{visaOrderData.express.name}}</span>
        <span class="phone">{{visaOrderData.express.phone}}</span>
      </div>
      <div class="item">
        <span class="txt">收货地址：</span>
        <span class="adrs">{{visaOrderData.express.province + visaOrderData.express.city + visaOrderData.express.zone + visaOrderData.express.address}}</span>
      </div>
    </div>
  </div>
  <div class="placehold"></div>
  
  <div class="creatorder">
    <div class="price">订单金额：<span>￥{{totalPrice}}</span></div>
    <div class="creatBtn" @click="verifyData">提交订单</div>
  </div>
  <visa-passenger-list
  v-show="comDisplay.passenger"
  @confirm="passengerConfirm"
  @close="comDisplay.passenger=false">
  </visa-passenger-list>
  <contact-list
  v-if="comDisplay.contact"
  @confirm="contactConfirm"
  @close="comDisplay.contact=false">
  </contact-list>
  <address-list
  v-if="comDisplay.delivery"
  @confirm="deliveryConfirm"
  @close="comDisplay.delivery=false">
  </address-list>

</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import VisaPassengerList from './visaorder/VisaPassengerList'
import ContactList from "../../components/ContactList"
import AddressList from "../../components/AddressList"
export default{
  name: 'visa-order',
  beforeCreate:function(){
    document.title = "填写订单"
  },
  created: function () {
    this.getVisaDetail()
  },
  data:function(){
    return{
      visaOrderData:this.visaOrderData,
      typeList:['在职','自由职业','在校学生','退休人员','学龄前儿童','家庭主妇'],
      visaInfomation:'',
      totalPrice:0,
      comDisplay:{"passenger":false,"contact":false,"delivery":false}
    }
  },
  methods:{
    getVisaDetail:function(){
      Indicator.open('加载中...');
      var url = '/api/visa/info?id='+this.$route.params.id
      this.$http.get(url).then(function(result){
        Indicator.close();
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.visaInfomation = rst.data
        }else {
          console.log(rst.msg)
        }
      });
    },
    setInvoice:function(){
      this.$store.commit('orderDataSave',this.visaOrderData);
      this.$router.push('/visaInvoice');
    },
    passengerConfirm:function(v){
      this.visaOrderData.passenger=v
      history.go(-1)
      this.comDisplay.passenger=false
    },
    contactConfirm:function(v){
      this.visaOrderData.contact=v
      history.go(-1)
      this.comDisplay.contact=false
    },
    deliveryConfirm:function(v){
      this.visaOrderData.express=v
      history.go(-1)
      this.comDisplay.delivery=false
    },
    setProposer:function(v){
      this.proposerInfo.info = v
      this.proposerInfo.proposer = false
    },
    pushHistory:function(){
      var state = {  
        title: document.title,
        url: document.location.href  
      };  
      window.history.pushState(state,document.title, document.location.href);
    },
    verifyData:function(){
      if (this.visaOrderData.passenger.length == 0) {
        Toast('您还未添加签证申请人')
        return false
      }else if (this.visaOrderData.contact.name == '' || this.visaOrderData.contact.tel == '' || this.visaOrderData.contact.email == '') {
        Toast('请选择或完善联系人资料')
        return false
      }else if (this.visaOrderData.express.name == '') {
        Toast('请选择收件地址')
        return false
      }else{
        this.creatOrder()
      }
    },
    creatOrder:function(){
      Indicator.open('提交订单');
      var send = {
        "id":this.$route.params.id,
        "customers":this.visaOrderData.passenger,
        "contact":this.visaOrderData.contact,
        "shipping":{"method":1,"shippingId":this.visaOrderData.express.id},
        "invoice":this.visaOrderData.invoice
      };
      let header = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };
      var url = '/api/visa/create_order';
      this.$http.post(url,send).then(function(result){
        Indicator.close();
        console.log(result.body)
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.$store.commit('orderDataClear');
          this.$router.push('/visaOrderDetail/'+rst.data.orderno)
        }else{
          Toast(rst.msg)
        }
      });
    }
  },
  watch:{
    visaOrderData:{
　　　handler(){
        this.totalPrice = this.visaOrderData.passenger.length * this.visaInfomation.price
　　　},
　　　deep:true
　　}
  },
  components:{
    VisaPassengerList,
    ContactList,
    AddressList
  },
  computed: {
    visaOrderData () {
      return this.$store.state.visa.orderPageData;
    }
  }
}
</script>

<style lang="less" scoped>
.visa-order{
  .top-part{
    background-image: url('/static/images/visa/top-bg.png');
    background-size: 1.25rem;height: 6.8rem;position: relative;
    margin: 0.5rem;border-radius: 0.25rem;color: #fff;
    padding: 0.75rem;overflow: hidden;
    .tit{font-size: 1rem;margin-bottom: 0.25rem;}
    .desc{font-size: 0.8rem;}
    .estimated{
      width: 100%;height: 2.4rem;
      position: absolute;bottom: 0;left: 0;
      background-color: rgba(0, 0, 0, 0.2);
      background-image: url('/static/images/visa/icon-calerder.png');
      background-repeat: no-repeat;background-size: 0.8rem;
      background-position: 0.75rem center;
      .inner{
        margin: 0 0.75rem;height: 2.4rem;
        background-image: url('/static/images/visa/icon-right-white.png');
        background-repeat: no-repeat;background-size: 0.5rem;
        background-position: right center;
        span{
          font-size: 0.8rem;color: #fff;line-height: 2.4rem;padding-left: 1.4rem;
          i{
            display: inline-block;color: #008BE4;
            font-size: 0.6rem;background-color: #fff;
            height: 1rem;line-height: 1rem;
            font-style: normal;width: 2.5rem;
            text-align: center;margin-left: 0.5rem;border-radius: 0.25rem;
          }
        }
      }
    }
  }
  .help{
    display: inline-block;
    width: 0.7rem;
    background-image: url('/static/images/visa/icon-help.png');
    background-size: 0.7rem;
    background-position: center;
    margin: 0 0.25rem;
    font-size: 0.7rem;
    text-indent: -9999px;
    background-repeat: no-repeat;
  }
  .clientname{
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #EEEEEE;
    background-color: #fff;
    padding: 3rem 0.5rem 0.75rem;
    margin-top: -2.9rem;
    .item-hd{
      overflow: hidden;
      .tit{float: left;font-size: 0.7rem;}
      .addbtn{float: right;font-size: 0.7rem;color: #008BE4;display: block;}
    }
    .namelist{
    padding-top: 0.5rem;
      ul{
        overflow: hidden;
        li{
          display: inline-block;float: right;
          width: 45%;margin-bottom: 0.25rem;
          background-color: #EEEEEE;
          height: 1.5rem;line-height: 1.5rem;
          overflow: hidden;
          .name{float: left;font-size: 0.6rem;color: #000000;padding-left: 0.25rem;}
          .type{float: right;font-size: 0.6rem;color: #999999;padding-right: 0.25rem;}
          &.left{float: left;}
        }
      }
    }
  }
  .contactinfo{
    padding-left: 0.5rem;position: relative;
    background-color: #fff;margin-bottom: 0.25rem;
    .item{position: relative;
      height: 2rem;line-height: 2rem;
      border-top: 1px solid #CCCCCC;
      .ipt{padding-left: 3rem;
        display: block;
        input{
          border: none;color: #000;
          display: block;
          background-color: #fff;
          width: 100%;
          line-height: 2rem;
        }
      }
      .txt{
        position: absolute;left: 0;top: 0;line-height: 2rem;
        font-size: 0.7rem;color: #000;padding-right: 0.25rem;width: 3rem;
      }
      &:first-child{border-top: none;}
      &.name,&.phone{margin-right: 2.7rem;border-right: 1px solid #CCCCCC;}
    }
    .icon{
      height: 4rem;width: 2.7rem;
      background-image: url('/static/images/visa/icon-contact.png');
      background-size: 1rem;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      top: 0;right: 0;
    }
  }
  .express {
    background: #fff;
    padding: 0.5rem;;
    .item-hd{
      overflow: hidden;
      .tit{float: left;font-size: 0.7rem;}
      .addbtn{float: right;font-size: 0.7rem;color: #008BE4;display: block;}
      .delitype{float: right;font-size: 0.7rem;color: #999999;}
    }
    .addressinfo{
      padding: 0.3rem 0;
      .item{overflow: hidden;
        line-height: 1.2rem;position: relative;padding-left: 3.7rem;
        span{font-size: 0.6rem;line-height: 1.2rem;display: inline-block;float: left}
        .txt{
          position: absolute;width: 3.7rem;
          left: 0;top: 0;
        }
        .name{padding-right: 0.7rem;}
      }
    }
  }
  .placehold{
    height: 3rem;
  }
  .invoice{
    background: #fff;margin-bottom: 0.25rem;padding: 0.5rem;
    position: relative;
    span{
      display: block;font-size: 0.7rem;
      background-image: url('/static/images/visa/icon-right-gray.png');
      background-repeat: no-repeat;
      background-position: right center;
      background-size: 0.5rem;
    }
    i{
      display: inline-block;font-size: 0.7rem;
      position: absolute;right: 1.5rem;
      top: 0.5rem;
      font-style: normal;
    }
  }
  .creatorder{
    padding: 0.5rem 0;
    height: 1.5rem;
    background-color: #fff;
    overflow: hidden;
    margin-top: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    .price{
      margin-left: 0.5rem;
      float: left;
      line-height: 1.5rem;
      font-size: 0.8rem;
      span{
        color: #F55301;font-size: 0.8rem;
      }
    }
    .creatBtn{
      margin-right: 0.5rem;
      background-color: #008BE4;padding: 0 1rem;
      line-height: 1.5rem;text-align: center;border-radius: 0.2rem;
      font-size: 0.8rem;color: #fff;display: inline-block;float: right;
    }
  }
}
</style>
