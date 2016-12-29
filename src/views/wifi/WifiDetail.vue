<template>
<div class="wifi-detail" id="wifi-detail">
  <div class="part-top">
    <div class="pic">
      <img src="/static/images/wifi/hot-item.png">  
    </div>
    <div class="desc">
      <div class="top">
        <div class="name">日本旅行WIFI租赁（深圳取还）</div>
        <div class="txt">押金：<i>500</i>元/台</div>
      </div>
      <div class="btm">
        <div class="txt">覆盖范围：日本全境</div>
        <div class="price">
          <i>￥9</i><span>&frasl; 天起</span>
        </div>
      </div>
    </div>
  </div>
  <div class="part-desc">
    <div class="tit">WIFI亮点:</div>
    <div class="con">24小时机场取还更方便，覆盖全国43个机场柜台，20个市区网点，
5个海外分公司</div>
    <div class="orderbtn">预定</div>
  </div>
  <div class="part-locations">
    <div class="tit"><router-link :to="'/wifiCounter/'+$route.params.id">取货网点</router-link></div>
    <div class="con">1.【北京T1出发】<br>2.【北京T2出发】<br>3.【北京T3出发】</div>
  </div>
  <div class="part-proinfo">
    <div class="title">预购须知</div>
    <div class="content">
      <div class="item">
        <div class="tit">产品说明</div>
        <div class="con">
          <dl>
            <dd>适用地点：</dd>
            <dt>
              <p>日本全境（如需去冲绳，北海道，请备注说明）</p>
            </dt>
          </dl>
          <dl>
            <dd>网络情况：</dd>
            <dt>
              <p>4G网络</p>
            </dt>
          </dl>
          <dl>
            <dd>流量限制：</dd>
            <dt>
              <p>不限流量（为保证您全程享受4G网速，请关闭 软件备份，避免观看视频电影等；短时间内使 用过多流量将被当地运营商降速或断网）</p>
            </dt>
          </dl>
          <dl>
            <dd>机器性能：</dd>
            <dt>
              <p>最多连接5台设备，续航时间为4-6小时</p>
            </dt>
          </dl>
          <dl>
            <dd>标准配置：</dd>
            <dt>
              <p>WiFi机器+数据线+目的地适用插头+设备包</p>
            </dt>
          </dl>
          <dl>
            <dd>注意事项：</dd>
            <dt>
              <p>1、出行当天预订WiFi无法享受现有优惠价格， 租赁价格以当天柜台价格为准；</p>
              <p> 2、如您需机场取机，请以您实际取机日期进行 下单；</p>
              <p> 3、如您符合相关优惠，可在回程后联系环球漫 游客服申请相应优惠退款</p>
            </dt>
          </dl>                  
        </div>
      </div>
      <div class="item">
        <div class="tit">费用说明</div>
        <div class="con">
          <p>费用=单价×出行天数×台数+押金</p>
          <p>出行天数按从取机日期到还机日期计算</p>
          <p>押金：￥500元/台</p>          
        </div>
      </div>
      <div class="item">
        <div class="tit">退货说明</div>
        <div class="con">
          <p>该产品支持退改；</p>
          <p>取消预订：请登录环球漫游账户申请取消；</p>
          <p>出行日期前1天申请取消，不收取手续费；</p>
          <p>出行当天申请取消，收取1天的租金作为手续费；</p>
          <p>更改出行日期：请申请取消后重新预订。</p>
        </div>
      </div>
    </div>
  </div>
  <div class="booking">
    <div class="addfev">收藏</div>
    <div class="bookbtn"><router-link :to="'/wifiOrder/'+$route.params.id">立即预定</router-link></div>
  </div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'

export default {
  name:"wifi-detail",
  beforeCreate(){
    document.title = '产品详情'
    Indicator.open('加载中...')
  },
  created: function () {
    Indicator.close()
    
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
.wifi-detail{
  .part-top{
    padding: 15px 10px;background-color: #fff;
    height: 90px;position: relative;
    .pic{
      width: 90px;height: 90px;position: absolute;left: 10px;top: 15px;
    }
    .desc{
      padding-left: 100px;
      .top{
        height: 65px;
        .name{font-size: 0.7rem;margin-bottom: 5px;}
        .txt{
          font-size: 0.6rem;color: #999999;
          i{font-size: 0.6rem;color: #D44B00;font-style: normal;}
        }
      }
      .btm{
        overflow: hidden;height: 25px;
        .txt{font-size: 0.6rem;color: #999999;float: left;line-height: 25px;}
        .price{
          float: right;
          i{
            color: #D44B00;font-size: 0.8rem;font-style: normal;
            line-height: 25px;display:block;float: left;
          }
          span{
            font-size: 0.6rem;color: #666666;line-height: 25px;
            display:block;float: left;padding-left: 5px;
          }
        }
      }
    }
  }
  .part-desc{
    padding: 10px;overflow: hidden;
    .tit{
      font-size: 0.7rem;line-height: 25px;color: #008BE4;padding-left: 20px;
      background-image: url('/static/images/wifi/icon-star.png');
      background-size: 16px;background-position: left center;
      background-repeat: no-repeat;
    }
    .con{font-size: 0.6rem;color: #666666;}
    .orderbtn{
      background-color: #008BE4;color: #fff;text-align: center;
      width: 63px;height: 25px;line-height: 25px;font-size: 0.7rem;
      border-radius: 3px;float: right;margin-top: 5px;
    }
  }
  .part-locations{
    padding: 0 10px 10px;background-color: #fff;margin-bottom: 5px;
    .tit{
      height: 35px;background-image: url('/static/images/wifi/icon-location-on.png');
      background-size: 19px;background-position: left center;
      background-repeat: no-repeat;padding-left: 25px;
      a{
        font-size: 0.8rem;line-height: 35px;display: block;
        background-image: url('/static/images/wifi/icon-right-gray.png');
        background-size: 12px;background-position: right center;
        background-repeat: no-repeat;
      }
    }
    .con{
      font-size: 0.6rem;line-height: 25px;
      color: #666666;padding-left: 25px;
    }
  }
  .part-proinfo{
    padding: 0 10px 10px;background-color: #fff;
    .title{
      height: 35px;background-image: url('/static/images/wifi/icon-info.png');
      background-size: 19px;background-position: left center;
      background-repeat: no-repeat;padding-left: 25px;
      font-size: 0.8rem;line-height: 35px;margin-bottom: 15px;
    }
    .content{
      padding-left: 25px;
      .item{
        margin-bottom: 20px;
        .tit{font-size:0.7rem;margin-bottom: 5px;}
        .con{
          p{font-size: 0.6rem;color: #666666;line-height: 20px;}
          dl{
            position: relative;margin-bottom: 5px;
            dd{
              position: absolute;left: 0;top: 0;width: 70px;
              font-size: 0.6rem;line-height: 20px;
            }
            dt{
              padding-left: 70px;
            }
          }
        }
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
