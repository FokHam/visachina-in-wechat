<template>
<div class="provice-page" v-if="isShow">
  <div class="provice-list">
    <div class="tit">常住地选择</div>
    <div class="nowlocation"><span @click="chosepvc(citydata.nowlocation)">{{citydata.nowlocation}}</span><i>更新定位</i></div>
    <div class="pvc_list">
      <ul>
        <li v-for="item in citydata.provicelist" @click="chosepvc(item.name)">{{item.name}}</li>
      </ul>
    </div>
  </div>
  <div class="backshadow" @click="closePage"></div>
</div>
</template>

<script>
  export default{
    props:['isShow'],
    data:function(){
      return{
        citydata:{"nowlocation":"广东省","provicelist":[{"name":"安徽省", "code":"340000"},{"name":"北京市", "code":"110000"},{"name":"福建省", "code":"350000"},{"name":"甘肃省", "code":"620000"},{"name":"广东省", "code":"440000"},{"name":"广西壮族自治区", "code":"450000"},{"name":"贵州省", "code":"520000"},{"name":"海南省", "code":"460000"},{"name":"河北省", "code":"130000"},{"name":"河南省", "code":"410000"},{"name":"黑龙江省", "code":"230000"},{"name":"湖北省", "code":"420000"},{"name":"湖南省", "code":"430000"},{"name":"吉林省", "code":"220000"},{"name":"江苏省", "code":"320000"},{"name":"江西省", "code":"360000"},{"name":"辽宁省", "code":"210000"},{"name":"内蒙古自治区", "code":"150000"},{"name":"宁夏回族自治区", "code":"640000"},{"name":"青海省", "code":"630000"},{"name":"山东省", "code":"370000"},{"name":"山西省", "code":"140000"},{"name":"陕西省", "code":"610000"},{"name":"上海市", "code":"310000"},{"name":"四川省", "code":"510000"},{"name":"天津市", "code":"120000"},{"name":"西藏自治区", "code":"540000"},{"name":"新疆维吾尔自治区", "code":"650000"},{"name":"云南省", "code":"530000"},{"name":"浙江省", "code":"330000"},{"name":"重庆市", "code":"500000"}]}
      }
    },
    methods:{
      chosepvc:function(name){
        this.$emit('chosepvc',name)
      },
      closePage:function(){
        this.$emit('closePage')
      }
    }
  }
</script>

<style lang="less" scoped>
  .provice-page{position: fixed;height: 100%;width: 100%;z-index: 9999;top: 0;}
  .backshadow{
    position:absolute;height: 100%;width: 100%;
    top: 0;left: 0;background: rgba(0, 0, 0, 0.5);
  }
  .provice-list{
    overflow-y:scroll;
    overflow-scrolling: touch;-webkit-overflow-scrolling: touch;
    background: #fff;
    position: absolute;
    width: 180px;height:100%;top:0;right: 0;
    padding-left: 10px;
    z-index: 99;
    .tit{
      font-size: 0.8rem;text-indent: 20px;line-height: 35px;padding-top: 5px;border-bottom: 1px solid #f5f5f5;
    }
    .nowlocation{
      border-bottom: 1px solid #f5f5f5;
      padding: 5px 0 5px 20px;
      margin-bottom: 15px;    
      span{
        font-size: 0.6rem;line-height: 25px;
        background-color: #eeeeee;
        display: inline-block;
        background-image: url('/static/images/visa/icon-location-black.png');
        background-position: 5px center;
        background-size: 12px;
        background-repeat: no-repeat;
        padding: 0px 8px 0 22px;
        border-radius: 5px;
      }
      i{
        font-size: 0.6rem;line-height: 25px;
        display: inline-block;
        background-image: url('/static/images/visa/icon-fresh.png');
        background-position: 5px center;
        background-size: 12px;color: #999999;font-style: normal;
        background-repeat: no-repeat;
        padding-left:18px;margin-left: 5px;
      }
    }
    .pvc_list{
      li{
        line-height: 25px;border-bottom: 1px solid #f5f5f5;
        text-indent: 20px;margin-bottom: 5px;font-size: 0.6rem;
      }
    }
  }
</style>