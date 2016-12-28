<template>
<div class="wifi-help" id="wifi-help">
  <div class="pagebg"><img src="/static/images/wifi/bg-help-top.png"></div>
  <div class="item">
    <div class="tit q1">随身WIFI是什么？</div>
    <div class="con">随身WIFI是一个随身携带的无线WIFI发射器，是把目的
地国家当地网络信号转化成WIH信号，供手机或电脑上
网，只能在目的地国家使用，国内无法开机使用，否则
可能产生的高额跨国流量费用由客人承担。
    </div>
  </div>
  <div class="item wbg">
    <div class="tit q2">随身WIFI怎么用？</div>
    <div class="con">连接随身WIFI上网，跟您的手机型号没有关系，只要您
的手机或pad具有WIH功能，连接无线WIF，搜索机身背
后的账号，输入机身背后的密码就可以连接网络了。
    </div>
  </div>
  <div class="item">
    <div class="tit q3">怎么计算？</div>
    <div class="con">租金=单价*出行天数*台数<br>出行天数自领取机器当日开始计算租金，到返还机器日期截止。
    </div>
  </div>
  <div class="item wbg">
    <div class="tit q4">移动WIFI网速、电量如何？</div>
    <div class="con">WIFI均采用当地的通讯运营商，网速高速稳定；但是在比较偏僻的地方：公海、高速、海拔很高的山峰、密封的室内会有影响；连接的机器越多，网速越慢，建议连接三到五台设备。具体连接数量以设备资料为准。<br>WIFI在使用过程中发热和发烫是正常现象，请不要担心。我们的设备可以在充满电的情况下使用6-8小时，建议自备充电宝。
    </div>
  </div>
  <div class="item">
    <div class="tit q5">如果在国外使用出现问题，延期或逾期归还怎么办？</div>
    <div class="con">1.万一长时间无网络信号，建议您重启或初始化机器设备说明书中包含常见故障的应对方法。<br>2.如果设备无法使用，请在有网络的情况下扫描机身的微信售后，将故障问题反馈至售后技术人员帮您解决。<br>3.如出游前行程发生变化，需要申请取消移动MF，然后根据新行程重新预订；<br>4.如出游期间行程提早结束，可致电同程旅游客服申请未使用的天数的退款；<br>5.如在出游期间行程延长，需要回国之后至柜台办理延期事宜（延期费用高于同程售卖价格)。
    </div>
  </div>




  <div class="pagebg"><img src="/static/images/wifi/bg-help-bottom.png"></div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'

export default {
  name:"wifi-help",
  beforeCreate(){
    document.title = "全球WIFI"
    Indicator.open('加载中...');
  },
  created: function () {
    Indicator.close();
    
  },
  components: {
    
  },
  data:function(){
    return{
      
      
    }
  },
  methods:{
    
  }
}

</script>

<style lang="less" scoped>
.wifi-help{
  .pagebg{
    img {
      width: 100%;
      display: -webkit-box;
    }
  }
  .item{
    padding: 15px;
    .tit{
      font-size: 0.8rem;
      color: #008BE4;
      line-height: 30px;
      padding-left: 27px;      
      background-position: left 7px;
      background-size: 18px;
      background-repeat: no-repeat;
      &.q1{background-image: url('/static/images/wifi/icon-wifi.png');}
      &.q2{background-image: url('/static/images/wifi/icon-zoom.png');}
      &.q3{background-image: url('/static/images/wifi/icon-counter.png');}
      &.q4{background-image: url('/static/images/wifi/icon-battery.png');}
      &.q5{background-image: url('/static/images/wifi/icon-global.png');}
    }
    .con{
      font-size: 0.6rem;line-height: 20px;
      text-align: justify;
    }
    &.wbg{background-color: #fff;}
  }



}
</style>
