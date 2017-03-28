<template>
<div class="progress-detail" id="progress-detail">
  <div class="page" v-if="progressData != ''">
    <div class="topinfo">
      <div class="proname">{{progressData.product_name}}</div>
      <div class="name">申请人：{{progressData.guestname}}</div>
    </div>
    <div class="list" v-if="progressLog.length > 0">
      <ul>
        <li v-for="item in progressLog">
          <div class="time">{{item.cdate}}</div>
          <div class="content">{{item.memo}}</div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default{
  name: 'progress-detail',
  created: function () {
    document.title = '签证进度'
    this.getData()
  },
  data:function(){
    return{
      progressData:'',
      progressLog:''
    }
  },
  methods:{
    getData () {
      Indicator.open('加载中');
      let url = '/api/visa/progress',send = {id:this.$route.params.id};
      this.$http.get(url,{params:send}).then(function(result){
        Indicator.close();
        let rst = JSON.parse(result.body);
        if (rst.status == 1) {
          this.progressData = rst.data;
          let logData = [];
          if (rst.data.op_log.length > 0) {
            for (var i = 0; i < rst.data.op_log.length; i++) {
              let o_date = rst.data.op_log[i].cdate.replace(/-/g,'/');
              let dateNum = new Date(o_date)
              rst.data.op_log[i].zindex = dateNum.getTime()
              logData.push(rst.data.op_log[i])
            }
          }
          if (rst.data.refund != false) {
            if (rst.data.refund.refund_log.length > 0) {
              for (var i = 0; i < rst.data.refund.refund_log.length; i++) {
                let o_date = rst.data.refund.refund_log[i].cdate.replace(/-/g,'/');
                let dateNum = new Date(o_date);
                rst.data.refund.refund_log[i].zindex = dateNum.getTime();
                logData.push(rst.data.refund.refund_log[i]);
              }
            }
          }          
          this.popCount(logData)
        }else{
          console.log(rst.msg)
        }
      });
    },
    popCount (array) {
      var len = array.length, i, j, tmp, result;  
      result = array.slice(0);  
      for (i = 0; i < len; i++) {  
        for (j = len - 1; j > i; j--) {  
          if (result[j].zindex > result[j - 1].zindex) {  
            tmp = result[j - 1];  
            result[j - 1] = result[j];  
            result[j] = tmp;  
          }  
        }  
      }
      this.progressLog = result;
    }
  }
}
</script>

<style lang="less" scoped>
.progress-detail{
  .topinfo{
    padding:1rem 0.8rem;
    background-color: #fff;
    margin-bottom: 0.5rem;
    .proname{
      font-size: 0.9rem;
      color: #333;
      margin-bottom: 0.5rem;
    }
    .name{
      font-size: 0.8rem;
      color: #666;
    }
  }
  .list{
    li{
      padding:1rem 0.8rem;
      background-color: #fff;
      margin-bottom: 0.1rem;
      .time{
        font-size: 0.8rem;
        color: #999;
      }
      .content{
        font-size: 0.7rem;
        color: #666;
      }
    }
  }
}
</style>
