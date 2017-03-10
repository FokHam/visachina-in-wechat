<template>
<div class="progress-detail" id="progress-detail">
  <div class="page" v-if="progressData != ''">
    <div class="topinfo">
      <div class="proname">{{progressData.product_name}}</div>
      <div class="name">申请人：{{progressData.guestname}}</div>
    </div>
    <div class="list" v-if="progressData.refund != false">
      <ul>
        <li v-for="item in progressData.refund.refund_log">
          <div class="time">{{item.cdate}}</div>
          <div class="content">{{item.memo}}</div>
        </li>
      </ul>
    </div>
    <div class="list" v-if="progressData.op_log.length > 0">
      <ul>
        <li v-for="item in progressData.op_log">
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
      progressData:''
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
          this.progressData = rst.data
        }else{
          console.log(rst.msg)
        }
      });
    },

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
