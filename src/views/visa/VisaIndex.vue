<template>
  <div id="visa" class="visa">
    <div class="part-top">
      <img src="/static/images/visa/banner.png">
      <div class="flag">
        <img src="/static/images/visa/flag.png">
      </div>
      <div class="location">
        <span class="c_name">芬兰</span>
        <span class="m_name" @click="openProvice">湖北省</span>
      </div>
      <div class="search_btn" @click="openSearch"><span>搜索国家</span></div>
    </div>
    <div class="screening">
      <div class="tabs">
        <span :class="{on:tabcount == 1}" @click="tapDrop(1)">签证类别</span>
        <span :class="{on:tabcount == 2}" @click="tapDrop(2)">入境期限</span>
        <span :class="{on:tabcount == 3}" @click="tapDrop(3)">加急</span>
        <div class="openscren" @click="openScreen">筛选</div>
      </div>
      <div class="tabselecter" v-show="tabcount != 0">
        <div class="options" :class="{on1:tabcount == 1}">
          <ul>
            <li>全部</li>
            <li>旅游签证</li>
            <li>商务签证</li>
            <li>留学签证</li>
            <li>探亲签证</li>
            <li>工作签证</li>
            <li>其他签证</li>
          </ul>
        </div>
        <div class="options" :class="{on2:tabcount == 2}">
          <ul>
            <li>全部</li>
            <li>单次入境</li>
            <li>多次入境</li>
            <li>领馆定</li>
          </ul>
        </div>
        <div class="options" :class="{on3:tabcount == 3}">
          <ul>
            <li>全部</li>
            <li>加急</li>
          </ul>
        </div>
      </div>
      <div class="shadow" v-show="tabcount != 0"></div>
    </div>
    <countrys :isShow="searchdis" v-on:choseCountry="changeCountry" v-on:closePage="closeComp"></countrys>
    <provice :isShow="provicedis" v-on:closePage="closeComp" v-on:chosepvc="choseProvice"></provice>
    <screen :isShow="screendis" v-on:closePage="closeComp" v-on:chosescr="screenConfirm"></screen>
    <div class="visalist">
      <list v-bind:listdata="listdata"></list>      
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui';
import { Spinner } from 'mint-ui';
import List from './visaindex/List'
import Screen from './visaindex/Screening'
import Countrys from '../../components/SearchCountry'
import Provice from '../../components/ProviceList'

export default {
  name:"visa",
  beforeCreate(){
    document.title = "签证列表"
    Indicator.open('加载中...');
  },
  created: function () {
    Indicator.close();
  },
  components: {
    List,
    Countrys,
    Provice,
    Screen
  },
  data:function(){
    return{
      searchdis:false,
      provicedis:false,
      screendis:false,
      tabcount:0,
      listdata:[
        {
          'pic':'/static/images/visa/defaultpic.png',
          'name':'芬兰旅游签证',
          'staydays':'按申请',
          'effective':'使馆定',
          'interview':'无需面试',
          'visatype':0,
          'processdays':'7-15个工作日',
          'price':'299'
        },
        {
          'pic':'/static/images/visa/defaultpic.png',
          'name':'美国旅游签证',
          'staydays':'按申请',
          'effective':'使馆定',
          'interview':'需要面试',
          'visatype':1,
          'processdays':'7-15个工作日',
          'price':'1299'
        },
        {
          'pic':'/static/images/visa/defaultpic.png',
          'name':'朝鲜旅游签证',
          'staydays':'按申请',
          'effective':'使馆定',
          'interview':'无需面试',
          'visatype':2,
          'processdays':'4-7个工作日',
          'price':'500'
        }
      ]
    }
  },
  methods:{
    tapDrop:function(v){
      if (this.tabcount == v) {
        this.tabcount = 0
      }else {
        this.tabcount = v
      }
    },
    openSearch:function(){
      this.searchdis = true
    },
    changeCountry:function(name){
      this.searchdis = false
      alert(name);
    },
    openProvice:function(){
      this.provicedis = true
    },
    choseProvice:function(name){
      this.provicedis = false
      alert(name);
    },
    openScreen:function(){
      this.screendis = true
    },
    screenConfirm:function(fast,type,date){
      console.log(fast+'--'+type+'--'+date)
      
    },
    closeComp:function(){
      this.provicedis = false
      this.searchdis = false
      this.screendis = false
    }
  }
}
</script>

<style lang="less" scoped>
.part-top{
  position: relative;
  z-index: 99;
  .flag{
    border: 1px solid rgba(255,255,255,0.3);
    height: 60px;width: 60px;
    border-radius: 60px;
    padding: 2px;
    position: absolute;
    top: 10%;left: 50%;margin-left: -31px;
    img{height: 60px;width: 60px;border-radius: 60px;}
  }
  .location{
    position: absolute;
    left: 50%;margin-left: -15px;
    top: 50%;
    .c_name{color: #fff;font-size: 0.8rem;}
    .m_name{color: #fff;font-size: 0.6rem;
      background-image: url('/static/images/visa/icon-location.png');
      background-position: left center;
      background-size: 0.8rem;
      background-repeat: no-repeat;
      padding-left: 17px;
    }    
  }
  .search_btn{
    width: 175px;
    height: 25px;
    border: 2px solid rgba(255,255,255,0.3);
    position: absolute;
    top: 73%;
    left: 50%;
    border-radius: 3px;
    margin-left: -93px;
    span{
      display: block;
      height: 25px;
      background: #fff;
      line-height: 25px;
      text-indent: 10px;
      color: #ccc;
      font-size: 0.7rem;
      background-image: url('/static/images/visa/icon-search.png');
      background-position: right center;
      background-size: 22px;
      background-repeat: no-repeat;
      border-radius: 3px;
    }
  }
}
.screening{  
  position: relative;
  .tabs{
    border-bottom: 1px solid #C0C0C0;
    padding: 0 10px;
    position: relative;
    height: 35px;
    z-index: 999;
    background-color: #fff;
    span{
      line-height: 35px;
      font-size: 14px;
      color: #666666;
      display: inline-block;
      background-image: url('/static/images/visa/icon-down.png');
      background-repeat: no-repeat;
      background-size: 8px;
      background-position: right center;
      padding-right: 15px;
      margin-right: 10px;
      &.on{
        background-image: url('/static/images/visa/icon-up.png');
        color: #D44D00;
      }
    }
    .openscren{
      line-height: 35px;
      font-size: 14px;
      color: #666666;
      background-image: url('/static/images/visa/icon-screen.png');
      background-repeat: no-repeat;
      background-size: 12px;
      background-position: right center;
      position: absolute;
      top: 0;
      right: 10px;
      padding-right: 15px;      
    }
  }
  .tabselecter{
    position: absolute;
    top: 36px;left: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    .options{
      height: 0px;
      -webkit-transition: height .3s;      
      transition: height .3s;
      overflow: hidden;
      li{
        line-height: 30px;height: 30px;
        padding: 0 10px;
        border-bottom: 1px solid #f4f4f4;
        font-size: 0.6rem;text-indent: 15px;
        &:last-child{border-bottom: none;}
      }
      &.on1{height: 216px;}
      &.on2{height: 123px;}
      &.on3{height: 61px;}
    }
  }
  .shadow{
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;height: 100%;width: 100%;
    left: 0;top: 0;
    z-index: 10;
  }

}
</style>
