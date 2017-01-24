<template>
<div class="visa-order" id="visa-order">
  <div class="top-part">
    <div class="tit">韩国旅游签证</div>
    <div class="desc">加急办理2个工作日出签，受理全国护照除新
疆、西藏外、广州送签</div>
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
      <div class="addbtn" @click="passengerList.passenger=true">添加申请人</div>
    </div>
    <div class="namelist" v-if="passengerList.list.length != 0">
      <ul>
        <li v-for="(item, index) in passengerList.list" :class="{left:index % 2 == 0}"><span class="name">{{item.name}}</span><span class="type">{{typeList[item.type-1]}}</span></li>
      </ul>
    </div>
  </div>
  <div class="contactinfo">
    <div class="name item">
      <span class="txt">联系人</span>
      <span class="ipt"><input v-model="contactInfo.info.name" type="text" placeholder="请填写联系人姓名"></span>
    </div>
    <div class="phone item">
      <span class="txt">手机号</span>
      <span class="ipt"><input v-model="contactInfo.info.tel" type="text" placeholder="接收订单确认信息"></span>
    </div>
    <div class="email item">
      <span class="txt">邮&#12288;箱</span>
      <span class="ipt"><input v-model="contactInfo.info.email" type="text" placeholder="请填写联系人邮箱"></span>
    </div>
    <div class="icon" @click="contactInfo.contact=true"></div>
  </div>
  <div class="invoice" @click="invoiceData.invoice=true">
    <span>发票</span>
  </div>
  <div class="express">
    <div class="item-hd">
      <div class="tit">收货地址</div>
      <div class="addbtn" v-if="deliveryInfo.info.name == ''" @click="deliveryInfo.delivery=true">添加地址</div>
      <div class="addbtn" v-else @click="deliveryInfo.delivery=true">修改地址</div>
    </div>
    <div class="addressinfo" v-if="deliveryInfo.info.name != ''">
      <div class="item">
        <span class="txt">收&#8194;货&#8194;人：</span>
        <span class="name">{{deliveryInfo.info.name}}</span>
        <span class="phone">{{deliveryInfo.info.phone}}</span>
      </div>
      <div class="item">
        <span class="txt">收货地址：</span>
        <span class="adrs">{{deliveryInfo.info.province + deliveryInfo.info.city + deliveryInfo.info.zone + deliveryInfo.info.address}}</span>
      </div>
    </div>
  </div>
  <div class="recommend">
    <div class="title">签证推荐服务</div>
    <div class="insurance">
      <div class="tit">保险</div>
      <div class="pro_info">
        <div class="checkbox" :class="{check:insuranceCheck}" @click="insuranceCheck=!insuranceCheck"></div>
        <div class="name">“乐游全球”境外旅行保障计划钻石计划</div>
        <div class="price"><span>￥69</span>/起</div>
        <div class="ins_term" v-if="insuranceCheck">
          <span class="start">起保日期 2016-12-22</span>
          <span class="end">终保日期 2017-12-22</span>
          <i class="type">[一年多次]</i>
        </div>
      </div>
      <div class="ins_client" v-if="insuranceCheck">
        <div class="item-hd">
          <div class="i_tit">被保人<i class="help">help</i></div>
          <span class="addbtn" @click="insuranceList.insurance=true" :class="{editbtn:insuranceList.list.length != 0}"></span>
        </div>
        <div class="list" v-if="insuranceList.list.length != 0">
          <ul>
            <li v-for="item in insuranceList.list">
                <div class="info">
                  <div class="name">{{item.name}}<span>{{item.e_name}}</span></div>
                  <div class="idnum">身份证：{{item.idnum}}</div>
                </div>
                <div class="price">￥69</div>
            </li>

          </ul>
        </div>
      </div>
      <div class="ins_creater" v-if="insuranceCheck">
        <div class="item-hd">
          <div class="i_tit">投保人<i class="help">help</i></div>
          <span class="addbtn" :class="{editbtn:proposerInfo.info.name  != ''}" @click="proposerInfo.proposer=true"></span>
        </div>
        <div class="info" v-if="proposerInfo.info.name != ''">
          <div class="name">{{proposerInfo.info.name}}<span class="phone">{{proposerInfo.info.phone}}</span></div>
          <div class="email">{{proposerInfo.info.email}}</div>
        </div>
      </div>
      <div class="ins_benefit" v-if="insuranceCheck">
        <div class="item-hd">
          <div class="i_tit">受益人<i class="help">help</i></div>
          <div class="txt">法定继承人</div>
        </div>
      </div>
      <div class="ins_destination" v-if="insuranceCheck">
        <div class="item-hd">
          <div class="i_tit">目的地</div>
          <div class="dest">冰岛</div>
          <div class="editbtn_p"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="creatorder">
    <div class="price">订单金额：<span>￥{{totalPrice}}</span></div>
    <div class="creatBtn" @click="verifyData">提交订单</div>
  </div>
  <invoice
  v-if="invoiceData.invoice"
  :data="invoiceData.detail"
  @confirm="invoiceConfirm"
  @closeCom="compClose">
  </invoice>
  <visa-passenger-list
  v-show="passengerList.passenger"
  @confirm="passengerConfirm">
  </visa-passenger-list>
  <contact-list
  v-show="contactInfo.contact"
  @confirm="contactConfirm">
  </contact-list>
  <address-list
  v-show="deliveryInfo.delivery"
  @confirm="deliveryConfirm">
  </address-list>
  <insur-client-list
  v-if="insuranceList.insurance"
  :passenger="passengerList.list"
  @confirm="insuranceConfirm">
  </insur-client-list>
  <proposer
  v-if="proposerInfo.proposer"
  :proposer="proposerInfo.info"
  @confirm="setProposer">
  </proposer>
  <mt-datetime-picker
    ref="datepicker"
    type="date"
    :startDate="new Date()"
    v-model="initialDate"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日"
    @confirm="dateConfirm">
  </mt-datetime-picker>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { DatetimePicker } from 'mint-ui'
