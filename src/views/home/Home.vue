<template>
  <div id="home" class="home">
    <banner :pics="pics"></banner>
    <div class="search">
      <div class="tabs">
        <span v-on:click="searchTap(0)" v-bind:class="{active:isActive == 0}"><i>签证</i></span>
        <span v-on:click="searchTap(1)" v-bind:class="{active:isActive == 1}"><i>酒店</i></span>
      </div>
      <div class="tabcon">
        <div class="inner">
          <div class="search-input visa-search" v-if="isActive == 0">
            <div class="ipt country">
              <div class="tit">国家</div>
              <div class="txt" @click="openSearch"><input readonly="readonly" type="text" placeholder="你想去哪里？"></div>
            </div>
            <div class="ipt position">
              <div class="tit">常住地</div>
              <div class="txt" @click="openProvice"><input readonly="readonly" type="text" placeholder="你居住在哪里？"></div>
            </div>
            <div class="ipt visatype lastchild">
              <div class="tit">类型</div>
              <div class="txt"><input readonly="readonly" type="text" value="旅游签证"></div>
            </div>
            <div class="s_btn">搜索</div>
          </div>
          <div class="search-input hotel-search" v-else>
            <div class="ipt country">
              <div class="tit">目的地城市</div>
              <div class="txt"><input readonly="readonly" type="text" placeholder="你想去哪里？"></div>
            </div>
            <div class="ipt calendar" v-on:click="openStartPicker()">
              <div class="tit">入住日期</div>
              <div class="txt"><input readonly="readonly" type="text" placeholder="你想哪一天入住？" v-model="startDate"></div>
            </div>
            <div class="ipt calendar lastchild" v-on:click="openEndPicker()">
              <div class="tit">离店日期</div>
              <div class="txt"><input readonly="readonly" type="text" placeholder="你想哪一天离开？" v-model="endDate"></div>
            </div>
            <div class="s_btn">搜索</div>
          </div>
        </div>
      </div>
    </div>
    <div class="morelink">
      <div class="tit">途经更多产品</div>
      <div class="l_list">
        <router-link class="insurance" to="/insurance"><span>保险</span></router-link>
        <router-link class="wifi" to="/wifi"><span>wifi</span></router-link>
        <router-link class="notarization" to=""><span>公证认证</span></router-link>
        <router-link class="line" to=""><span>线路</span></router-link>
      </div>
    </div>
    <div class="check-made">
      <img src="/static/images/home/bg-in-bt.png">
      <router-link class="check" to="">
        <i>查看签证进度</i>
        <span>登陆</span>
      </router-link>
      <router-link class="customized" to="">
        <span>定制行程 ></span>
      </router-link>
    </div>
    <countrys :isShow="searchdis" v-on:choseCountry="changeCountry" v-on:closePage="closeComp"></countrys>
    <provice :isShow="provicedis" v-on:chosepvc="choseProvice" v-on:closePage="closeComp" ></provice>
    <mt-datetime-picker
      ref="startpicker"
      type="date"
      v-model="nowDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="startConfirm">
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="endpicker"
      type="date"
      v-model="selectDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="endConfirm">
    </mt-datetime-picker>
  </div>

</template>

