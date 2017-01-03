<template>
<div class="common-infomation" id="common-infomation">
  <div class="tabs">
    <ul>
      <li><span :class="{on:tabcount==0}" @click="tabcount=0">旅客</span></li>
      <li><span :class="{on:tabcount==1}" @click="tabcount=1">地址</span></li>
      <li><span :class="{on:tabcount==2}" @click="tabcount=2">联系人</span></li>
      <li><span :class="{on:tabcount==3}" @click="tabcount=3">报销凭证</span></li>
    </ul>
  </div>
  <div class="lists">
    


  </div>


  
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default{
  name:'common-infomation',
  beforeCreate(){
    document.title = '常用信息'
    Indicator.open('加载中...')
  },
  created: function () {
    Indicator.close()    
  },
  components: {
    
  },
  data:function () {
    return{
      tabcount:0
      
    }
  },
  methods:{
    
  }

}
</script>

<style lang="less" scoped>
.common-infomation{
  .tabs{
    overflow: hidden;
    li{
      width: 25%;float: left;text-align: left;
      &:last-child{text-align: right;}
      span{
        display: inline-block;line-height: 40px;height: 38px;
        text-align: center;font-size: 0.7rem;padding: 0 15px;
        border-bottom: 2px solid #f6f6f6;color: #999999;
        &.on{color: #008be4;border-bottom: 2px solid #008be4;}
      }
    }
  }




}
</style>