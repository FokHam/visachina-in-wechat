<template>
  <div id="home" class="home">
    <div class="homePage" v-if="searchdis == false && citydis == false">
      <banner></banner>
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
                <div class="txt" @click="openSearch"><input readonly="readonly" v-model="visacondition.ctname" type="text" placeholder="你想去哪里？"></div>
              </div>
              <div class="ipt position">
                <div class="tit">常住地</div>
                <div class="txt" @click="openProvice"><input readonly="readonly" type="text" v-model="visacondition.dqname" placeholder="你居住在哪里？"></div>
              </div>
              <div class="ipt visatype lastchild">
                <div class="tit">签证类型</div>
                <div class="txt" @click="typedis=true">
                  <span>{{typelist[visacondition.lx]}}</span>                  
                </div>
              </div>
              <div class="s_btn" @click="searchVisa">搜索</div>
            </div>
            <div class="search-input hotel-search" v-else>
              <div class="ipt country" @click="citydis=true">
                <div class="tit">目的地城市</div>
                <div class="txt"><input type="text" placeholder="你想去哪里？" v-model="hotelCondition.destination"></div>
              </div>
              <div class="ipt calendar"  @click="pickingDate=true,pickingType=1">
                <div class="tit">入住日期</div>
                <div class="txt"><input readonly="readonly" type="text" placeholder="你想哪一天入住？" v-model="hotelCondition.startDate"></div>
              </div>
              <div class="ipt calendar lastchild" @click="pickingDate=true,pickingType=2">
                <div class="tit">离店日期</div>
                <div class="txt"><input readonly="readonly" type="text" placeholder="你想哪一天离开？" v-model="hotelCondition.endDate"></div>
              </div>
              <div class="s_btn" @click="searchHotel">搜索</div>
            </div>
          </div>
        </div>
      </div>
      <div class="morelink">
        <div class="tit">途经更多产品</div>
        <div class="l_list">
          <router-link class="insurance" to="/insurance"><span>保险</span></router-link>
          <router-link class="wifi" to="/wifi"><span>wifi</span></router-link>
          <!--<router-link class="notarization" to=""><span>公证认证</span></router-link>
          <router-link class="line" to=""><span>线路</span></router-link>-->
        </div>
      </div>
      <div class="check-made">
        <img src="/static/images/home/bg-in-bt.png">
        <router-link class="check" to="/visaProgress">
          <span>查看签证进度 ></span>
        </router-link>
        <!--<router-link class="customized" to="">
          <span>定制行程 ></span>
        </router-link>-->
      </div>
    </div>
    <countrys
    v-if="searchdis"
    @choseCountry="changeCountry"
    @closePage="closeComp">
    </countrys>
    <cities
    v-if="citydis"
    @choseCity="changeCity"
    @closePage="closeComp">
    </cities>
    <provice
    v-if="provicedis"
    @chosepvc="choseProvice"
    @closePage="closeComp">
    </provice>
    <picker
    v-if="typedis"
    :listdata="typelist"
    @confirm="visatypeSet"
    @close="closeComp">
    </picker>
    <calendar
    v-if="pickingDate"
    v-on:confirm="setDate"
    type1="入住"
    type2="离店"
    :multipleDate="multipleDate"
    :pickType ="pickingType"
    :minDay="minDay"
    :maxDay="maxDay"
    :day1="startDate"
    :day2="endDate"
    :dayDelay="1">
  </calendar>  
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
import Calendar from "../../components/Calendar"
import Banner from './index/Banner'
import Countrys from '../../components/SearchCountry'
import Cities from '../../components/SearchCity'
import Provice from '../../components/ProviceList'
import Picker from '../../components/Picker'