import Invoice from './visaorder/Invoice'
import VisaPassengerList from './visaorder/VisaPassengerList'
import insurClientList from './visaorder/InsClientList'
import ContactList from './visaorder/ContactList'
import AddressList from './visaorder/AddressList'
import Proposer from './visaorder/Proposer'
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
      typeList:['在职','自由职业','在校学生','退休人员','学龄前儿童','家庭主妇'],
      visaInfomation:{},
      totalPrice:0,
      initialDate:new Date(),
      estimated_date:"",
      invoiceData:{"invoice":false,"detail":{"need":0,"type":1,"memo":"","header":"","shippingId":"","shippingInfo":{"name":"","phone":"","province":"","city":"","zone":"","address":""}}},
      passengerList:{"passenger":false,"list":[]},
      contactInfo:{"contact":false,"info":{"name":"","tel":"","email":""}},
      deliveryInfo:{"delivery":false,"info":{"name":"","phone":"","province":"","city":"","zone":"","address":""}},






      insuranceCheck:false,
      insuranceList:{"insurance":false,"list":[]},
      proposerInfo:{"proposer":false,"info":{"name":"","ename":"","idtype":"","idnum":"","birthday":"","phone":"","email":""}},

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
    invoiceConfirm:function(v){
      this.invoiceData.detail=v
      this.invoiceData.invoice=false
    },
    passengerConfirm:function(v){
      this.passengerList.list=v
      this.passengerList.passenger=false
    },
    contactConfirm:function(v){
      this.contactInfo.info=v
      this.contactInfo.contact=false
    },
    deliveryConfirm:function(v){
      this.deliveryInfo.info=v
      this.deliveryInfo.delivery=false
    },
    insuranceConfirm:function(v){
      this.insuranceList.list = v
      this.insuranceList.insurance=false
    },
    setProposer:function(v){
      this.proposerInfo.info = v
      this.proposerInfo.proposer = false
    },
    compClose:function(){
      this.invoiceData.invoice=false
    },
    openDatepicker:function(){
      this.$refs.datepicker.open();
    },
    dateConfirm:function(t){
      var m = t.getMonth()+1
      this.estimated_date = t.getFullYear() +'-'+ m +'-'+ t.getDate()
    },
    verifyData:function(){
      if (this.passengerList.list.length == 0) {
        Toast('您还未添加签证申请人')
        return false
      }else if (this.contactInfo.info.name == '' || this.contactInfo.info.tel == '' || this.contactInfo.info.email == '') {
        Toast('请选择或完善联系人资料')
        return false
      }else if (this.deliveryInfo.info.name == '') {
        Toast('请选择收件地址')
        return false
      }else{
        this.creatOrder()
      }
    },
    creatOrder:function(){
      Indicator.open('加载中');
      var send = {
        "id":this.$route.params.id,
        "customers":this.passengerList.list,
        "contact":this.contactInfo.info,
        "shipping":{"method":1,"shippingId":this.deliveryInfo.info.id},
        "invoice":this.invoiceData.detail
      };
      var url = '/api/visa/create-order';
      this.$http.post(url,send).then(function(result){
        console.log('返回数据：'+JSON.stringify(result))
        Indicator.close();
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          console.log(JSON.stringify(rst.data))
        }else {
          console.log(rst.msg)
        }
      });
    }
  },
  watch:{
    passengerList:{
　　　handler(){
        this.totalPrice = this.passengerList.list.length * this.visaInfomation.price
　　　},
　　　deep:true
　　}
  },
  components:{
    Invoice,
    VisaPassengerList,
    insurClientList,
    Proposer,
    ContactList,
    AddressList
  }
}
</script>

