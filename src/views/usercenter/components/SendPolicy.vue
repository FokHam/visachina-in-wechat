<template>
  <div class="send-policy">
    <div class="bg" @click="closecom()"></div>
    <div class="dialog">
      <div class="title">请输入邮箱地址</div>
      <div class="input"><input type="email" v-model="emailAds"></div>
      <div class="btns">
        <span class="c" @click="closecom()">取消</span>
        <span class="s" @click="sendEmail()">发送</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import { Toast } from 'mint-ui'
  export default{
    props:['id'],
    data () {
      return{
        emailAds:''
      }
    },
    methods: {
      sendEmail () {
        let reg_email  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (reg_email.test(this.emailAds)) {
          Indicator.open('正在发送邮件');
          let url = '/api/insurance/send_insurepdf',send = {num:this.id,email:this.emailAds};
          this.$http.get(url,{params:send}).then(function(result){
            Indicator.close();
            let rst = JSON.parse(result.body)
            if (rst.status == 1) {
              Toast('发送成功')
              this.closecom()
            }else {
              Toast(rst.msg)
            }
          });
        }else{
          Toast('请输入正确的邮箱')
        }        
      },
      closecom () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="less" scoped>
  .send-policy{
    position:fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1001;
    .bg{
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      height: 100%;width: 100%;
      top:0;left: 0;
    }
    .dialog{
      background: #fff;
      width: 15rem;
      height: 8rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -7.5rem;
      margin-top: -4rem;
      border-radius: 0.2rem;
      .title{
        font-size: 0.7rem;
        color: #666666;
        line-height: 3rem;
        text-align: center;
      }
      .input{
        margin: 0 1rem;
        border:1px solid #ccc;
        border-radius: 0.2rem;
        overflow: hidden;
        margin-bottom: 1.35rem;
        input{
          border:none;
          background: #fff;
          height: 1.5rem;
          width: 100%;
          font-size: 0.7rem;
          color: #666;
          text-indent: 0.5rem;
        }
      }
      .btns{
        overflow: hidden;
        position: relative;
        :before{
          content: ' ';
          position:absolute;
          height: 2rem;
          width: 1px;
          background: #ccc;
          left: 50%;
          top: 0;
        }
        span{
          width: 50%;
          display: block;
          float: left;
          text-align: center;
          line-height: 2rem;
          border-top: 1px solid #ccc;
        }
        .c{color: #666;}
        .s{color: #58A6EA;}
      }
    }
  }
</style>