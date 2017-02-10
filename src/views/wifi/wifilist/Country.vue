<template>
<div class="wifi-country">
  <div class="backshadow" v-show="isShow" @click="closePage"></div>
  <div class="list-bd" :class="{active:isShow}">
    <div class="inner">
      <div class="continent">
        <ul>
          <li v-for="(item,index) in countryData" :class="{on:continent == index}" @click="continent=index">{{item.name}}</li>
        </ul>
      </div>
      <div class="country_list">
        <div class="item_list" v-for="(item,index) in countryData" v-show="continent == index">
          <ul>
            <li v-for="(country,index) in item.list" :class="{on:csCuntry == country.name}" @click="choseCountry(country.name,country.id)">{{country.name}}</li>
          </ul>
        </div>        
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {  
  props:['isShow','cname'],
  created: function () {
    this.getCountryList()
  },
  data:function(){
    return{
      keyword:'',
      continent:0,
      csCuntry:'',
      countryData:''
      

    }
  },
  methods:{
    getCountryList:function(){
      var url = '/api/wifi/areas'
      this.$http.get(url).then(function(result){
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.countryData = rst.data
        }else {
          console.log(rst.msg)
        }
      }, function(result){
        console.log("请求失败")
      });
    },
    closePage:function(){
      this.$emit('closePage')
    },
    choseCountry:function(name,id){
      this.csCuntry = name
      this.$emit('choseCountry',name,id)
    }
  }
}
</script>

<style lang="less" scoped>
.wifi-country{
  
  .backshadow{
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;height: 100%;width: 100%;top: 0;
  }
  .list-bd{
    position: fixed;bottom: -280px;left: 0;
    width: 100%;height: 280px;
    background-color: #fff;
    transition: ease-in-out .3s;
    &.active{bottom: 0;}
    .inner{position: relative;width: 100%;height: 280px;}
    .continent{
      position: absolute;left: 0;top: 0;
      background-color: #f6f6f6;
      width: 110px;height: 100%;
      li{
        height: 40px;line-height: 40px;font-size: 0.7rem;
        text-indent: 10px;
        &.on{
          background-color: #fff;
          background-image: url('/static/images/wifi/icon-pot.png');
          background-position: right center;
          background-size: 16px;
          background-repeat: no-repeat;
        }
      }

    }
    .country_list{
      padding-left: 110px;height: 280px;overflow-y: scroll;padding-right: 7px;
      .item_list{
        li{
          line-height: 38px;font-size: 12px;text-indent: 20px;
          border-bottom: 1px solid #f4f4f4;
          background-image: url('/static/images/wifi/icon-unchoose.png');
          background-position: right center;
          background-size: 20px;
          background-repeat: no-repeat;
          &.on{background-image: url('/static/images/wifi/icon-choose.png');}
        }
      }
    }
  }
}
</style>