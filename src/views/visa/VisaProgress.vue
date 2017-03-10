<template>
<div class="progress-detail" id="progress-detail">
  <div class="itemslist" v-if="orderList.length > 0">
    <div class="item" v-for="item in orderList">
      <div class="tit">{{item.product_name}}</div>
      <div class="list">
        <ul>
          <li v-for="list in item.guest" @click="gotoDetail(list.id)">
            <div class="top">
              <span class="name">{{list.value}}</span>
              <span class="date" v-if="list.refund == false">{{list.cdate}}</span>
              <span class="date" v-else>{{list.refund.mdate}}</span>
            </div>
            <div class="bottom">
              <span class="status" v-if="list.refund == false">{{list.guestStatusName}}</span>
              <span class="status" v-else>{{refundType[list.refund.status]}}</span>
            </div>
          </li>          
        </ul>
      </div>
    </div>
  </div>
  <div class="empty" v-else>您当前无代办理的签证</div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default{
  name: 'progress-detail',
  created: function () {
    document.title = '签证进度'
    this.getData();
  },
  data:function(){
    return{
      orderList:'',
      refundType:{
        '0':'申请退款',
        '1':'待确认退款金额',
        '2':'等待商家确认退还资料',
        '3':'资料已退还，待确认',
        '4':'退款完成'
      }
    }
  },
  methods:{
    getData () {
      Indicator.open('加载中');
      let url = '/api/visa/progress_list';
      this.$http.get(url).then(function(result){
        Indicator.close();
        let rst = JSON.parse(result.body);
        if (rst.status == 1) {
          this.orderList = rst.data
        }else{
          console.log(rst.msg)
        }
      });
    },
    gotoDetail (id) {
      this.$router.push('/progressDetail/'+id);
    }

  }
}
</script>

<style lang="less" scoped>
.progress-detail{
  .item{
    margin:0 0.3rem 0.2rem 0.3rem;
    background-color: #fff;
    .tit{
      line-height: 1.4rem;
      border:1px solid #999;
      color: #999999;
      display: inline-block;
      font-size: 0.7rem;
      padding: 0 0.5rem;
      margin: 0.8rem 0.8rem 0.5rem;
    }
    .list{
      li{        
        span{
          display: inline-block;float: left;
          line-height: 1rem;
        }
        .top{
          overflow:hidden;
          margin-bottom: 0.3rem;
          .name{
            padding-left: 0.65rem;
            border-left: 0.15rem solid #008be4;
            margin-right: 0.8rem;
          }
        }
        .bottom{
          overflow:hidden;
          padding-left: 0.8rem;
          padding-bottom: 0.8rem;
          .status{
            padding-right: 0.8rem;color: #666;
          }
          .txt{
            padding-left: 0.8rem;
            border-left: 1px solid #eee;color: #666;
          }
        }
      }
    }
  }
  .empty{
    position: absolute;
    top: 50%;
    margin-top: -6rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.9rem;
    color: #bfbfbf;
    text-align: center;
    padding-top: 9rem;
    background-image: url('/static/images/visa/icon-empty.png');
    background-size:auto 8rem;
    background-repeat: no-repeat;
    background-position: center top;
  }
}
</style>
