<template>
  <div id="visa" class="visa" @touchmove="pagescroll">
    <div class="visaPage" v-show="searchdis == false">
      <div class="part-top">
        <img src="/static/images/visa/banner.png">
        <div class="flag">
          <div class="inner">
            <img :src="'http://www.visachina.cn/resources/img/countrys/'+visaCondition.ct+'.png'">
          </div>
        </div>
        <div class="location">
          <span class="c_name">{{visaCondition.ctname}}</span>
          <span class="m_name" @click="provicedis=true,tabcount=0">{{visaCondition.dqname}}</span>
        </div>
        <div class="search_btn" @click="searchdis=true,tabcount=0"><span>搜索国家</span></div>
      </div>
      <div class="screening" :class="{pin:screenposition}">
        <div class="tabs">
          <span :class="{on:tabcount == 1}" @click="tapDrop(1)">签证类别</span>
          <span :class="{on:tabcount == 2}" @click="tapDrop(2)">入境期限</span>
          <span :class="{on:tabcount == 3}" @click="tapDrop(3)">加急</span>
          <div class="openscren" @click="screendis=true,tabcount=0">筛选</div>
        </div>
        <div class="tabselecter" v-show="tabcount != 0">
          <div class="options" :class="{on1:tabcount == 1}">
            <ul>
              <li v-for="(item,index) in screenStr.type" :class="{on:index==visaCondition.lx}" @click="visaCondition.lx=index">{{item}}</li>
            </ul>
          </div>
          <div class="options" :class="{on2:tabcount == 2}">
            <ul>
              <li v-for="item in screenStr.rj" :class="{on:item.data==visaCondition.rj}" @click="visaCondition.rj=item.data">{{item.text}}</li>
            </ul>
          </div>
          <div class="options" :class="{on3:tabcount == 3}">
            <ul>
              <li v-for="item in screenStr.fw" :class="{on:item.data==visaCondition.fw}" @click="visaCondition.fw=item.data">{{item.text}}</li>
            </ul>
          </div>
        </div>
        <div class="shadow" v-show="tabcount != 0" @click="tabcount=0"></div>
      </div>
      <div class="visalist" id="prolist">
        <ul v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="40">
          <li v-for="item in listdata"><router-link :to="'/visaDetail/'+item.id">
            <div class="visapic">
              <img :src="'/static/images/visa/type'+item.visatype+'.png'" onerror="javascript:this.src='/static/images/visa/defaultpic.png';">
            </div>
            <div class="visainfo">
              <div class="tit">{{item.name}}</div>
              <div class="type">
                <span class="p" v-show="item.visatype == 0">贴纸签</span>
                <span class="e" v-show="item.visatype == 1">电子签</span>
                <span class="op" v-show="item.visatype == 2">另纸签</span>
              </div>
              <div class="day-price">
                <span class="day">受理天数：{{item.acceptancedays}}天</span>
                <span class="price"><i>￥</i>{{item.lower_price}}</span>
              </div>
            </div>
          </router-link></li>
        </ul>
        <p class="page-infinite-loading">{{loadingtxt}}</p>      
      </div>
    </div>
    <countrys
    v-if="searchdis"
    @choseCountry="changeCountry"
    @closePage="closeComp">
    </countrys>
    <provice
    v-if="provicedis"
    @closePage="closeComp"
    @chosepvc="choseProvice">
    </provice>
    <screen
    v-if="screendis"
    :condition="visaCondition"
    :typeStr="screenStr"
    @closePage="closeComp"
    @chosescr="screenConfirm">
    </screen>

  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'
import { Spinner } from 'mint-ui'
import Screen from './visaindex/Screening'
import Countrys from '../../components/SearchCountry'
import Provice from '../../components/ProviceList'