<style lang="less" scoped>
.visa-order{
  .top-part{
    background-image: url('/static/images/visa/top-bg.png');
    background-size: 25px;height: 136px;position: relative;
    margin: 10px;border-radius: 5px;color: #fff;
    padding: 15px;overflow: hidden;
    .tit{font-size: 1rem;margin-bottom: 5px;}
    .desc{font-size: 0.7rem;}
    .estimated{
      width: 100%;height: 48px;
      position: absolute;bottom: 0;left: 0;
      background-color: rgba(0, 0, 0, 0.2);
      background-image: url('/static/images/visa/icon-calerder.png');
      background-repeat: no-repeat;background-size: 16px;
      background-position: 15px center;
      .inner{
        margin: 0 15px;height: 48px;
        background-image: url('/static/images/visa/icon-right-white.png');
        background-repeat: no-repeat;background-size: 10px;
        background-position: right center;
        span{
          font-size: 0.7rem;color: #fff;line-height: 48px;padding-left: 28px;
          i{
            display: inline-block;color: #008BE4;
            font-size: 0.6rem;background-color: #fff;
            height: 20px;line-height: 20px;
            font-style: normal;width: 50px;
            text-align: center;margin-left: 10px;border-radius: 5px;
          }
        }
      }
    }
  }
  .help{
    display: inline-block;
    width: 0.8rem;
    background-image: url('/static/images/visa/icon-help.png');
    background-size: 0.8rem;
    background-position: center;
    margin: 0px 5px;
    font-size: 0.8rem;
    text-indent: -9999px;
    background-repeat: no-repeat;
  }
  .clientname{
    margin-bottom: 10px;
    border-bottom: 1px solid #EEEEEE;
    background-color: #fff;
    padding: 60px 10px 15px;
    margin-top: -58px;
    .item-hd{
      overflow: hidden;
      .tit{float: left;font-size: 0.8rem;}
      .addbtn{float: right;font-size: 0.7rem;color: #008BE4;display: block;}
    }
    .namelist{
    padding-top: 10px;
      ul{
        overflow: hidden;
        li{
          display: inline-block;float: right;
          width: 45%;margin-bottom: 5px;
          background-color: #EEEEEE;
          height: 30px;line-height: 30px;
          overflow: hidden;
          .name{float: left;font-size: 0.6rem;color: #000000;padding-left: 5px;}
          .type{float: right;font-size: 0.6rem;color: #999999;padding-right: 5px;}
          &.left{float: left;}
        }
      }
    }
  }
  .contactinfo{
    padding-left: 10px;position: relative;
    background-color: #fff;margin-bottom: 5px;
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
  .express {
    background: #fff;
    padding: 10px;margin-bottom: 5px;
    .item-hd{
      overflow: hidden;
      .tit{float: left;font-size: 0.7rem;}
      .addbtn{float: right;font-size: 0.7rem;color: #008BE4;display: block;}
      .delitype{float: right;font-size: 0.7rem;color: #999999;}
    }
    .addressinfo{
      padding: 7px 0;
      .item{overflow: hidden;
        line-height: 25px;position: relative;padding-left: 75px;
        span{font-size: 0.6rem;line-height: 25px;display: inline-block;float: left}
        .txt{
          position: absolute;width: 75px;
          left: 0;top: 0;
        }
        .name{padding-right: 15px;}
      }
    }
  }
  .invoice{
    background: #fff;margin-bottom: 5px;padding: 10px;
    span{
      display: block;font-size: 0.7rem;
      background-image: url('/static/images/visa/icon-right-gray.png');
      background-repeat: no-repeat;
      background-position: right center;
      background-size: 0.5rem;
    }
  }
  .recommend{
    background: #fff;padding-left: 10px;padding-bottom: 30px;
    background-image: url('/static/images/visa/borderbg.png');
    background-repeat:repeat-x ;background-position:bottom;
    background-size: 10px;
    .title{
      line-height: 40px;font-size: 0.8rem;
      border-bottom: 1px solid #CCCCCC;
    }
    .insurance{
      padding-right: 10px;
      .tit{
        font-size: 0.7rem;color: #008BE4;line-height: 35px;
        padding-left: 15px;
        background-image: url('/static/images/visa/icon-insurance.png');
        background-repeat: no-repeat;background-position: left center;
        background-size: 10px;
      }
      .pro_info{
        position: relative;
        padding: 0 0 10px;
        overflow: hidden;
        .checkbox{
          height: 10px;width: 10px;border: 2px solid #008BE4;
          border-radius: 2px;position: absolute;
          top: 5px;left: 0;
          &.check{
            background-color: #008BE4;
            background-image: url('/static/images/visa/icon-check.png');
            background-repeat: no-repeat;background-position: center;
            background-size: 10px;
          }
        }
        .name{
          font-size: 0.7rem;line-height: 25px;
          padding: 0 90px 0 17px;
        }
        .price{
          font-size: 0.7rem;color: #666666;position: absolute;
          top: 1px;right: 0;width: 90px;text-align: right;
          span{color: #F95800;font-size: 0.8rem;}
        }
        .ins_term{
          margin: 10px 0;height: 30px;
          position: relative;
          span{
            display: inline-block;
            width: 50%;color: #666666;
            float: left;
            font-size: 0.7rem;
            line-height: 30px;
            text-align: center;
          }
          i{
            font-style: normal;color: #008BE4;font-size: 0.6rem;top: 22px;
            position: absolute;left: 50%;width: 50%;text-align: center;
          }
          &:before{
            content: ' ';left: 50%;top: 0;
            position: absolute;height: 100%;width: 1px;
            background-color: #EEEEEE;
          }
        }
      }
      .item-hd{
        overflow: hidden;border-bottom: 1px solid #EEEEEE;
        .i_tit{float: left;font-size: 0.8rem;line-height: 30px;}
        .addbtn{
          float: right;
          height: 30px;width: 30px;
          background-image: url('/static/images/visa/icon-add.png');
          background-size: 17px;
          background-repeat: no-repeat;
          background-position:right center;display: block;
        }
        .editbtn{
          float: right;
          height: 30px;width: 30px;
          background-image: url('/static/images/visa/icon-edit.png');
          background-size: 17px;
          background-repeat: no-repeat;
          background-position:right center;
        }
        .editbtn_p{
          float: right;
          height: 30px;width: 30px;
          background-image: url('/static/images/visa/icon-edit-p.png');
          background-size: 17px;
          background-repeat: no-repeat;
          background-position:right center;
        }
        .txt{color: #999999;font-size: 0.7rem;line-height: 30px;
        padding-left: 10px; float: left;}
        .dest{font-size: 0.7rem;float: left;line-height: 30px;padding-left: 10px;}
      }
      .ins_client{
        padding-bottom: 10px;
        .list{
          li{
            border-bottom: 1px solid #EEEEEE;
            margin-left: 5px;
            padding: 10px 0px;
            position: relative;
            .info{
              padding-right: 80px;
              .name{
                font-size: 0.7rem;color: #666666;line-height: 20px;
                span{
                  font-size: 0.7rem;color: #666666;padding-left: 15px;
                }
              }
              .idnum{font-size: 0.6rem;color: #666666;line-height: 20px;}
            }
            .price{
              font-size: 0.7rem;
              line-height: 40px;
              width: 80px;color: #F95800;
              position: absolute;
              right: 0;top: 10px;text-align: right;
            }
            &:last-child{
              border-bottom: none;
            }
          }
        }
      }
      .ins_creater{
        padding-bottom: 10px;
        .info{
          margin-left: 5px;
          padding: 10px 0px;
          background-image: url('/static/images/visa/icon-right-gray.png');
          background-size: 9px;
          background-repeat: no-repeat;
          background-position:right center;
          .name{
            font-size: 0.7rem;color: #666666;line-height: 20px;
            span{
              font-size: 0.7rem;color: #666666;padding-left: 15px;
            }
          }
          .email{font-size: 0.7rem;color: #666666;line-height: 20px;}
        }
      }
      .ins_benefit,.ins_destination{padding-bottom: 10px;}
    }
  }
  .creatorder{
    padding:10px;height: 30px;
    background-color: #fff;
    overflow: hidden;
    margin-top: 20px;
    .price{
      float: left;
      line-height: 30px;
      font-size: 0.7rem;
      span{
        color: #F55301;font-size: 0.8rem;
      }
    }
    .creatBtn{
      background-color: #008BE4;padding: 0 20px;
      line-height: 30px;text-align: center;border-radius: 4px;
      font-size: 0.7rem;color: #fff;display: inline-block;float: right;
    }
  }
}
</style>
