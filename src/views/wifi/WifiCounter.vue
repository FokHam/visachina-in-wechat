<template>
<div class="wifi-counter" id="wifi-counter">
  <div class="item">
    <div class="name">【北京T1出发】</div>
    <div class="address">首都机场1号航站楼国际出发中央商业区（过安检后喷泉 左侧 紧邻烟酒免税店）出国通讯服务柜台</div>
    <div class="tel">联系电话:（+86）4006－5050－11</div>
    <div class="time">营业时间: 24小时</div>
  </div>
  <div class="item">
    <div class="name">【北京T2出发】</div>
    <div class="address">首都机场2号航站楼国际出发中央商业区（过安检后喷泉 左侧 紧邻烟酒免税店）出国通讯服务柜台</div>
    <div class="tel">联系电话:（+86）4006－5050－11</div>
    <div class="time">营业时间: 24小时</div>
  </div>
  <div class="item">
    <div class="name">【北京T3出发】</div>
    <div class="address">首都机场3号航站楼国际出发中央商业区（过安检后喷泉 左侧 紧邻烟酒免税店）出国通讯服务柜台</div>
    <div class="tel">联系电话:（+86）4006－5050－11</div>
    <div class="time">营业时间: 24小时</div>
  </div>

</div>
</template>

<script>
export default {
  name:"wifi-detail",
  beforeCreate(){
    document.title = '取货网点'
    
  },
  created: function () {   
    
  },
  components: {
    
  },
  data:function(){
    return{
      
      
    }
  },
  methods:{
    
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
}
</style>
