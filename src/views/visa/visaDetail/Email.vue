<template>
<div v-if="isshow" class="emailDialog">
  <div class="send-email">
    <div class="txt">签证办理手续所需资料将发送到收件人邮箱</div>
    <div class="txtinput">
      <div class="ipt"><input type="text" v-model="emailAds" placeholder="邮箱地址"></div>
      <div class="ipt"><input type="text" v-model="emailName" placeholder="发件人"></div>      
      <div class="tara"><textarea rows="3" v-model="emailCon" placeholder="邮件内容"></textarea></div>
    </div>
    <div class="typelist">
      <span @click="chooseType(0)" :class="{on:sendType == 0}">自由职业者</span>
      <span class="center" @click="chooseType(1)" :class="{on:sendType == 1}">在职人员</span>
      <span @click="chooseType(2)" :class="{on:sendType == 2}">在校学生</span>
      <span @click="chooseType(3)" :class="{on:sendType == 3}">退休人员</span>
      <span class="center" @click="chooseType(4)" :class="{on:sendType == 4}">学龄前儿童</span>
      <span @click="chooseType(5)" :class="{on:sendType == 5}">家庭主妇</span>
    </div>
    <div class="sendbtn" @click="sendEmail">发送</div>
  </div>
  <div class="backshadow" @click="closePage"></div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  props: ['isshow','onum'],
  data:function(){
    return{
      sendType:0,
      emailAds:'',
      emailName:'',
      emailCon:'',

    }
  },
  methods: {
    chooseType:function(v){
      this.sendType = v
    },
    sendEmail:function(){
      if (this.emailAds == '') {        
        Toast('请输入邮件地址')
        return false
      }
      if (this.emailName == '') {        
        Toast('请输入发件人姓名')
        return false
      }
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
        margin-bottom: 5px;
        &.center{
          margin: 0 14px;
        }
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
