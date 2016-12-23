<template>
  <div class="visa-detail" id="visa-detail">
    <div class="visaname">
      <div class="name"><span>【电子签】</span>法国旅游签证<停留天数按申请，有效期限使馆定，无需面试></div>
      <div class="day-price">
        <span class="day">受理天数：7-15天</span>
        <span class="price"><i>￥</i>299</span>
      </div>
    </div>
    <div class="visainfo">
      <div class="item">
        <div class="tit">签证信息</div>
        <div class="con">
          <ul>
            <li>停留天数：按申请</li>
            <li>入境次数：领馆定</li>
            <li>是否面试：抽查</li>
            <li>有效期限：领馆定</li>
          </ul>
        </div>
      </div>
      <div class="item">
        <div class="tit">服务内容</div>
        <div class="con">
        <p>上门收送+加急+陪签培训+代取护照+代填表格+制作机酒材料+材
料审核+公证认证+预约面试+身份证寄回+预约面试+一对一咨询+
资料模板+个性化方案提供</p>
        </div>
      </div>
      <div class="item">
        <div class="tit">受理地区</div>
        <div class="con">
          <span>安徽省</span><span>广东省</span><span>湖北省</span>
          <span>江西省</span><span>云南省</span><span>辽宁省</span>
          <span>黑龙江省</span><span>北京</span><span>广西省</span>
        </div>
      </div>
    </div>
    <div class="tabs_placeholder">
      <div id="contabs">
        <span :class="{on:tabStatus == 0}" @click="positionTo(0,'step')">办理流程</span>
        <span :class="{on:tabStatus == 1}" @click="positionTo(1,'needfile')">所需资料</span>
        <span :class="{on:tabStatus == 2}" @click="positionTo(2,'tips')">温馨提示</span>
        <span :class="{on:tabStatus == 3}" @click="positionTo(3,'refund')">退款说明</span>
      </div>
    </div>    
    <div class="tab-cont step" id="step">
      <div class="tit">办理流程</div>
      <div class="con">
        <div class="line"></div>
        <ul>
          <li class="i1">在线下单</li>
          <li class="i2">收资料</li>
          <li class="i3">送签领馆</li>
          <li class="i4">领馆出签</li>
          <li class="i5">收签确认</li>
        </ul>
      </div>
    </div>
    <div class="tab-cont needfile" id="needfile">
      <div class="tit">所需资料</div>
      <div class="con">
        <ul>
          <li><router-link :to="'/visaInformation/'+$route.params.id">在职人员</router-link></li>
          <li>自由职业者</li>
          <li>在校学生</li>
          <li>退休人员</li>
          <li>学龄前儿童</li>
          <li>家庭主妇</li>
        </ul>
        <div class="sendemail" @click="showSend">发送到邮箱></div>        
      </div>
    </div>
    <div class="tab-cont tips" id="tips">
      <div class="tit">温馨提示</div>
      <div class="con">
        1、签证属于特殊商品，我司会按使领馆的要求为客人准备 最合适的送签材料，确保您的材料有最高出签可能，但所 申请的签证是否成功，取决于使领馆对资料的审核，若发 生拒签，请申请人自然接受结果，并放弃追究本公司任何 责任的权利。<br>2、在办理签证期间，我司可能会根据您的材料情况要求增 补其他材料、担保金或予以劝退；领馆也可能会针对您的 实际情况，要求增补其他材料，或延长签证受理时间（此 情况由领馆决定，我司无法干预），或要求申请人面试， 或电话调查申请人，领馆也可能因内部原因导致延迟出签。<br> 3、申请人需保证提供材料的真实性，有效性，如因隐瞒曾 有不良记录，或从事非法活动，被相关部门查处或有滞留 倾向拒签，我司不承担责任。请申请人特别注意诚实信用 的原则。<br>4、中国签证网上公布的办理周期、停留时间、签证有效期 等均系基于以往经验的预估时限，并非中国签证网的确定 承诺，准确时限以使领馆实际审批结果为准。获得签证前 切勿先行支付机票、酒店费用，以免因签证问题产生费用 损失，否则损失将由您自行承担；如您提供了机票、酒店 预订单申请签证，请勿在获得签证前取消或修改预订，否 则可能对签证结果产生影响 。<br>5、依据使馆要求，签证申请人在送签或归国后，如被使领 馆要求参加面试或面试销签，签证申请人必须配合使领馆 完成面试工作。如因个人原因未按时参加面试或面试销签， 一切后果由签证申请人自行承担。 <br>6、如果您的护照在办理过程中丢失，每本赔付1000元。
      </div>
    </div>
    <div class="tab-cont refund" id="refund">
      <div class="tit">退款说明</div>
      <div class="con">
        1.资料如已入馆办理，不退还任何款项。 <br>2.资料未入馆办理，将收取服务费用 。具体金额以供应商 商议结果为准。
      </div>
    </div>
    <div class="booking">
      <div class="addfev">收藏</div>
      <div class="bookbtn"><router-link :to="'/visaOrder/'+$route.params.id">立即预定</div>
    </div>
    <email :isshow="emailDis" @closePage="closeSend"></email>
  </div>
  
</template>

<script>
import { Indicator } from 'mint-ui'
import Email from './visaDetail/Email'

