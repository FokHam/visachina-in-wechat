<template>
<div class="insurance-policy" id="insurance-policy">
  <div class="list" v-if="insuranceList != ''">
    <ul>
      <li v-for="item in insuranceList">
        <div class="top">
          <div class="name">{{item.productName}}</div>
          <div class="info">
            <span>{{item.dateRange}}</span>{{item.quantity}}
          </div>
        </div>
        <div class="bottom">
          <div class="num">保单号<span>{{item.insureNum}}</span></div>
          <div class="sendbtn" @click="sendPolicy(item.insureNum)">发送保单</div>
        </div>
      </li>      
    </ul>
  </div>
  <div class="empty" v-else>
    暂无在保中的保单
  </div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'
export default{
  name:'insurance-policy',
  created: function () {
    document.title = '我的保单'
    this.getData()
  },
  data:function(){
    return{
      insuranceList:''
    }
  },
  methods:{
    getData:function(){
      Indicator.open('获取保单列表');
      var url = '/api/orders/insurance'
      this.$http.get(url).then(function(result){
        Indicator.close();
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.insuranceList = rst.data.rows
        }else {
          console.log(rst.msg)
        }
      });
    },
    sendPolicy:function(num){
      MessageBox.prompt('请输入邮箱地址','').then(({ value, action }) => {
        Indicator.open('正在发送邮件');
        var url = '/api/insurance/send_insurepdf',send = {num:num,email:value};
        this.$http.get(url,{params:send}).then(function(result){
          Indicator.close();
          var rst = JSON.parse(result.body)
          if (rst.status == 1) {
            Toast('发送成功')
          }else {
            Toast('发送失败')
            this.sendPolicy(num)
          }
        });
      });
    }
  }
}
</script>

<style lang="less" scoped>
.insurance-policy{
  .list{
    ul{
      li{
        background: #fff;
        margin-bottom: 0.5rem;
        border-bottom: 1px solid #c0c0c0;
        background-image: url('/static/images/usercenter/icon-border.png');
        background-repeat: repeat-x;
        background-position: left top;
        background-size: 0.5rem;
        padding-top: 0.8rem;
        .top{
          padding:0.2rem 0.8rem 0.4rem 1.75rem;
          border-bottom: 1px dashed #efefef;
          background-image: url('/static/images/usercenter/icon-umbrella.png');
          background-repeat: no-repeat;
          background-size: 1.1rem;
          background-position: 0.4rem 0.3rem;
          .name{
            font-size: 0.7rem; 
            line-height: 1.5rem;
          }
          .info{
            color: #666;
            line-height: 1.5rem;
            font-size: 0.6rem;
            span{
              font-size: 0.7rem;
              padding-right: 0.5rem;
            }
          }
        }
        .bottom{
          padding:0.5rem 0.8rem 0.5rem 1.75rem;
          overflow:hidden;
          .num{
            float: left;
            line-height: 1.2rem;
            font-size: 0.7rem;
            span{
              padding-left: 0.4rem;
              font-size: 0.7rem;
              color: #008be4;
            }
          }
          .sendbtn{
            float: right;
            height: 1.1rem;
            line-height: 1.1rem;
            border:1px solid #008be4;
            color: #008be4;
            font-size: 0.6rem;
            border-radius: 0.15rem;
            padding: 0 0.5rem;
          }
        }
      }
    }
  }
  .empty{
    text-align: center;
    font-size: 0.7rem;
    color: #ccc;
    line-height: 10rem;
  }
}
</style>