<template>
<div class="bindphone" id="bindphone">
  <div class="iptpart phonenum">
    <div class="tit" :class="{on:phoneNum!=''}">手机号</div>
    <input type="tel" maxlength="11" v-model="phoneNum">
    <div class="getCode" v-show="phoneNum.length==11">发送验证码</div>
  </div>
  <div class="iptpart code">
    <div class="tit" :class="{on:code!=''}">验证码</div>
    <input type="tel" maxlength="6" v-model="code">
    <div class="clear" v-show="code!=''"></div>
  </div>
  <div class="submit">确定</div>



</div>
</template>

<script>
export default{
  name:'bindphone',
  beforeCreate(){
    document.title = '绑定手机号'    
  },
  data:function(){
    return{
      phoneNum:'',
      code:''
      
    }
  },
  methods:{
    
  }
}
</script>

<style lang="less" scoped>
.bindphone{
  background-color: #fff;height: 100%;position: absolute;width: 100%;
  .iptpart{
    position: relative;border-bottom: 2px solid #eeeeee;padding-right: 80px;
    height: 35px;padding-top: 35px;margin-left: 30px;padding-left: 10px;
    .tit{
      font-size: 0.7rem;color: #999999;
      position: absolute;top: 35px;height: 35px;
      line-height: 35px;transition: ease-in-out .3s;
      &.on{
        line-height: 50px;top: 0;
      }
    }
    input{
      height: 35px;border: none;font-size: 0.7rem;width: 100%;
      position: relative;z-index: 1;background: none;
    }
  }
  .phonenum{
    margin-top: 35px;
    .getCode{
      color: #008ce4;line-height: 35px;position: absolute;right: 10px;bottom: 0;
      font-size: 0.6rem;
    }
  }
  .code{
    padding-right: 40px;
    .clear{
      background-image: url('/static/images/usercenter/icon-clear.png');
      background-repeat: no-repeat;
      background-size: 15px;
      background-position: right center;
      height: 35px;
      width: 35px;
      position: absolute;
      right: 10px;
      bottom: 0;
    }
  }
  .submit{
    background-color: #008ce4;
    height: 40px;line-height: 40px;font-size: 0.8rem;color: #fff;
    margin-left: 30px;text-indent: 4rem;
    border-radius: 2px 0 0 2px;margin-top: 60px;
    
  }


}
</style>