export default {
  name:'home',
  data:function(){
    var sTime = new Date(), eTime;
      sTime.setTime(sTime.getTime() + 24 * 3600 * 1000);
      sTime.setHours(0);
      sTime.setMinutes(0);
      sTime.setSeconds(0);
      sTime.setMilliseconds(0);
      eTime = new Date(sTime.getTime() + 24 * 3600 * 1000);
    return {
      isActive: 0,
      searchdis:false,
      citydis:false,
      provicedis:false,
      typedis:false,
      visacondition:{"ct":"","ctname":"","dq":"","dqname":"","lx":0,"rj":0,"fw":0,"page":1},
      hotelCondition: {
        startDate: '',
        endDate: '',
        destination: ''
      },
      typelist:['不限','旅游签证','商务签证','探亲访友签证','工作签证','留学签证','其他签证'],
      pics: [{'img_url':'/static/images/home/pic1.png','link':'/visa'},{'img_url':'/static/images/home/pic1.png','link':'/hotel'},{'img_url':'/static/images/home/pic1.png','link':'/hotel'}],
      //calendar
      minDay:2,
      maxDay:28,
      singleTime: 0,
      startDate: new Date(sTime.getFullYear(),sTime.getMonth(),sTime.getDate()),
      endDate: new Date(eTime.getFullYear(),eTime.getMonth(),eTime.getDate()),
      multipleDate: true,
      pickingType: 1,
      pickingDate: false
    }
  },
  methods:{
    searchTap (v){
      this.isActive = v
    },
    setDate (s,e){
      this.pickingDate = false
      this.startDate = s
      this.endDate = e
      this.hotelCondition.startDate = s.getFullYear()+'-'+((s.getMonth()+1).toString().length == 1?'0'+(s.getMonth()+1):(s.getMonth()+1))+'-'+(s.getDate().toString().length == 1?'0'+s.getDate():s.getDate())
      this.hotelCondition.endDate = e.getFullYear()+'-'+((e.getMonth()+1).toString().length == 1?'0'+(e.getMonth()+1):(e.getMonth()+1))+'-'+(e.getDate().toString().length == 1?'0'+e.getDate():e.getDate())
    },
    openSearch () {
      this.searchdis = true
    },
    changeCountry (name,id) {
      this.searchdis = false
      this.visacondition.ct = id
      this.visacondition.ctname = name
    },
    changeCity (name) {
      this.citydis = false
      this.hotelCondition.destination = name
    },
    openProvice () {
      this.provicedis = true
    },
    choseProvice (name,id) {
      this.provicedis = false
      this.visacondition.dq = id
      this.visacondition.dqname = name
    },
    closeComp () {
      this.provicedis = false
      this.citydis = false
      this.searchdis = false
      this.typedis = false
    },
    visatypeSet (v) {
      this.typedis = false
      var n = this.typelist.indexOf(v)
      this.visacondition.lx = n
    },
    searchVisa () {
      if (this.visacondition.ct != '' && this.visacondition.dq != '') {
        this.$store.commit('searchConditionSave', this.visacondition)
        this.$router.push('/visa')
      }else {
        Toast('请选择目的地和常住地');
      }
    },
    searchHotel () {
      if (this.hotelCondition.startDate !== '' && this.hotelCondition.endDate !== '' && this.hotelCondition.destination !== '') {
        this.$store.commit('searchHotelConditionSave', this.hotelCondition)
        this.$router.push('/hotel')
      }else {
        Toast('请选择目的地和入离店日期');
      }
    },
  },
  components: {
    Banner,
    Countrys,
    Cities,
    Provice,
    Picker,
    Calendar
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
          span{
            font-size: 0.9rem;
            color: #333333;
            height: 30px;display: block;
            border: none;width: 100%;
            background-size: auto 17px;
            background-repeat: no-repeat;
            background-position: right center;
          }
        }
        &.country input{background-image:url('/static/images/home/icon-flag.png');}
        &.position input{background-image:url('/static/images/home/icon-location.png');}
        &.visatype span{background-image:url('/static/images/home/icon-tag.png');}
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
      text-align: center;
      a{
        margin:0 1rem;        
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
      width: 100%;height: 100%;display: block;
    }
    .check{
      left: 0;
      span{
        font-size: 0.6rem;color: #fff;
        display:block;height: 1.4rem;width: 5.5rem;
        border:1px solid #fff;
        line-height:1.4rem;margin: 0 auto;
        text-align: center;    margin-top: 2.2rem;
      }
    }
    .customized{
      right: 0;
      span{
        font-size: 0.6rem;color: #fff;
        display:block;height: 1.4rem;width: 5.5rem;
        border:1px solid #fff;
        line-height:1.4rem;margin: 0 auto;
        text-align: center;    margin-top: 2.2rem;
      }
    }
  }

</style>
