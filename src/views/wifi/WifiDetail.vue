<template>
<div class="wifi-detail" id="wifi-detail" :class="{hidden:rangeDis}">
  <div v-if="pageData != ''">
    <div class="part-top">
      <div class="pic" :style="{'background-image':'url('+pageData.images+')'}"></div>
      <div class="desc">
      <div class="name">{{pageData.name+'('+pageData.city_name+'取还)'}}</div>
        <div class="btm">
          <div class="price">
            <i>￥{{pageData.unitPrice}}</i><span>&frasl; 天起</span>
          </div>
          <div class="txt">押金：<i>{{pageData.erp_foregift_price}}</i>元/台</div>
        </div>
      </div>
    </div>
    <div class="part-detail">
      <div class="tit">
        <i class="icon icon-wifi"></i>设备详情
      </div>
      <div class="detail-con info">
        <dl><dd>网络情况：</dd><dt>{{pageData.erp_speed}}</dt></dl>
        <dl><dd>流量限制：</dd><dt>{{pageData.erp_networkflow}}</dt></dl>
        <dl><dd>机器性能：</dd><dt>{{pageData.erp_performance}}</dt></dl>
        <dl><dd>标准配置：</dd><dt>{{pageData.erp_deviceconfig}}</dt></dl>
        <dl><dd>适用地点：</dd><dt>
        <span v-for="(item,index) in rangeData" v-if="index < 5">
          {{item}}{{index<4&&rangeData.length!=index+1?'、':''}}
        </span>
        <span v-if="rangeData.length > 5">...</span>
        <span v-if="rangeData.length > 5" class="showmore" @click="rangeDis = true">查看全部</span></dt></dl>
      </div>
    </div>
    <div class="part-detail">
      <div class="tit">
        <i class="icon icon-location"></i>取货网点
      </div>
      <div class="detail-con counter">
        <ul>
          <li v-for="item in placeData">
            <div class="name">【{{item.name}}】</div>
            <div class="address">
              <p>{{item.address}}</p>
              <span>营业时间：{{item.office_hours}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="part-detail">
      <div class="tit">
        <i class="icon icon-money"></i>费用说明
      </div>
      <div class="detail-con priceinfo">
        <dl>
          <dd>租金</dd>
          <dt v-html="pageData.web_charge"></dt>
        </dl>
        <dl>
          <dd>押金</dd>
          <dt v-html="pageData.web_deposit"></dt>
        </dl>
      </div>
    </div>
    <div class="part-detail">
      <div class="tit">
        <i class="icon icon-refund"></i>退货说明
      </div>
      <div class="detail-con refund" v-html="pageData.web_return">
        
      </div>
    </div>
    <div class="booking">
      <div class="addfev" :class="{collect:iscollect==1}" @click="addCollect">收藏</div>
      <div class="bookbtn"><router-link :to="'/wifiOrder/'+$route.params.id+'/'+$route.params.city">立即预定</router-link></div>
    </div>
  <div> 
  <wifi-range
  v-if="rangeDis"
  :countryData="rangeData"
  @close="rangeDis = false">    
  </wifi-range> 
</div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import { Toast } from 'mint-ui'
  import WifiRange from './wifidetail/WifiRange'
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
        wifiCondition:this.wifiCondition,
        pageData:'',
        placeData:[],
        rangeData:[],
        rangeDis:false,
        iscollect:0
      }
    },
    methods:{
      getWifiDetails:function(){      
        Indicator.open('加载产品信息')
        var url = '/api/wifi/info',send = {id:this.$route.params.id,city:this.$route.params.city};
        this.$http.get(url,{params:send}).then(function(result){
          Indicator.close()
          console.log(result.body)
          var rst = JSON.parse(result.body)
          if (rst.status == 1) {
            this.pageData = rst.data
            this.rangeData = rst.data.erp_scope.split(/[,、]/);
            console.log(this.rangeData)
            this.getWifiPlace()
            this.isCollect()
          }else {
            console.log(rst.msg)
          }
        });
      },
      getWifiPlace:function(){
        var url = '/api/wifi/places',send = {cid:this.$route.params.city,act:1}
        this.$http.get(url,{params:send}).then(function(result){
          console.log(result.body)
          var rst = JSON.parse(result.body)
          if (rst.status == 1) {
            this.placeData = rst.data
          }else {
            console.log(rst.msg)
          }
        });         
      },
      addCollect:function(){
        let url = '/api/member/collect_create'
        let send = {
          type:'wifi',
          product_id:this.$route.params.id,
          attrs:this.$route.params.city
        }
        this.$http.get(url,{params:send}).then(function(result){
          var rst = JSON.parse(result.body)
          if (rst.status == 1) {
            this.isCollect()
            Toast(rst.msg)
          }else {
            console.log(rst.msg)
          }
        });
      },
      isCollect:function(){
        let url = '/api/member/is_collect'
        let send = {
          type:'wifi',
          product_id:this.$route.params.id,
          attrs:this.$route.params.city
        }
        this.$http.get(url,{params:send}).then(function(result){
          var rst = JSON.parse(result.body)
          console.log(result.body)
          if (rst.status == 1) {          
            this.iscollect = rst.data.result
          }else {
            console.log(rst.msg)
          }
        });
      }
    },
    computed: {
      wifiCondition () {
        return this.$store.state.wifi.wifiCondition;
      }    
    },
    components:{
      WifiRange
    }
  }
