<template>
<div class="order-detail" id="order-detail">
  <div class="order_tatus">
    <div class="status">订单状态：<span>待支付</span></div>
  </div>
  <div class="basic_info">
    <dl><dd>订单编号：</dd><dt>2159896632656</dt></dl>
    <dl><dd>预定时间：</dd><dt>2017/02/08 09:35</dt></dl>
    <dl><dd>订单金额：</dd><dt><span>￥599</span></dt></dl>
  </div>
  <div class="product_info">
    <a>
      <div class="name">加拿大旅游签证</div>
      <div class="desc">加急办理2个工作日出签，受理全国护照除新
疆、西藏外、广州送签></div>
    </a>
  </div>
  <div class="order_items">
    <div class="item">
      <div class="top">
        <router-link to="/progressDetail">
          <div class="time">2016/12/24 15:00</div>        
          <div class="status">待确认</div>
        </router-link>
      </div>
      <div class="center">
        <div class="name">周方晗</div>
        <div class="email">（在职）发送所需资料</div>
      </div>
      <div class="bottom">
        <div class="refund">退款</div>
        <div class="express" v-if="false">顺丰快递 85463654654</div>
      </div>
    </div>
    <div class="item">
      <div class="top">
        <router-link to="/progressDetail">
          <div class="time">2016/12/24 15:00</div>        
          <div class="status">已寄出</div>
        </router-link>
      </div>
      <div class="center">
        <div class="name">周方晗</div>
        <div class="email">（在职）发送所需资料</div>
      </div>
      <div class="bottom">
        <div class="refund" v-if="false">退款</div>
        <div class="express">顺丰快递 85463654654</div>
      </div>
    </div>
    
  </div>
  <div class="receive_address">
    <div class="title">邮寄信息</div>
    <div class="content">
      <div class="address">请确认材料原件无误，将材料原件邮寄到以下地址：<br>
      <span class="black">深圳市罗湖区迎春路海外联谊大厦2919室</span> <span class="red">（此地址不接受快递到付，敬请谅解)</span></div>
      <div class="contact">收件人：<span>周方晗</span><span>15692452605</span></div>
    </div>
  </div>
  <div class="contact_address">
    <div class="title">联系人信息</div>
    <div class="content">
      <dl><dd>收件人：</dd><dt><span>周方晗</span><span>15692452605</span></dt></dl>
      <dl><dd>地址：</dd><dt>深圳市罗湖区迎春路海外联谊大厦2919室</dt></dl>
    </div>
  </div>
  <div class="invoce_info">
    <div class="title">发票信息</div>
    <div class="name">深圳市途经网络科技有限公司</div>
    <div class="address">深圳市罗湖区迎春路海外联谊大厦2919室</div>
  </div>
  <div class="creatpay">
    <div class="price">合计：<span>￥599</span></div>
    <div class="creatBtn">立即支付</div>
  </div>
  <div class="buyagain" v-if="false">再次购买</div>
</div>
</template>