export default {
  name:"visa",
  beforeCreate(){
    document.title = "签证列表"
  },
  created: function () {
    Indicator.close();
    if (this.visaCondition.ct=='') {
      this.$router.push('/home')
    }else{
      this.getListData()
    }
  },
  components: {
    Countrys,
    Provice,
    Screen
  },
  data:function(){
    return{
      visaCondition:this.visaCondition,
      screenStr:{
        "type":["全部","旅游签证","商务签证","探亲访友签证","工作签证","留学签证","其他签证"],
        "rj":[{"text":"全部","data":0},{"text":"单次入境","data":"单"},{"text":"多次入境","data":"多"},{"text":"领馆定","data":"领馆定"}],
        "fw":[{"text":"全部","data":0},{"text":"加急","data":2}]
      },
      searchdis:false,
      provicedis:false,
      screendis:false,
      tabcount:0,
      screenposition:false,
      loadingtxt:"加载列表中...",
      listdata:[]
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
    changeCountry:function(name,id){
      this.closeComp()
      this.visaCondition.ctname = name
      this.visaCondition.ct = id
    },
    choseProvice:function(name,id){
      this.closeComp()
      this.visaCondition.dqname = name
      this.visaCondition.dq = id
    },
    screenConfirm:function(obj){
      this.visaCondition = obj
    },
    closeComp:function(){
      this.provicedis = false
      this.searchdis = false
      this.screendis = false
    },
    loadMore:function(){
      if (this.listdata.length != 0) {
        this.getListData()
      }
    },
    getListData:function(t){
      if (this.searchdis==true) {
        return false
      }
      Indicator.open('加载中...');
      if (t=="reload") {
        this.listdata = []
      }
      var url = '/api/visa/index',send=this.visaCondition
      this.$http.get(url,{params:send}).then(function(result){
        console.log(result)
        Indicator.close()
        var rst = JSON.parse(result.body)

        if (rst.status == 1) {
          if (rst.data.list.length > 0) {
            for (var i=0; i<rst.data.list.length; i++) {
              this.listdata.push(rst.data.list[i])
            }
            //this.visaCondition.page += 1
            this.loadingtxt = '加载列表中...'
          }else {
            console.log('没有更多数据')
            this.loadingtxt = '没有更多内容了哦~'
          }
        }else {
          console.log(rst.msg)
        }
      });
    },
    pagescroll:function(){
      var obj = document.getElementById('prolist');
      var t_height = obj.offsetTop;
      var scroll_height = document.body.scrollTop;
      var num = t_height-scroll_height;
      if (num < 40) {
        this.screenposition = true
      }else{
        this.screenposition = false
      }
    }
  },
  computed: {
    visaCondition () {
      return this.$store.state.visa.visaCondition;
    }
  },
  watch:{
    visaCondition:{
      handler: function (obj) {
        this.getListData('reload')
      },
      deep: true
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
    .inner{
      height: 60px;width: 60px;border-radius: 60px;overflow: hidden;
    }
    img{
      height: 75px;
      border-radius: 60px;
      margin-left: -6px;
      margin-top: -3px;
      width: 113px;
    }
  }
  .location{
    position: absolute;
    left: 50%;margin-left: -30px;
    top: 50%;
    .c_name{color: #fff;font-size: 0.8rem;display: inline-block;width: 70px;text-align: center;}
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
  &.pin{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
  }
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
        &.on{color: #D44D00;}
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
.visalist{
    ul{
      li{
        position: relative;
        padding:10px;
        background-color: #fff;
        margin-bottom: 10px;
        .visapic{
          width: 4rem;
          position: absolute;
          left: 10px;top: 10px;
        }
        .visainfo{
          padding-left: 4.5rem;
          .tit{
            font-size: 0.7rem;
            text-align: justify;
          }
          .type{
            padding: 5px 0 15px;
            span{
              font-size: 0.6rem;
              border: 1px solid;
              padding:1px 5px;
              border-radius: 2px;
              &.p{color: #008BE4;border-color: #008BE4;}
              &.e{color: #D44D00;border-color: #D44D00;}
              &.op{color: #8e00d5;border-color: #8e00d5;}
            }
          }
          .day-price{
            overflow: hidden;
            .day{font-size: 0.6rem;color: #333333;float: left;}
            .price{
              float: right;
              font-size: 0.8rem;color: #F55600;
              i{font-size: 0.6rem;font-style: normal;}
            }
          }
        }
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
    .empty{
      line-height: 100px;
      text-align: center;
      font-size: 0.8rem;
      color: #ccc;
    }
    .page-infinite-loading {
        line-height: 40px;
        text-align: center;
        font-size: 0.7rem;
    }
  }
</style>