<script>
import { DatetimePicker } from 'mint-ui';
import { Indicator } from 'mint-ui'
import Banner from '../../components/Banner'
import Countrys from '../../components/SearchCountry'
import Provice from '../../components/ProviceList'
export default {
  name:'home',
  beforeCreate(){
    document.title = "途经旅游"
    Indicator.open('加载中...');
  },
  created: function () {
    Indicator.close()    
  },
  data:function(){
    return {
      isActive: 0,
      searchdis:false,
      provicedis:false,
      startDate: '',
      endDate: '',
      nowDate: new Date(),
      selectDate: '',
      pics: [{'pic':'/static/images/home/pic1.png','link':'/visa'},{'pic':'/static/images/home/pic1.png','link':'/hotel'},{'pic':'/static/images/home/pic1.png','link':'/hotel'}]
    }
  },
  methods:{
    searchTap: function(v){
      this.isActive = v
    },
    openStartPicker:function() {
        this.$refs.startpicker.open();
    },
    openEndPicker:function() {
        this.$refs.endpicker.open();
    },
    startConfirm: function (t){
      var m = t.getMonth()+1
      this.startDate = t.getFullYear() +'-'+ m +'-'+ t.getDate()
      var t = t.getTime() + 86400000
      this.selectDate = new Date(t)
    },
    endConfirm: function (t){
      var m = t.getMonth()+1
      this.endDate = t.getFullYear() +'-'+ m +'-'+ t.getDate()
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
    closeComp:function(){
      this.provicedis = false
      this.searchdis = false
    }

  },
  components: {
    Banner,
    Countrys,
    Provice
  }
}
</script>

<style lang="less" scoped>
  .search{
    border-bottom: 1px solid #C0C0C0;
    background: #fff;
    .tabs{
      display: flex;
      span{
        text-align: center;
        display: inline-block;width: 50%;line-height: 40px;
        height: 37px;
        border-bottom: 3px solid #fff;
        i{
          display: inline-block;
          height: 37px;
          width: 50px;
          font-size: 0.75rem;
          background-repeat: no-repeat;
          background-size: 21px;
          background-position: left center;
          line-height: 40px;
          font-style: normal;
          padding-left: 22px;
        }
        &.active{
          border-bottom: 3px solid #008BE4;
          color: #008BE4;
          &:first-child i{
            background-image: url(/static/images/home/icon-visa-check.png);
          }
          &:last-child i{
            background-image: url(/static/images/home/icon-hotel-check.png);
          }
        }
        &:first-child i{
          background-image: url(/static/images/home/icon-visa.png);
        }
        &:last-child i{
          background-image: url(/static/images/home/icon-hotel.png);
        }
      }
    }
    .search-input{
      overflow: hidden;
      .ipt{
        border-bottom: 1px solid #C0C0C0;
        padding: 12px 20px;
        .tit{font-size: 0.6rem;color: #666666;padding-bottom: 10px;}
        .txt{
          input{
            font-size: 0.9rem;
            color: #333333;
            height: 30px;
            border: none;width: 100%;
            background-size: auto 17px;
            background-repeat: no-repeat;
            background-position: right center;
          }
        }
        &.country input{background-image:url('/static/images/home/icon-flag.png');}
        &.position input{background-image:url('/static/images/home/icon-location.png');}
        &.visatype input{background-image:url('/static/images/home/icon-tag.png');}
        &.calendar input{background-image:url('/static/images/home/icon-calendar.png');}
      }
      .ipt.lastchild{border-bottom: none;}
      .s_btn{
        background-color: #09BB07;
        margin: 15px 20px;
        height: 38px;font-size: 0.8rem;
        border-radius: 5px;
        color: #fff;line-height: 38px;text-align: center;
      }
    }
  }
  input::-webkit-input-placeholder {color: #333 !important;}
  .morelink{
    padding-bottom: 15px;
    .tit{color: #999999;font-size: 0.6rem; text-align: center;padding: 12px 0;}
    .l_list{
      padding:0 20px;
      -webkit-column-count: 4;
      -webkit-column-gap: normal;
      column-count: 4;
      column-gap: normal;
      a{
        float: left;
        display: inline-block;width: 3rem;
        height: 3rem;background-color: #fff;
        border-radius: 2px;
        background-repeat: no-repeat;
        background-size: 1.5rem;background-position: center 0.3rem;
        &.insurance{background-image: url('/static/images/home/icon-insurance.png');}
        &.wifi{background-image: url('/static/images/home/icon-wifi.png');}
        &.notarization{background-image: url('/static/images/home/icon-notarization.png');}
        &.line{background-image: url('/static/images/home/icon-line.png');}
        span{
          font-size: 0.6rem;
          color: #333333;
          text-align: center;
          padding-top: 2rem;
          display: block;
        }
      }
    }
  }
  .check-made{
    position: relative;
    a{
      position: absolute;top: 0;
      width: 50%;height: 100%;display: block;
    }
    .check{
      left: 0;
      text-align: center;
      i{
        font-size: 0.6rem;color: #fff;
        font-style: normal;padding: 0.5rem 0 ;
        display:block;margin: 0 auto;      }
      span{
        font-size: 0.7rem;color: #fff;
        display:block;height: 2.8rem;width: 2.8rem;
        border:2px dashed #fff;border-radius: 2.8rem;
        line-height: 2.8rem;margin: 0 auto;
      }
    }
    .customized{
      right: 0;
      span{
        font-size: 0.6rem;color: #fff;
        display:block;height: 1.4rem;width: 5.5rem;
        border:1px solid #fff;
        line-height:1.4rem;margin: 0 auto;
        text-align: center;    margin-top: 2rem;
      }
    }
  }
  
</style>