<script>
export default{
  name: 'order-detail',
  created: function () {
    document.title = '订单详情'
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
.order-detail{
  .order_tatus{
    height: 4rem;
    background-image: url('/static/images/visa/order-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .status{
      line-height: 4rem;
      color: #fff;
      font-size: 0.8rem;
      text-align: right;
      background-image: url('/static/images/visa/icon-unpay.png');
      background-size: auto 2.6rem;
      background-repeat: no-repeat;
      background-position: left center;
      width: 13rem;
      margin: 0 auto;
      span{
        color: #fff;   
        font-size: 0.9rem;     
      }
    }
  }
  .basic_info{
    margin-bottom: 0.5rem;
    background: #fff;
    padding: 0.5rem 0.8rem;
    dl{
      overflow:hidden;
      line-height: 1.5rem;
      dd{
        float: left;
        color: #999999;
        font-size: 0.7rem;
        width: 4rem;
      }
      dt{
        float: left;
        color: #333333;
        font-size: 0.7rem;
        span{
          font-size: 0.7rem;
          color: #008be4;
        }
      }
    }
  }
  .product_info{
    margin-bottom: 0.3rem;
    background: #fff;
    padding: 0.5rem 0.8rem;
    .name{
      color: #333333;
      font-size: 0.8rem;
      line-height: 1.5rem;
      margin-bottom: 0.3rem
    }
    .desc{
      color: #999999;
      font-size: 0.6rem;
      line-height: 1.2rem;
    }
    a{
      display: block;
      padding-right: 0.8rem;
      background-image: url('/static/images/visa/icon-right-blue.png');
      background-size: 0.5rem;
      background-repeat: no-repeat;
      background-position: right center;
    }
  }
  .order_items{
    .item{
      margin-bottom: 0.3rem;
      background-color: #fff;
      padding-left: 0.8rem;
      .top{
        padding-right: 0.8rem;
        border-bottom: 1px solid #eeeeee;
        overflow: hidden;
        line-height: 2rem;
        .time{
          float: left;
          font-size: 0.7rem;
          color: #666666;
        }
        .status{
          float: right;
          font-size: 0.7rem;
          color: #008be4;
        }
        a{
          display: block;
          overflow:hidden;
          padding-right: 0.8rem;
          background-image: url('/static/images/visa/icon-right-blue.png');
          background-size: 0.5rem;
          background-repeat: no-repeat;
          background-position: right center;
        }
      }
      .center{
        padding:1rem 0.8rem 0.8rem 0;
        overflow: hidden;
        line-height: 1.5rem;
        .email{
          float: right;
          font-size: 0.7rem;
          color: #008be4;
          border:1px solid #999999;
          border-radius: 0.2rem;
          padding: 0 0.5rem 0 0.5rem;
        }
        .name{
          float: left;
          font-size: 0.8rem;
          color: #333;
        }
      }
      .bottom{
        padding:0 0.8rem 0.8rem 0;
        overflow:hidden;
        .refund{
          float: right;
          border:1px solid #999999;
          border-radius: 0.2rem;
          color: #999999;
          font-size: 0.7rem;
          line-height: 1.5rem;
          padding: 0 0.8rem 0 0.8rem;
        }
        .express{
          float: right;
          font-size: 0.8rem;
          color: #999999;
          line-height: 1.5rem;
        }
      }      
    }
  }
  .receive_address{
    margin-bottom: 0.3rem;
    background-color: #fff;
    padding-left: 0.8rem;
    .title{
      padding-right: 0.8rem;
      border-bottom: 1px solid #eeeeee;
      overflow: hidden;
      line-height: 2rem;
      font-size: 0.8rem;
      color: #999999;
    }
    .content{
      padding-bottom: 0.5rem;
      .address{
        padding: 0.5rem 0.8rem 0.5rem 0;
        line-height: 1.2rem;
        font-size: 0.7rem;
        color: #999999;
        .black{color: #333333;font-size: 0.8rem;}
        .red{color: #ff401a;font-size: 0.8rem;}
      }
      .contact{
        font-size: 0.8rem;
        color: #999999;
        span{
          color: #333333;margin-right: 1rem;font-size: 0.8rem;
        }
      }
    }    
  }
  .contact_address{
    margin-bottom: 0.3rem;
    background-color: #fff;
    padding-left: 0.8rem;
    .title{
      padding-right: 0.8rem;
      border-bottom: 1px solid #eeeeee;
      overflow: hidden;
      line-height: 2rem;
      font-size: 0.8rem;
      color: #999999;
    }
    .content{
      padding:0.5rem 0.8rem 0.5rem 0;
      dl{
        position: relative;
        padding-left: 3.5rem;
        dd{
          font-size: 0.8rem;
          color: #999999;
          line-height: 1.5rem;
          position: absolute;
          left: 0;
          top: 0;
          width: 3.5rem;
        }
        dt{
          font-size: 0.8rem;
          line-height: 1.5rem;
          span{
            font-size: 0.8rem;
            display: inline-block;width: 50%;
          }
        }
      }      
    }    
  }
  .invoce_info{
    margin-bottom: 0.3rem;
    background-color: #fff;
    padding-left: 0.8rem;
    padding-bottom: 0.5rem;
    .title{
      padding-right: 0.8rem;
      overflow: hidden;
      line-height: 2rem;
      font-size: 0.8rem;
      color: #999999;
    }
    .name,.address{
      font-size: 0.8rem;
      color: #333333;
      line-height: 1.4rem;
    }        
  }
  .creatpay{height: 2.5rem;
    background-color: #fff;
    overflow: hidden;
    .price{
      float: left;
      line-height:2.5rem;
      font-size: 0.8rem;
      width: 50%;
      text-indent: 0.8rem;
      span{
        color: #F55301;font-size: 0.9rem;
      }
    }
    .creatBtn{
      background-color: #008BE4;
      line-height: 2.5rem;
      font-size: 0.8rem;
      color: #fff;
      display: inline-block;
      float: right;
      text-align: center;
      width: 50%;
    }
  }
  .buyagain{
    background-color: #008BE4;
    line-height: 2.5rem;
    font-size: 0.8rem;
    color: #fff;
    text-align: center;
  }
}
</style>
