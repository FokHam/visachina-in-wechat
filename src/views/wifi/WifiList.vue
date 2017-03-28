<template>
<div class="wifi-list" id="wifi-list">
  <div class="screen">
    <div class="tabs">
      <ul>
        <li :class="{on:countrydis}" class="left" @click="countrydis=true"><span>目的地{{'['+wifiCondition.name+']'}}</span></li>
        <li :class="{on:provincedis}" @click="provincedis=true" class="right"><span>自取城市{{wifiCondition.cityname!=''?'['+wifiCondition.cityname+']':'[全部]'}}</span></li>
      </ul>
    </div>
  </div>
  <div class="list">
    <ul v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="40">
      <li v-for="item in listData">
        <router-link :to="'/wifiDetail/'+item.id+'/'+item.city">
          <div class="tit">{{item.name+'('+item.city_name+'取还)'}}</div>
          <div class="desc">
            <div class="tags">
              <span class="b">{{item.speed}}</span>
              <span class="r">{{item.take_place_num}}个取机点</span>
            </div>
            <div class="co_name">供应商：{{item.company}}</div>
          </div>
          <div class="price"><i>￥{{item.unitPrice}}</i><span>&frasl; 天起</span></div>
        </router-link>
      </li>      
    </ul>
    <p class="page-infinite-loading" v-if="pagestatus">加载更多数据</p>   
  </div>
  <div class="empty" v-if="listData.length == 0&&pagestatus == false">
    暂无相关产品
  </div>
  <country :isShow="countrydis" @choseCountry="changeCountry" @closePage="closeComp"></country>
  <province :isShow="provincedis" @choseGetType="changeGetType" @closePage="closeComp"></province>
</div>
</template>

<script>
import Country from './wifilist/Country'
import Province from './wifilist/Province'
import { Indicator } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'
export default {
  name:"wifi-list",
  created: function () {
    document.title = this.wifiCondition.name
    this.getData('refresh')
  },
  components: {
    Country,
    Province
  },
  data:function(){
    return{
      wifiCondition:this.wifiCondition,
      countrydis:false,
      provincedis:false,
      listData:[],
      pagestatus:true  
    }
  },
  methods:{
    getData:function(v){
      if (v == 'refresh') {
        this.listData = []
        this.wifiCondition.page = 1
        this.pagestatus = true
      }else{
        this.wifiCondition.page += 1
      }
      Indicator.open('加载中...');
      var url = '/api/wifi/list',send = this.wifiCondition
      this.$http.get(url,{params:send}).then(function(result){
        Indicator.close()
        var rst = JSON.parse(result.body)        
        if (rst.status == 1) {
          for (var i in rst.data.rows){
            if (rst.data.rows[i].name) {
              this.listData.push(rst.data.rows[i])
            }
          }
          if (this.wifiCondition.page == rst.data.totalPage || rst.data.rows.length == 0) {
            this.pagestatus = false            
          }                  
        }else {
          console.log(rst.msg)
        }
      });
    },
    loadMore:function(){
      if (this.listData.length != 0 && this.pagestatus) {
        this.getData()
      }      
    },
    changeCountry:function(name,id){
      this.countrydis = false
      var data = {"name":name,"area_id":id}
      this.$store.commit('wifiConditionSave',data)
      this.getData('refresh')
    },
    changeGetType:function(name,id){
      this.provincedis = false
      var data = {"name":name,"area_id":id}
      this.$store.commit('wifiConditionCity',data)
      this.getData('refresh')
    },
    closeComp:function(){
      this.countrydis = false
      this.provincedis = false
    }
  },
  computed: {
    wifiCondition () {
      return this.$store.state.wifi.wifiCondition;
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
        &.right span{background-image: url('/static/images/wifi/icon-location-grey.png')}
        &.on{
          border-bottom: 1px solid #008be4;
          span{color: #008be4;}
          &.left span{background-image: url('/static/images/wifi/icon-destination-on.png')}
          &.right span{background-image: url('/static/images/wifi/icon-location-grey-on.png')}
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
  .empty {
    text-align: center;
    font-size: .7rem;
    color: #ccc;
    line-height: 6rem;
  }
  .page-infinite-loading {
        line-height: 40px;
        text-align: center;
        font-size: 0.7rem;
    }
}
</style>
