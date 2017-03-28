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
        <div class="ctrs" :style="{width:hotItemWidth+'px',background:'url('+item.image+') no-repeat center / cover'}" v-for="item in pageData.hotCounties" @click="changeCountry(item.name,item.area_id)"><img src="/static/images/common/190-131.png"><div class="name">{{item.name}}<span v-if="item.lower_price > 0">￥{{item.lower_price}}元/天起</span><span v-else>暂无产品</span></div><div class="s"></div></div>        
      </div>
    </div>
    <div class="grid_suggest">
      <div class="tit">爆款推荐</div>
      <div class="list">
        <router-link v-for="item in pageData.hotProducts" class="item" :to="'/WifiDetail/'+item.id+'/'+item.city">
          <div class="left" :style="{'background-image':'url('+item.image+')'}"></div>
          <div class="right">
            <div class="name">{{item.name+'('+item.city_name+'取还)'}}</div>
            <div class="tags">
              <span class="b">{{item.speed}}</span>
              <span class="r">{{item.take_place_num}}个取机点</span>
            </div>
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
        font-size: .6rem;
        line-height: 25px;
        overflow: hidden;
        padding-left: 22px;
        background-image: url(/static/images/wifi/icon-search.png);
        background-position: 0;
        background-size: 16px;
        background-repeat: no-repeat;
        color: #999;
        display: inline-block;
        height: 25px;
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
        .name{
          position: absolute;
          width: 100%;
          line-height: 1rem;
          left: 0;
          height: 2rem;
          top: 50%;
          text-align: center;
          margin-top: -0.9rem;
          font-size: .8rem;
          color: #fff;
          z-index: 1;
          span {
            display: block;
            color: rgba(255,255,255,0.9);
            font-size: 0.5rem;
          }
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
          .name{font-size: 0.7rem;}
          .tags{
            overflow: hidden;
            margin: 0.25rem 0;
            span{
              display: inline-block;font-size: 0.6rem;
              line-height: 18px;border-radius: 2px;padding: 0 5px;
              &.b{border: 1px solid #008BE1;color: #008BE1;}
              &.r{border: 1px solid #FD728C;color: #FD728C;}
            }
          }
          .price{
            font-size: 0.6rem;color: #666666;line-height: 20px;
            span{font-size: 0.7rem;color: #D44D00;}
          }
        }
      }
    }
  }
}
</style>
