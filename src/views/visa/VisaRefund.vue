<template>
  <div class="visa-refund" id="visa-refund">
    <div class="step">
      <ul>
        <li :class="{on:pageData == false}"><span>1</span><p>申请<br>退款</p></li>
        <li :class="{on:pageData.status == 0}"><span>2</span><p>商家处<br>理退款</p></li>
        <li :class="{on:pageData.status == 1 || pageData.status == 2}"><span>3</span><p>确认退<br>款事项</p></li>
        <li :class="{on:pageData.status == 3}"><span>4</span><p>退还<br>资料</p></li>
        <li :class="{on:pageData.status == 4}"><span>5</span><p>退款<br>完成</p></li>
      </ul>
      <div class="line"></div>
    </div>
    <div class="stepcontent">
      <div class="item" v-if="pageData == false">
        <div class="txt">如果您的行程有变或其他原因可以申请退款，商家将停止办理您的签证。</div>
        <div class="btns">
          <span class="confirm" @click="agreeRefund()">申请退款</span>
          <span class="contact" @click="callTel()">联系客服</span>
        </div>
      </div>
      <div class="item" v-if="pageData.status == 0">
        <div class="txt">您已提交了退款申请，等待商家处理。</div>
        <div class="btn">
          <span class="contact" @click="callTel()">联系客服</span>
        </div>
      </div>
      <div class="item" v-if="pageData.status == 1">
        <div class="txt">同意以下退款事项，请尽快确认。如异议请联系客服。系统将会7天后自动确认</div>
        <div class="btns">
          <span class="confirm" @click="agreeMoney()">同意退款事项</span>
          <span class="contact" @click="callTel()">联系客服</span>
          <span></span>
        </div>
      </div>
      <div class="item" v-if="pageData.status == 2">
        <div class="txt">如没有需要退还的原件，无需关注物流信息。</div>
        <div class="btn">
          <span class="contact" @click="callTel()">联系客服</span>
          <span></span>
        </div>
      </div>
      <div class="item" v-if="pageData.status == 3">
        <div class="txt">如收到退还的原件，请尽快确认。系统将会7天后自动确认退款完成。（如没有原件，无需关注物流信息）</div>
        <div class="btns">
          <span class="confirm" @click="confirmSuccess()">退款完成</span>
          <span class="contact" @click="callTel()">联系客服</span>
          <span></span>
        </div>
      </div>
      <div class="item" v-if="pageData.status == 4">
        <div class="txt">如收到退还的原件，请尽快确认。系统将会7天后自动确认退款完成。（如没有原件，无需关注物流信息）</div>
        <div class="btn">
          <span class="contact" @click="callTel()">联系客服</span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="stephistory">
      <ul>
        <li v-for="item in pageData.refund_log">
          <p>{{item.memo}}</p>
        </li>
        <!--<li v-if="refundstep >= 5">
          <p>商家于 2016/12/20 15:45:30 退还资料。</p>
          <div class="express">顺丰单号：2132131321</div>
        </li>
        <li v-if="refundstep >= 4">
          <p>您于 2016/12/20 15:45:30 同意了退款事项。</p>
        </li>
        <li v-if="refundstep >= 3">
          <div class="returninfo">
            <div class="price">
              <span>退款金额：<i>200元</i></span>
              <span>收取服务费：<i>30元</i></span>
            </div>
            <div class="momo">原因：收取打印服务费用</div>
          </div>
          <p>商家于2017-3-4 09:58:25 处理了您的退款</p>
        </li>
        <li v-if="refundstep >= 2">
          <p>您于2017-3-3 15:08:55 发起了退款申请</p>
        </li>-->

      </ul>
    </div>

  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  export default {
    created () {
      this.getData()
    },
    data () {
      return{
        pageData:'',
        proData:'',
        refundstep:1
      }
    },
    methods:{
      getData () {
        Indicator.open();
        let url = '/api/refund/refund_detail',send = {id:this.$route.params.gid};
        this.$http.get(url,{params:send}).then(function(result){
          Indicator.close();
          let rst = JSON.parse(result.body);
          if (rst.status == 1) {
            this.pageData = rst.data.refund
            this.proData = rst.data.order
          }else{
            console.log(rst.msg)
          }
        });
      },
      agreeRefund () {
        MessageBox.confirm('确定申请退款?').then(action => {
          var api = "/api/refund/index",send={
            orderno:this.$route.params.id,
            guest_ids:this.$route.params.gid
          }
          this.$http.get(api,{params:send}).then(function(result){
            var rst = JSON.parse(result.body)
            if (rst.status == 1) {
              this.getData()
            }else{
              alert(rst.msg)
            }            
          });
        });
      },
      agreeMoney () {
        MessageBox.confirm('确认同意退款金额?').then(action => {
          var api = "/api/refund/confirm_refund",send={id:this.$route.params.gid}
          this.$http.get(api,{params:send}).then(function(result){
            var rst = JSON.parse(result.body)
            if (rst.status == 1) {
              this.getData()
            }else{
              alert(rst.msg)
            } 
          });
        });
      },
      confirmSuccess () {
        var api = "/api/refund/complete_refund",send={id:this.$route.params.gid}
        this.$http.get(api,{params:send}).then(function(result){
          var rst = JSON.parse(result.body)
          if (rst.status == 1) {
            this.getData()
          }else{
            alert(rst.msg)
          } 
        });
      },
      callTel () {
        if (this.proData.contact.company_tell != '') {
          window.location.href = 'tel:'+this.proData.contact.company_tell
        }else{
          Toast('暂无电话')
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  .visa-refund{
    .step{
      position: relative;
      padding:1rem 0;
      background-color: #fff;
      .line{
        height: 0.1rem;
        background: #dcdcdc;
        position: absolute;
        top: 1.8rem;
        width: 80%;
        left: 10%;
      }
      ul{
        position: relative;
        z-index: 1;
        overflow:hidden;
        li{
          float: left;
          width: 20%;
          text-align: center;
          span{
            display: block;
            height: 1.5rem;
            width: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            border:1px solid #048de4;
            color: #048de4;
            border-radius: 1.5rem;
            font-size: 0.8rem;
            margin: 0 auto;
            background: #fff;
          }
          p{
            color: #999999;
            font-size: 0.6rem;
            padding-top: 0.2rem;
          }         
          &.on{
            span{
              background: #048de4;
              color: #fff;
            }
            p{
              color: #048de4;
            }
          }          
        }
      }

    }
    .stepcontent{
      .item{
        background: #fff;
        padding:0 0.8rem 1rem;
        .txt{
          font-size: 0.7rem;
          line-height: 1.2rem;
        }
        .btns{
          overflow:hidden;
          padding-top: 1.2rem;
          span{
            display: block;
            width: 45%;
            text-align: center;
            height: 1.3rem;
            font-size: 0.7rem;
            line-height: 1.3rem;
          }
          .confirm{
            float: left;
            color: #666666;
            border:1px solid #999999;
          }
          .contact{
            float: right;
            color: #008be4;
            border:1px solid #008be4;
          }
        }
        .btn{
          padding-top: 1.2rem;
          .contact{
            display: block;
            text-align: center;
            height: 1.3rem;
            font-size: 0.7rem;
            line-height: 1.3rem;
            color: #008be4;
            border:1px solid #008be4;
          }
        }
      }
    }
    .stephistory{
      padding-top: 0.5rem;
      ul{
        li{
          margin-left: 0.8rem;
          padding:0.5rem 0.8rem 0.5rem 0;
          border-top: 1px solid #999999;
          p{
            color: #999999;
            font-size: 0.7rem;
          }
          .returninfo{
            .price{
              overflow:hidden;
              border-bottom: 1px dashed #c1c1c1;
              line-height: 1.8rem;
              span{
                display: block;width: 50%;
                float: left;
                font-size: 0.7rem;
                color: #666666;
                i{
                  font-style: normal;
                  color: #008be4;
                }
              }
            }
            .momo{
              font-size: 0.7rem;
              color: #999999;
              line-height: 1.8rem;
            }
          }
          .express{
            color: #008be4;
            font-size: 0.7rem;
            line-height: 1.8rem;
          }
          &:first-child{
            border-top: none;
            p{
              color: #666666;
            }
          }
        }

      }
    }




  }
</style>