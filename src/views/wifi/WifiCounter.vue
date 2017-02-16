<template>
<div class="wifi-counter" id="wifi-counter">
  <div class="city-list" v-if="this.wifiCondition.city == ''">
    <div class="backshadow" v-show="cityListDis" @click="cityListDis=false"></div>
    <div class="cityname" :class="{on:cityListDis}" @click="cityListDis=true">{{currentCity}}</div>
    <div class="list" :class="{on:cityListDis}" :style="{height:listheight+'px'}">
      <ul>
        <li v-for="item in cityList" @click="cityCheck(item.city_name,item.id)">{{item.city_name}}</li>
      </ul>
    </div>
  </div>
  <div class="item" v-for="item in listData">
    <div class="name">【{{item.name}}】</div>
    <div class="address">{{item.address}}</div>
    <div class="tel">联系电话:</div>
    <div class="time">营业时间: {{item.office_hours}}</div>
  </div>
  

</div>
</template>

<script>
export default {
  name:"wifi-detail",
  created: function () {   
    document.title = '取货网点'
    if (this.wifiCondition.city == '') {
      this.getCitylist()
    }else{
      this.currentCity = this.wifiCondition.cityname
      this.currentCityid = this.wifiCondition.city
      this.getCounterList()
    }    
  },
  data:function(){
    return{
      wifiCondition:this.wifiCondition,      
      cityListDis:false,
      listheight:0,      
      cityList:[],
      listData:[],
      currentCity:'',
      currentCityid:'',
      
    }
  },
  methods:{
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
          this.currentCity = this.cityList[0].city_name
          this.currentCityid = this.cityList[0].id
          this.getCounterList()
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
.wifi-counter{
  .item{
    padding: 15px 10px;background-color: #fff;margin-bottom: 10px;
    .name{font-size: 0.7rem;margin-bottom: 5px;font-weight: bold;}
    .address{font-size: 0.6rem;margin-bottom: 5px;line-height: 20px;}
    .tel,.time{font-size: 0.6rem;line-height: 20px;font-weight: bold;}
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