export default{
  name: 'visa-detail',
  beforeCreate:function(){
    document.title = "签证详情"
    Indicator.open('加载中...');
  },
  created: function () {
    Indicator.close();
    window.onscroll = function(){
      var tabDistans = document.body.scrollTop;
      if (tabDistans >= 400) {
        document.getElementById('contabs').className = 'fixed';
      }else {
        document.getElementById('contabs').className = '';
      }
    }
  },
  components:{
    Email
  },
  data:function(){
    return{
      tabStatus:0,
      emailDis:false
      
    }
  },
  methods:{    
    positionTo:function(v,id){
      var _h = document.getElementById(id).offsetTop;
      this.tabStatus = v
      document.body.scrollTop = _h - 40
    },
    showSend:function(){
      this.emailDis = true
    },
    closeSend:function(){
      this.emailDis = false
    }
    
  }
}
</script>

<style lang="less" scoped>
.visa-detail{
  .visaname{
    border-bottom: 1px solid #C0C0C0;
    padding: 10px;background-color: #fff;
    .name{
      font-size: 0.8rem;
      span{font-size: 0.8rem;}
    }
    .day-price{
      padding-top: 8px;
      overflow: hidden;
      .day{
        font-size: 0.6rem;
        float: left;
      }
      .price{
        float: right;
        font-size: 0.8rem;
        color: #F55600;
        i{font-style: normal;font-size: 0.6rem;}
      }
    }
  }
  .visainfo{
    padding: 10px;
    .item{
      padding-bottom: 10px;
      .tit{
        font-size: 0.7rem;font-weight: bold;
        border-left: 2px solid #008BE4;padding-left: 5px;
      }
      .con{
        padding-top: 5px;
        font-size: 0.6rem;color: #999999;
        overflow: hidden;
        line-height: 20px;
        ul{
          padding-left: 7px;
          li{float: left;width: 40%;}
        }
        p{
          padding-left: 7px;font-size: 0.6rem;color: #999999;
        }       
        span{
          background: #f4eaf8;font-size: 0.6rem;color: #999999;
          display: inline-block;padding: 0 7px;margin-right: 10px;
          margin-bottom: 5px;border-radius: 2px;
        }      
      }
    }
  }
  .tabs_placeholder{height: 40px;}
  #contabs{
    overflow: hidden;
    background: #fff;
    span{
      width: 25%;display: block;float: left;
      text-align: center;line-height: 40px;height: 38px;
      border-bottom: 2px solid #fff;font-size: 0.7rem;
      &.on{color: #008be4;border-bottom: 2px solid #008be4;}
    }
    &.fixed{
      position: fixed;width: 100%;
      top: 0;left: 0;z-index: 99;box-shadow: 0 0 15px 2px #ccc;
    }
  }

  .tab-cont{
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
    .tit{
      font-size: 0.7rem;font-weight: bold;
      margin-bottom: 10px;
      padding-left: 20px;
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 17px;      
    }
    .con{font-size: 0.6rem;color: #000;line-height: 1rem;}
  }
  .tab-cont.step .tit,.tab-cont.needfile .tit{background-image: url('/static/images/visa/icon-info.png');}
  .tab-cont.tips .tit{background-image: url('/static/images/visa/icon-tips.png');}
  .tab-cont.refund .tit{background-image: url('/static/images/visa/icon-attention.png');}
  .tab-cont.refund{
    margin-bottom: 0;
  }
  .tab-cont.step{
    margin-bottom: 0;
    .con{
      overflow: hidden;position: relative;
      .line{    
        height: 2px;
        width: 88%;
        background: #98D8F6;
        position: absolute;
        top: 14px;
        left: 6%;
      }
      ul{
        position: relative;
        z-index: 1;
        -webkit-column-count: 5;
        -webkit-column-gap: normal;
        -moz-column-count: 5;
        column-count: 5;
        -moz-column-gap: normal;
        column-gap: normal;
        li{
          padding-top: 35px;
          font-size: 0.6rem;float: left;
          text-align: center;
          background-size: 30px;
          width: 60px;
          height: 20px;
          background-position: top center;
          background-repeat: no-repeat;
          &.i1{background-image: url('/static/images/visa/icon-step1.png')}
          &.i2{background-image: url('/static/images/visa/icon-step2.png')}
          &.i3{background-image: url('/static/images/visa/icon-step3.png')}
          &.i4{background-image: url('/static/images/visa/icon-step4.png')}
          &.i5{background-image: url('/static/images/visa/icon-step5.png')}
        }
      }
    }
  }
  .tab-cont.needfile{
    .con{
      ul{
        li{
          font-size: 0.65rem;line-height: 40px;
          padding-right: 10px;
          border-bottom: 1px solid #E1E1E1;
          margin-right: -10px;
          background-image: url('/static/images/visa/icon-right.png');
          background-repeat: no-repeat;background-size: 17px;
          background-position: right center;
          a{display: block;}
        }
      }
      .sendemail{
        height: 30px;width: 90px;line-height: 30px;font-size: 0.6rem;
        border: 1px solid #999999;border-radius: 3px;margin: 15px auto 0;
        text-align: center;
      }
    }
  }

  .booking{
    position: relative;
    .bookbtn{
      height: 50px;line-height: 50px;margin-left: 55px;
      background-color: #008CE4;text-align: center;font-size: 0.8rem;color: #fff;
      a{
        display: block;font-size: 0.8rem;color: #fff;
      }
    }
    .addfev{
      position: absolute;
      height: 20px;
      padding-top: 30px;
      width: 55px;
      background-color: #fff;
      left: 0;
      top: 0;
      font-size: 0.6rem;
      text-align: center;
      background-image: url('/static/images/visa/uncollect.png');
      background-repeat: no-repeat;
      background-size: 25px;
      background-position: center 8px;
      color: #fe7c98;
      &.collect{
        background-image: url('/static/images/visa/collect.png');
      }
    }
  }
}

</style>