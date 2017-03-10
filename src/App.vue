<template>
  <div id="app">    
    <suspend-ball></suspend-ball>
    <router-view></router-view>
    <p>{{resultdata}}</p>
  </div>
</template>

<script>
import Home from './views/home/Home'
import SuspendBall from './components/SuspendBall'
import wx from 'weixin-js-sdk'
export default {
  name: 'app',
  created () {
    this.wxConfig()
  },
  data(){
    return{
      resultdata:''
    }
  },
  methods:{
    wxConfig:function(){
      var url = "/api/pay/index_config";
      this.$http.get(url).then(function(result){
        let wx_config = result.body
        this.resultdata = JSON.stringify(result.body)
        wx.config({
          debug: true,
          appId: wx_config.appId, // 必填，公众号的唯一标识
          timestamp: wx_config.timestamp, // 必填，生成签名的时间戳
          nonceStr: wx_config.nonceStr, // 必填，生成签名的随机串
          signature: wx_config.signature,// 必填，签名，见附录1
          jsApiList: ["chooseWXPay","hideMenuItems"]
        });
        wx.ready(function(){
          wx.hideAllNonBaseMenuItem();
        });
      });
    }
  },
  components: {
    Home,
    SuspendBall
  }
}
</script>

<style>
</style>
