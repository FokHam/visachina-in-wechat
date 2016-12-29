<template>
<div class="counter-com">
  <div class="city-list">
    <div class="backshadow" v-show="cityListDis" @click="cityListDis=false"></div>
    <div class="cityname" :class="{on:cityListDis}" @click="cityListDis=true">{{currentCity}}</div>
    <div class="list" :class="{on:cityListDis}" :style="{height:listheight+'px'}">
      <ul>
        <li v-for="item in cityList" @click="cityCheck(item.name)">{{item.name}}</li>
      </ul>
    </div>
  </div>
  <div class="counter-list">
    <div class="item" v-for="(item,index) in listData" :class="{selected:chooseitem==index}" @click="chooseitem=index,chooseAdrs=item.address">
      <p>{{item.address}}</p>
      <p>{{item.time}}</p>
    </div>
  </div>
  <div class="confirmbtn" @click="comfirm">确定</div>


</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default{
  props:['id'],
  data:function(){
    return{
      currentCity:'北京',
      cityListDis:false,
      listheight:0,
      chooseitem:-1,
      chooseAdrs:'',
      listData:[{"time":"周一至周日:08:00-23:00","address":"【白云机场T1】首都机场3号航站楼国际出发中央商业区(过安检后喷泉左侧 紧邻烟酒免税店)出国通讯服务柜台。"},{"time":"周一至周日:08:00-23:00","address":"【白云机场T2】首都机场3号航站楼国际出发中央商业区(过安检后喷泉左侧 紧邻烟酒免税店)出国通讯服务柜台。"},{"time":"周一至周日:08:00-23:00","address":"【白云机场T3】首都机场3号航站楼国际出发中央商业区(过安检后喷泉左侧 紧邻烟酒免税店)出国通讯服务柜台。"}],
      cityList:[{"name":"北京"},{"name":"天津"},{"name":"河北"},{"name":"山西"},{"name":"内蒙古"},{"name":"辽宁"},{"name":"吉林"},{"name":"黑龙江"},{"name":"上海"},{"name":"江苏"},{"name":"浙江"},{"name":"安徽"},{"name":"福建"},{"name":"江西"},{"name":"山东"},{"name":"河南"},{"name":"湖北"},{"name":"湖南"},{"name":"广东"},{"name":"宁夏"},{"name":"新疆"},{"name":"香港"},{"name":"澳门"}]

    }
  },
  methods:{
    comfirm:function(){
      if (this.chooseitem == -1 && this.chooseAdrs=="") {
        Toast('请选择一个服务点')
        return false
      }
      this.$emit('comfirm',this.chooseAdrs)
    },
    cityCheck:function(n){
      this.currentCity = n
      this.cityListDis = false
    }
  },
  watch:{
    cityListDis:function(status){
      if (status == true) {
        this.listheight = window.screen.height-48
      }else {
        this.listheight = 0
      }

    }
  }
}
</script>

<style lang="less" scoped>
.counter-com{
  position: fixed;height: 100%;width: 100%;
  top: 0;background-color: #ececec;
  .counter-list{
    .item{
      background-color: #fff;padding: 15px 15px 10px 45px;
      margin-bottom: 10px;background-image: url('/static/images/wifi/icon-uncheck.png');
      background-size: 22px;background-repeat: no-repeat;background-position:15px 19px;
      p{margin-bottom: 5px;line-height: 20px;font-size: 0.6rem;}
      &.selected{background-image: url('/static/images/wifi/icon-check.png')}
    }
  }
  .confirmbtn{
    line-height: 40px;text-align: center;
    color: #fff;font-size: 0.8rem;margin: 25px 16px;
    background-color: #008be4;border-radius: 5px;

  }
  .city-list{
    .backshadow{position: fixed;height: 100%;width: 100%;top: 0;left: 0;background-color: rgba(0, 0, 0, 0.5);}
    .cityname {
      transition: ease-in-out 0.2s;
      margin: 15px 0;height: 33px;width: 70px;line-height: 33px;font-size: 0.7rem;
      color: #fff;background: #008BE4;text-indent: 10px;border-radius: 30px;padding-left:15px;
      margin-left: -15px;position: relative;z-index: 99;
      &.on{padding-right: 50px;}
    }
    .list {
      transition: ease-in-out 0.4s;
      position: fixed;z-index: 50;background: #F6F6F6;
      text-align: center;font-size: 0.7rem;color: #666666;
      padding-top: 15px;top: 33px;left: -120px;overflow: hidden;
      &.on{left: 0;}
      ul{
        height: 100%;overflow-y: scroll;padding: 0 30px;width: 60px;
        li {
          line-height: 37px;
          border-bottom: 1px solid #EEEEEE;
        }
      }
    }

  }

}
</style>