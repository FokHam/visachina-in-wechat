<template>
<div class="wifi-list" id="wifi-list">
  <div class="screen">
    <div class="tabs">
      <ul>
        <li :class="{on:countrydis}" class="left" @click="countrydis=true"><span>目的地</span></li>
        <li :class="{on:provincedis}" @click="provincedis=true" class="right"><span>自取城市/快递</span></li>
      </ul>
    </div>
  </div>
  <div class="list">
    <ul>
      <li>
        <router-link to="/wifiDetail/1213">
          <div class="tit">日本旅行WIFI租赁（广州取还）</div>
          <div class="desc">
            <div class="tags">
              <span class="b">4G网络</span>
              <span class="r">3个取机点</span>
            </div>
            <div class="co_name">供应商：环球漫游</div>
          </div>
          <div class="price"><i>￥9</i><span>&frasl; 天起</span></div>
        </router-link>
      </li>
      <li>
        <router-link to="/wifiDetail/1213">
          <div class="tit">日本旅行WIFI租赁（广州取还）</div>
          <div class="desc">
            <div class="tags">
              <span class="b">4G网络</span>
              <span class="r">3个取机点</span>
            </div>
            <div class="co_name">供应商：环球漫游</div>
          </div>
          <div class="price"><i>￥9</i><span>&frasl; 天起</span></div>
        </router-link>
      </li>
      <li>
        <router-link to="/wifiDetail/1213">
          <div class="tit">日本旅行WIFI租赁（广州取还）</div>
          <div class="desc">
            <div class="tags">
              <span class="b">4G网络</span>
              <span class="r">3个取机点</span>
            </div>
            <div class="co_name">供应商：环球漫游</div>
          </div>
          <div class="price"><i>￥9</i><span>&frasl; 天起</span></div>
        </router-link>
      </li>
      <li>
        <router-link to="/wifiDetail/1213">
          <div class="tit">日本旅行WIFI租赁（广州取还）</div>
          <div class="desc">
            <div class="tags">
              <span class="b">4G网络</span>
              <span class="r">3个取机点</span>
            </div>
            <div class="co_name">供应商：环球漫游</div>
          </div>
          <div class="price"><i>￥9</i><span>&frasl; 天起</span></div>
        </router-link>
      </li>
      <li>
        <router-link to="/wifiDetail/1213">
          <div class="tit">日本旅行WIFI租赁（广州取还）</div>
          <div class="desc">
            <div class="tags">
              <span class="b">4G网络</span>
              <span class="r">3个取机点</span>
            </div>
            <div class="co_name">供应商：环球漫游</div>
          </div>
          <div class="price"><i>￥9</i><span>&frasl; 天起</span></div>
        </router-link>
      </li>
      <li>
        <router-link to="/wifiDetail/1213">
          <div class="tit">日本旅行WIFI租赁（广州取还）</div>
          <div class="desc">
            <div class="tags">
              <span class="b">4G网络</span>
              <span class="r">3个取机点</span>
            </div>
            <div class="co_name">供应商：环球漫游</div>
          </div>
          <div class="price"><i>￥9</i><span>&frasl; 天起</span></div>
        </router-link>
      </li>
    </ul>
  </div>
  <country :isShow="countrydis" :cname="$route.params.country" @choseCountry="changeCountry" @closePage="closeComp"></country>
  <province :isShow="provincedis" :cname="progettype" @choseGetType="changeGetType" @closePage="closeComp"></province>
</div>
</template>

<script>
import Country from './wifilist/Country'
import Province from './wifilist/Province'
import { Indicator } from 'mint-ui'

export default {
  name:"wifi-list",
  beforeCreate(){
    document.title = this.$route.params.country
    Indicator.open('加载中...')
  },
  created: function () {
    Indicator.close()
  },
  components: {
    Country,
    Province
  },
  data:function(){
    return{
      countrydis:false,
      provincedis:false,
      progettype:''
      
    }
  },
  methods:{
    changeCountry:function(name){
      this.countrydis = false
      console.log(name);
    },
    changeGetType:function(name){
      this.provincedis = false
      this.progettype = name
      console.log(name);
    },
    closeComp:function(){
      this.countrydis = false
      this.provincedis = false
    }
  }
}

</script>

<style lang="less" scoped>
.wifi-list{
  .screen{
    .tabs{
      overflow: hidden;height: 36px;
      background-color: #fff;position: relative;
      li{
        width: 50%;float: left;text-align: center;
        border-bottom: 1px solid #C0C0C0;
        span{
          display: inline-block;line-height: 35px;font-size: 0.7rem;color: #666666;
          background-repeat: no-repeat;background-position: left center;
          background-size: 16px;padding-left: 20px;
        }
        &.left span{background-image: url('/static/images/wifi/icon-destination.png')}
        &.right span{background-image: url('/static/images/wifi/icon-location.png')}
        &.on{
          border-bottom: 1px solid #008be4;
          span{color: #008be4;}
          &.left span{background-image: url('/static/images/wifi/icon-destination-on.png')}
          &.right span{background-image: url('/static/images/wifi/icon-location-on.png')}
        }
        
      }
      &:before{
        content: '';position: absolute;
        height: 25px;width: 1px;left: 50%;top: 5px;
        background-color: #C0C0C0;
      }
    }
  }
  .list{
    li{
      background-color: #fff;
      padding-left: 10px;
      padding-top: 5px;margin-bottom: 10px;
      a{display: block;}
      .tit{font-size: 0.7rem;line-height: 30px;}
      .desc{
        overflow: hidden;padding-right: 10px;padding-bottom: 10px;
        border-bottom: 1px solid #EEEEEE;
        .tags{
          float: left;
          span{
            display: inline-block;font-size: 0.6rem;
            line-height: 18px;border-radius: 2px;padding: 0 5px;
            &.b{border: 1px solid #008BE1;color: #008BE1;}
            &.r{border: 1px solid #FD728C;color: #FD728C;}
          }
        }
        .co_name{
          float: right;font-size: 0.6rem;color: #999999;
          line-height: 20px;
        }
      }
      .price{        
        i{
          color: #D44B00;font-size: 0.8rem;font-style: normal;
          line-height: 35px;display: inline-block;
        }
        span{
          font-size: 0.6rem;color: #666666;line-height: 35px;
          display: inline-block;padding-left: 5px;
        }
      }
    }
  }
}
</style>
