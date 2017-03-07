<template>
<div class="wifi" id="wifi" v-if="pageData != ''">
  <div class="wifiPage" v-if="searchdis == false">
    <div class="grid_top">
      <div class="search" @click="searchdis=true"><span>你想去哪儿？</span></div>
      <banner :pics="pageData.banners"></banner>
      <router-link class="help" to="/WifiHelp">
        <div class="tit">新手攻略</div>
        <div class="txt">如何预定、取还、使用 ></div>
      </router-link>
    </div>
    <div class="grid_hot" v-if="pageData.hotCounties">
      <div class="tit">热门目的地WIFI</div>
      <div class="list">
        <div class="ctrs" :style="{width:hotItemWidth+'px'}" v-for="item in pageData.hotCounties" @click="changeCountry(item.name,item.area_id)"><img :src="item.image"><span>{{item.name}}</span><div class="s"></div></div>
        
      </div>
    </div>
    <div class="grid_suggest">
      <div class="tit">爆款推荐</div>
      <div class="list">
        <router-link v-for="item in pageData.hotProducts" class="item" :to="'/WifiDetail/'+item.id">
          <div class="left" :style="{'background-image':'url('+item.image+')'}"></div>
          <div class="right">
            <div class="name">{{item.name}}</div>
            <div class="tags"><span>多人畅享</span><span>超低价</span></div>
            <div class="price"><span>￥{{item.price}}</span>/天起</div>
          </div>
        </router-link>
        
      </div>
    </div>
  </div>
  <country 
  v-if="searchdis" 
  :hotlist="pageData.hotCounties"
  v-on:choseCountry="changeCountry" 
  v-on:closePage="closeComp">    
  </country>
</div>
</template>

<script>
import Country from './wifiindex/SearchCountry'
import { Indicator } from 'mint-ui'
import Banner from './wifiindex/Banner'
export default {
  name:"wifi",
  beforeCreate(){
    document.title = "全球WIFI"    
  },
  created: function () {    
    this.getWifiIndex()
    this.setWidth()
  },
  components: {
    Country,
    Banner
  },
  data:function(){
    return{
      pageData:'',
      hotItemWidth:0,
      searchdis:false
      
    }
  },
  methods:{
    setWidth:function(){
      var bd_width = document.body.clientWidth
      this.hotItemWidth = (bd_width-34)/3
    },
    changeCountry:function(name,id){
      this.searchdis = false
      var data = {"name":name,"area_id":id}
      this.$store.commit('wifiConditionSave',data)
      this.$router.push('/wifiList')
    },
    closeComp:function(){
      this.searchdis = false
    },
    getWifiIndex:function(){
      Indicator.open('加载中...');
      var url = '/api/wifi/index'
      this.$http.get(url).then(function(result){
        Indicator.close()
        var rst = JSON.parse(result.body)
        console.log(result.body)
        if (rst.status == 1) {
          console.log(JSON.stringify(rst))
          this.pageData = rst.data          
        }else {
          console.log(rst.msg)
        }
      });
    }
  }
}

</script>

<style lang="less" scoped>
.wifi{
  .grid_top{
    background-color: #fff;overflow: hidden;margin-bottom: 10px;
    .search{
      height: 25px;line-height: 25px;text-align: center;
      border: 1px solid #008BE1;border-radius: 13px;
      margin:8px 10px;
      span{
        font-size: 0.6rem;display: inline-block;line-height: 25px;
        overflow: hidden;padding-left: 22px;
        background-image: url('/static/images/wifi/icon-search.png');
        background-position: left center;background-size: 16px;
        background-repeat: no-repeat;color: #999999;
      }
    }
    .banner{
      img {
        width: 100%;
        display: -webkit-box;
      }
    }
    .help{
      height: 38px;display: block;padding: 0 10px;overflow: hidden;
      .tit{
        line-height: 38px;float: left;padding-left: 30px;font-size: 0.8rem;
        background-image: url('/static/images/wifi/icon-help.png');
        background-position: left center;background-size: 22px;
        background-repeat: no-repeat;
      }
      .txt{float: right;font-size: 0.7rem;color: #999999;line-height: 38px;}
    }
  }
  .grid_hot{
    background-color: #fff;overflow: hidden;margin-bottom: 10px;
    padding:0 3px 15px 10px;
    .tit{font-size: 0.7rem;color: #008BE4;line-height: 35px;}
    .list{
      overflow: hidden;
      .ctrs{
        margin-right: 7px;float:left;border-radius: 3px;overflow: hidden;
        position: relative;margin-bottom: 7px;display: block;
        img{width: 100%;display: -webkit-box;}
        span{
          position: absolute;width: 100%;height: 2rem;line-height: 2rem;
          left:0;top: 50%;text-align: center;margin-top: -1rem;font-size: 0.8rem;color: #fff;z-index: 1;
        }
        .s{
          position: absolute;height: 100%;width: 100%;
          left: 0;top: 0;background-color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
  .grid_suggest{
    background-color: #fff;padding-left: 10px;
    .tit{
      border-bottom: 1px solid #EEEEEE;
      font-size: 0.7rem;color: #008BE4;line-height: 35px;
    }
    .list{
      .item{
        padding: 10px 0;position: relative;display: block;
        min-height: 70px;border-bottom: 1px solid #EEEEEE;
        .left{
          position: absolute;width: 70px;height: 70px;
          left: 0;top: 10px;
          background-size: auto 70px;
          background-position: center;
          background-repeat: no-repeat;
        }
        .right{
          padding-left: 80px;
          .name{font-size: 0.7rem;margin-bottom: 10px;}
          .tags{
            height: 16px;overflow: hidden;margin-bottom: 7px;
            span{
              display: inline-block;
              padding-left: 20px;color: #91d5fe;
              background-image: url('/static/images/wifi/icon-yes.png');
              background-position: left center;
              background-size: 16px;
              background-repeat: no-repeat;
              line-height: 16px;
              margin-right: 10px;
              font-size: 0.6rem;
            }
          }
          .price{
            font-size: 0.6rem;color: #666666;line-height: 20px;
            span{font-size: 0.8rem;color: #D44D00;}
          }
        }
      }
    }
  }
}
</style>