</script>

<style lang="less" scoped>
.wifi-detail{
  padding-bottom: 3rem;
  &.hidden{
    position: absolute;
    overflow: hidden;
    height: 100%;
    top: 0;
  }
  .part-top{
    padding: 0.75rem 0.5rem;background-color: #fff;
    height: 4.5rem;position: relative;
    .pic{
      width: 4.5rem;height: 4.5rem;position: absolute;left: 0.5rem;top: 0.75rem;
      background-size: auto 4.5rem;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .desc{
      padding-left: 5rem;      
      .name{font-size: 0.8rem;}      
      .btm{
        position: absolute;
        bottom: 0.75rem;
        left: 5.5rem;
        .txt{
          font-size: 0.6rem;color: #999999;
          i{font-size: 0.6rem;color: #D44B00;font-style: normal;}
        }
        .price{
          overflow: hidden;
          padding-bottom: 0.2rem;
          i{
            color: #D44B00;font-size: 0.8rem;font-style: normal;
            line-height: 1.25rem;display:block;float: left;
          }
          span{
            font-size: 0.6rem;color: #666666;line-height: 1.25rem;
            display:block;float: left;padding-left: 0.25rem;
          }
        }
      }
    }
  }
  .part-detail{
    background-color: #fff;
    padding: 0.8rem 0.5rem;
    margin-top: 0.3rem;
    .tit{
      font-size: 0.8rem;
      color: #333;
      line-height: 1rem;
      padding-left: 1rem;
      position: relative;
      padding-bottom: 0.8rem;
      .icon{
        position: absolute;
        left: 0;top: 0;
        display: block;
        height: 1rem;
        width: 1rem;
        background-size: 0.7rem;
        background-repeat: no-repeat;
        background-position: left center;
      }
    }
  }
  .icon-wifi{background-image:url('/static/images/wifi/icon-wifi.png');}
  .icon-location{background-image:url('/static/images/wifi/icon-location.png');}
  .icon-money{background-image:url('/static/images/wifi/icon-money.png');}
  .icon-refund{background-image:url('/static/images/wifi/icon-refund.png');}
  .detail-con{
    color: #666666; 
    font-size: 0.7rem;
    &.info{
      dl{
        position: relative;
        font-size: 0.7rem;
        margin-bottom: 0.2rem;
        dd{
          position: absolute;
          left: 0;
          top: 0;
          line-height: 1rem;
          width: 4rem;
        }
        dt{
          line-height: 1rem;
          padding-left: 4rem;
          .showmore{
            color:#008be4;display:block;
          }
        }
      }
    }
    &.counter{
      li{
        padding-bottom: 0.4rem;
        margin-bottom: 0.4rem;
        border-bottom: 1px solid #eeeeee;
        &:last-child{
          padding-bottom:0;
          margin-bottom: 0;
          border-bottom: none;
        }
        .name{
          font-size: 0.7rem;
        }
        .address{
          padding-top: 0.4rem;
          padding-left: 1.5rem;
          p{
            font-size: 0.7rem;
            padding-bottom: 0.4rem;
          }
          span{
            display: block;
            font-size: 0.7rem;
            color: #008be4;
            line-height: 1rem;
            background-image: url('/static/images/wifi/icon-clock.png');
            background-repeat: no-repeat;
            background-position: left 0.1rem;
            background-size: 0.8rem;
            padding-left: 1rem;
          }          
        }        
      }
    }
    &.priceinfo{
      dl{
        margin-bottom: 0.5rem;
        dd{color: #333333;font-weight: bold;padding-bottom: 0.4rem;}
      }
    }
  }
  .booking{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .bookbtn{
      height: 2.5rem;line-height: 2.5rem;margin-left: 2.75rem;
      background-color: #008CE4;text-align: center;font-size: 0.8rem;color: #fff;
      a{
        display: block;font-size: 0.8rem;color: #fff;
      }
    }
    .addfev{
      position: absolute;
      height: 1rem;
      padding-top: 1.5rem;
      width: 2.75rem;
      background-color: #fff;
      left: 0;
      top: 0;
      font-size: 0.6rem;
      text-align: center;
      background-image: url('/static/images/visa/uncollect.png');
      background-repeat: no-repeat;
      background-size: 1.25rem;
      background-position: center 0.4rem;
      color: #fe7c98;
      &.collect{
        background-image: url('/static/images/visa/collect.png');
      }
    }
  }
}
</style>
