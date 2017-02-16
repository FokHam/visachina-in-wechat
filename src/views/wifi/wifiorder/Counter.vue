<template>
<div class="counter-com">
  <div class="city-list">
    <div class="backshadow" v-show="cityListDis" @click="cityListDis=false"></div>
    <div class="cityname" :class="{on:cityListDis}" @click="cityListDis=true">{{currentCity}}</div>
    <div class="list" :class="{on:cityListDis}" :style="{height:listheight+'px'}">
      <ul>
        <li v-for="item in cityList" @click="cityCheck(item.city_name,item.id)">{{item.city_name}}</li>
      </ul>
    </div>
  </div>
  <div class="counter-list">
    <div class="item" v-for="(item,index) in listData" :class="{selected:chooseitem==index}" @click="chooseitem=index,chooseAdrs=item.name,chooseAdrsid=item.out_id">
      <p>【{{item.name}}】{{item.address}}</p>
      <p>营业时间：{{item.office_hours}}</p>
    </div>
  </div>
  <div class="confirmbtn" @click="comfirm">确定</div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default{
  props:['id'],
  created:function(){
    const _this = this;
    var state = {  
      title: document.title,
      url: document.location.href  
    };  
    window.history.pushState(state,document.title, document.location.href);
    window.addEventListener("popstate", function(e) {  
      _this.$emit('close');
    }, false);
    this.getCitylist()       
  },
  data:function(){
    return{
      wifiCondition:this.wifiCondition, 
      currentCity:'',
      currentCityid:'',
      cityListDis:false,
      listheight:0,
      chooseitem:-1,
      chooseAdrs:'',
      chooseAdrsid:'',
      listData:[],
      cityList:[]

    }
  },
  methods:{
    comfirm:function(){
      if (this.chooseitem == -1 && this.chooseAdrs=="") {
        Toast('请选择一个服务点')
        return false
      }
      this.$emit('comfirm',this.chooseAdrs,this.chooseAdrsid)
    },
    cityCheck:function(n,id){
      this.currentCity = n
      this.currentCityid = id
      this.cityListDis = false
      this.getCounterList()
    },
    getCitylist:function(){
      var url = '/api/wifi/places_cities'
      this.$http.get(url).then(function(result){
        var rst = JSON.parse(result.body)
        console.log(result.body)
        if (rst.status == 1) { 
          this.cityList = rst.data
          if (this.wifiCondition.city == '') {
            this.currentCity = this.cityList[0].city_name
            this.currentCityid = this.cityList[0].id
            this.getCounterList()
          }else{
            this.currentCity = this.wifiCondition.cityname
            this.currentCityid = this.wifiCondition.city
            this.getCounterList()
          }          
        }else {
          console.log(rst.msg)
        }
      }, function(result){
        console.log("请求失败")
      });
    },
    getCounterList:function(){
      var url = '/api/wifi/places',send = {cid:this.currentCityid,act:1}
      this.$http.get(url,{params:send}).then(function(result){
        console.log(result.body)
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.listData = rst.data
        }else {
          console.log(rst.msg)
        }
      });
    }
  },
  watch:{
    cityListDis:function(status){
      if (status == true) {
        this.listheight = document.documentElement.clientHeight-48
      }else {
        this.listheight = 0
      }

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
        height: 100%;overflow-y:scroll;
    overflow-scrolling: touch;-webkit-overflow-scrolling: touch;padding: 0 30px;width: 60px;
        li {
          line-height: 37px;
          border-bottom: 1px solid #EEEEEE;
        }
      }
    }

  }

}
</style>