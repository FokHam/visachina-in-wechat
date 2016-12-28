<template>
<div class="wifi-order" id="wifi-order">
  <div class="top-part">
    

  </div>
  <calendar
    v-if="pickingDate"
    v-on:confirm="setDate"
    type1="取件"
    type2="还件"
    :multipleDate="multipleDate"
    :pickType ="pickingType"
    :minDay="minDay"
    :maxDay="maxDay"
    :day1="startDate"
    :day2="endDate">
  </calendar>
</div>
</template>

<script>
import Calendar from "../../components/Calendar.vue";
import { Indicator } from 'mint-ui'
export default {
  name:"wifi-order",
  beforeCreate(){
    document.title = '填写订单'
    Indicator.open('加载中...')
  },
  created: function () {
    Indicator.close()
    
  },
  components: {
    Calendar
  },
  data:function(){
    var sTime = new Date(),eTime = new Date(sTime.getTime() + 24*60*60*1000*2)
    return{
      minDay:3,
      maxDay:99,
      singleTime: 0,
      startDate: new Date(sTime.getFullYear(),sTime.getMonth(),sTime.getDate()),
      endDate: new Date(eTime.getFullYear(),eTime.getMonth(),eTime.getDate()),
      multipleDate: true,
      pickingType: 1,
      pickingDate: false
      
    }
  },
  methods:{
    setDate:function(s,e){
      this.pickingDate = false
      this.startDate = s
      this.endDate = e
    }
  }
}

</script>

<style lang="less" scoped>
.wifi-counter{
  
}
</style>
