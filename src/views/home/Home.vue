<template>
  <div id="home" class="home">
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
              <div class="txt"><input readonly="readonly" type="text" placeholder="你想去哪里？"></div>
            </div>
            <div class="ipt position">
              <div class="tit">常住地</div>
              <div class="txt"><input readonly="readonly" type="text" placeholder="你居住在哪里？"></div>
            </div>
            <div class="ipt visatype">
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
            <div class="ipt calendar">
              <div class="tit">入住日期</div>
              <div class="txt"><input readonly="readonly" type="text" placeholder="你想哪一天入住？"></div>
            </div>
            <div class="ipt calendar">
              <div class="tit">离店日期</div>
              <div class="txt"><input readonly="readonly" type="text" placeholder="你想哪一天离开？"></div>
            </div>
            <div class="s_btn">搜索</div>
          </div>
        </div>
      </div>
    </div>
    <div class="morelink">
      
    </div>
    



  </div>
</template>

<script>
import Banner from '../../components/Banner'
import { Indicator } from 'mint-ui'

export default {
  name:'home',
  beforeCreate(){
    document.title = "首页"
    Indicator.open('加载中...');
  },
  created:function() {
    Indicator.close();
  },
  data:function(){    
    return {
      isActive: 0
    }
  },
  methods:{
    searchTap:function(v){
      this.isActive = v
      

    }
  },  
  components: {
    Banner
  }  
}
</script>
<style lang="less" scoped>
  .search{
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
          width: 35px;
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
            height: 20px;
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
        &:last-child{border-bottom: none;}
      }
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

</style>
