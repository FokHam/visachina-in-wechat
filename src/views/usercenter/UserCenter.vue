<template>
<div class="user-center" id="user-center">
  <div class="toppart">
    <div class="headpath">
      <div class="pic"><img :src="userInfo.wx_head_img"></div>
      <div class="name">{{userInfo.wx_name}}</div>
    </div>
    <!--<a class="message">
      <span class="on"></span>
    </a>-->
  </div>
  <div class="nav_order">
    <div class="tit">我的订单</div>
    <div class="list">
      <router-link to="/orderList/1" class="n1">全部订单</router-link>
      <router-link to="/orderList/2" class="n2">待付款</router-link>
      <router-link to="/orderList/3" class="n3">退款/售后</router-link>
      <router-link to="/orderList/4" class="n4">失效</router-link>
    </div>
  </div>
  <div class="m_nav">
    <router-link to="/commonInformation" class="l1">
      常用信息
      <span>旅客／地址／联系人</span>
    </router-link>
    <router-link to="/collection" class="l2">
      我的收藏
      <span>有意向的产品</span>
    </router-link>
    <router-link to="/insurancePolicy" class="l3">
      我的保单
      <span>已购买的保单</span>
    </router-link>
  </div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default{
  name:'user-center',
  beforeCreate(){
    document.title = '个人中心'    
  },
  created: function () {
    Indicator.close()
    this.getUserInfo();
  },
  components: {

  },
  data:function(){
    return{
      userInfo:[]
    }
  },
  methods:{
    getUserInfo:function(){
      Indicator.open('加载中...')
      var api = "/api/member/index";
      this.$http.get(api).then(function(result){
        Indicator.close();
        console.log(result)
        var rst = result.body
        if (rst.status == 1) {
          this.userInfo = rst.data
          localStorage.userInfo = JSON.stringify(rst.data)
        }else {
          console.log(rst.msg)
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.user-center{
  .toppart{
    background-color: #fff;
    padding: 2rem 0;position: relative;
    .headpath{
      .pic{
        border-radius: 3.8rem;overflow: hidden;
        width: 3.8rem;height: 3.8rem;margin: 0 auto;
      }
      .name{
        text-align: center;font-size: 0.7rem;padding-top: 10px;
      }
    }
    .message{
      height: 20px;width: 20px;display: block;
      background-image: url('/static/images/usercenter/icon-message.png');
      background-repeat: no-repeat;
      background-size: 15px;
      background-position: center;
      position: absolute;
      top: 10px;
      right: 10px;
      .on{
        height: 7px;
        width: 7px;
        background-color: #ffd800;
        display: block;
        border-radius: 5px;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  .nav_order{
    margin-bottom: 5px;background-color: #fff;
    .tit{
      font-size: 0.7rem;text-indent: 20px;padding-bottom: 15px;
      background-repeat: no-repeat;
      background-position: 35px bottom;
      background-size: 12px;
      background-image: url('/static/images/usercenter/icon-jt.png');
    }
    .list{
      background-color: #16a5ef;
      overflow: hidden;padding: 10px 0;
      a{
        display: inline-block;width: 25%;float: left;
        text-align: center;color: #fff;font-size: 0.6rem;
        padding-top: 25px;background-repeat: no-repeat;
        background-position: center top;
        background-size: 18px;
        &.n1{background-image: url('/static/images/usercenter/icon-order.png');}
        &.n2{background-image: url('/static/images/usercenter/icon-wallet.png');}
        &.n3{background-image: url('/static/images/usercenter/icon-refund.png');}
        &.n4{background-image: url('/static/images/usercenter/icon-time.png');}
      }
    }
  }
  .m_nav{
    padding-left:10px;background-color: #fff;
    a{
      display: block;height: 50px;padding-right: 10px;
      border-bottom: 1px solid #eeeeee;padding-left: 18px;
      line-height: 50px;font-size: 0.7rem;
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 16px;
      &.l1{background-image: url('/static/images/usercenter/icon-address.png');}
      &.l2{background-image: url('/static/images/usercenter/icon-collect.png');}
      &.l3{background-image: url('/static/images/usercenter/icon-mychit.png');}
      span{
        font-size: 0.6rem;color: #999999;padding-right: 17px;
        display: inline-block;float: right;
        background-repeat: no-repeat;
        background-position: right center;
        background-size: 10px;
        background-image: url('/static/images/usercenter/icon-right.png');
      }
      &:last-child{border-bottom: none;}
    }


  }


}
</style>