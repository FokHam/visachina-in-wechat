<template>
<div class="wifi-detail" id="wifi-detail">
  <div class="part-top">
    <div class="pic">
      <img src="/static/images/wifi/hot-item.png">  
    </div>
    <div class="desc">
      <div class="top">
        <div class="name">{{pageData.name}}</div>
        <div class="txt">押金：<i>{{pageData.erp_foregift_price}}</i>元/台</div>
      </div>
      <div class="btm">
        <div class="txt">覆盖范围：{{pageData.areas_name}}</div>
        <div class="price">
          <i>￥{{pageData.cost_price}}</i><span>&frasl; 天起</span>
        </div>
      </div>
    </div>
  </div>
  <div class="part-desc">
    <div class="tit">WIFI亮点:</div>
    <div class="con">{{pageData.web_point}}</div>
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
              <p>{{descData[0]}}</p>
            </dt>
          </dl>
          <dl>
            <dd>网络情况：</dd>
            <dt>
              <p>{{descData[1]}}</p>
            </dt>
          </dl>
          <dl>
            <dd>流量限制：</dd>
            <dt>
              <p>{{descData[2]}}</p>
            </dt>
          </dl>
          <dl>
            <dd>机器性能：</dd>
            <dt>
              <p>{{descData[3]}}</p>
            </dt>
          </dl>
          <dl>
            <dd>标准配置：</dd>
            <dt>
              <p>{{descData[4]}}</p>
            </dt>
          </dl>
          <dl>
            <dd>注意事项：</dd>
            <dt>
              <p>{{descData[5]}}</p>
            </dt>
          </dl>                  
        </div>
      </div>
      <div class="item">
        <div class="tit">费用说明</div>
        <div class="con" v-html="pageData.web_charge">       
        </div>
      </div>
      <div class="item">
        <div class="tit">退货说明</div>
        <div class="con" v-html="pageData.web_return">
          
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
  created: function () {
    document.title = '产品详情'
    this.getWifiDetails()
  },
  components: {
    
  },
  data:function(){
    return{
      pageData:{},
      descData:[]
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
          this.analysisData(rst.data.web_desc)         
        }else {
          console.log(rst.msg)
        }
      });
    },
    analysisData:function(str){
      var htmlstr = this.removeHTMLTag(str)
      var conditions = ["/适用地点：(\\S*)网络情况：/","/网络情况：(\\S*)流量限制：/","/流量限制：(\\S*)机器性能：/","/机器性能：(\\S*)标准配置：/","/标准配置：(\\S*)注意事项：/","/注意事项：(\\S*)/"];
      for(var i=0;i<6;i++){
        var reg = eval(conditions[i])
        var con = htmlstr.match(reg)[1]
        this.descData.push(con)
      }
      console.log(JSON.stringify(this.descData))
    },
    removeHTMLTag:function (str) {
      str = str.replace(/(\n)+|(\r\n)+/g, "");
      str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
      str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
      str=str.replace(/ /ig,'');
      str=str.replace(/&nbsp;/g,''); 
      console.log(str)
      return str;
    }
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
