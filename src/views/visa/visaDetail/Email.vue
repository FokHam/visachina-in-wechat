<template>
<div class="emailDialog">
  <div class="send-email">
    <div class="txt">签证办理手续所需资料将发送到收件人邮箱</div>
    <div class="txtinput">
      <div class="ipt"><input type="text" v-model="emailAds" placeholder="邮箱地址"></div>
      <div class="ipt"><input type="text" v-model="emailName" placeholder="发件人"></div>      
      <div class="tara"><textarea rows="3" v-model="emailCon" placeholder="邮件内容"></textarea></div>
    </div>
    <div class="typelist" v-if="type == 'detail'">
      <span v-for="item in typedata" @click="chooseType(item.guest_class)" :class="{on:sendType == item.guest_class}">{{item.guest_class_name}}</span>     
    </div>
    <div class="typelist" v-if="type == 'order'">
      <span class="on">{{typeArr[sendType-1]}}</span>     
    </div>
    <div class="sendbtn" @click="sendEmail">发送</div>
  </div>
  <div class="backshadow" @click="closePage"></div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  props: ['type','typedata','proid'],
  created (){
    if (this.type == 'detail') {
      this.sendType = this.typedata[0].guest_class
    }else if(this.type == 'order') {
      this.sendType = this.typedata
    }
  },
  data:function(){
    return{
      typeArr:['在职','自由职业','在校学生','退休人员','学龄前儿童','家庭主妇'],
      sendType:'',
      emailAds:'',
      emailName:'',
      emailCon:''
    }
  },
  methods: {
    chooseType:function(v){
      this.sendType = v
    },
    sendEmail:function(){
      var emailreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
      if (this.emailAds == '' || this.emailName == '') {        
        Toast('请输入邮件地址和发件人名称')
        return false
      }
      if (!emailreg.test(this.emailAds)) {        
        Toast('请输入正确的邮件地址')
        return false
      }
      var url = '/api/visa/send_file',send = {product_id:this.proid,type_id:this.sendType,email:this.emailAds,send_user:this.emailName,content:this.emailCon}
      this.$http.get(url,{params:send}).then(function(result){
        console.log(result.body)
        var rst = JSON.parse(result.body)
        if (rst.data == true) {
          this.$emit('closePage')
          Toast('发送成功')
        }else {
          console.log(rst.msg)
        }
      });
    
    },
    closePage:function(){
      this.$emit('closePage')
    }
  }
   
}
</script>

<style lang="less" scoped>
.emailDialog{
  position: fixed;height: 100%;width: 100%;left: 0;top: 0;z-index: 999;
  .backshadow{
    position: absolute;height: 100%;width: 100%;left: 0;top: 0;
    background-color: rgba(0, 0, 0, 0.5)
  }
  .send-email{
    position: absolute;top: 50%;left: 50%;margin-left: -150px;z-index: 99;
    background-color: #fff;border-radius: 3px;padding: 5px 20px;margin-top: -150px;
    width: 260px;
    .txt{font-size: 0.6rem;color: #999999;line-height: 30px;}
    .txtinput{
      .ipt{
        border: 1px solid #999999;border-radius: 3px;margin-bottom: 5px;overflow: hidden;
        input{
          width: 100%;background-color: #fff;height: 33px;
          font-size: 0.7rem;text-indent: 5px;border: none;
        }
      }
      .tara{
         border: 1px solid #999999;border-radius: 3px;margin-bottom: 5px;overflow: hidden;height: 60px;
         textarea{
            height: 66px;
            border: none;
            background: #fff;
            width: 248px;
            resize: none;
            padding: 5px;
            font-size: 0.6rem;
         }
      }      
    }
    .typelist{
      overflow: hidden;
      span{
        float: left;
        height: 25px;
        line-height: 25px;
        border: 1px solid #F4EAF8;
        font-size: 0.6rem;
        color: #999999;
        display: block;
        width: 75px;
        text-align: center;
        border-radius: 30px;
        margin:4px;
        &.on{
          background-color: #F4EAF8;color: #3c124d;
        }
      }
    }
    .sendbtn{
      height: 33px; width: 205px;margin: 10px auto;
      background-color: #008BE4;font-size: 0.8rem;color: #fff;
      text-align: center;line-height: 33px;border-radius: 3px;
    }


  }
}

</style>
