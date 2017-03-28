<template>
<div class="add-passenger">
  <div class="field">
    <div class="item">
      <span>中文名字</span>
      <div class="ipt name">
        <input type="text" v-model="clientinfo.surname" placeholder="姓" maxlength="2">
        <input type="text" v-model="clientinfo.name" placeholder="名" maxlength="2">
      </div>      
    </div>
    <div class="item">
      <span>英文名字</span>
      <div class="ipt name">
        <input type="text" v-model="clientinfo.spell_surname" placeholder="姓：如Zhang" maxlength="12">
        <input type="text" v-model="clientinfo.spell_name" placeholder="名：如San" maxlength="12">
      </div>      
    </div>
    <div class="item">
      <span>手机号码</span>
      <div class="ipt">
        <input type="tel" v-model="clientinfo.phone" placeholder="11位手机号码" maxlength="11">
      </div>      
    </div>
    <div class="item">
      <span>电子邮箱</span>
      <div class="ipt">
        <input type="email" v-model="clientinfo.email" placeholder="输入常用邮箱" maxlength="30">
      </div>      
    </div>
  </div>
  <div class="save" @click="verifyData">保存</div>
  
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  props: ['info'],
  created:function(){
    if (this.info != "") {
      this.clientinfo = this.info
    }
  },
  data:function(){
    return{      
      clientinfo:{"surname":"","name":"","spell_surname":"","spell_name":"","id_type":1,"id_number":"","birthday":"","sexual":1,"phone":"","email":"","visa_type":1}
    }
  },
  methods:{   
    verifyData:function(){      
      var reg_phone = /^1(3|4|5|7|8)\d{9}$/; 
      var reg_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (this.clientinfo.surname != '' && this.clientinfo.name != '' && this.clientinfo.spell_surname != '' && this.clientinfo.spell_name != '' && this.clientinfo.phone != '' && this.clientinfo.email != '') {
        if(!reg_phone.test(this.clientinfo.phone)){
          Toast('手机号格式有误')
        }else if(!reg_email.test(this.clientinfo.email)){
          Toast('邮箱格式有误')
        }else{
          this.submitData()
        }
      }else{
        Toast('请完善资料后再保存')
      }      
    },
    submitData:function(){
      var url = '/api/member/passenger_create',send=this.clientinfo;      
      this.$http.get(url,{params:send}).then(function(result){
        console.log(result.body)
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.$emit('submit')
        }else {
          Toast(rst.msg)
        }
      });        
    }    
  }
}
</script>

<style lang="less" scoped>
p,span,a{font-size: 0.7rem;}
.add-passenger{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: #F6F6F6;
  overflow-y:scroll;
  overflow-scrolling: touch;-webkit-overflow-scrolling: touch;
  .field{
    margin: 0 10px;
    background-color: #fff;
    background-image: url('/static/images/visa/borderbg.png');
    background-repeat:repeat-x ;background-position:bottom;
    background-size: 10px;
    padding: 0 10px 30px;
    .item{
      position: relative;
      height: 60px;
      border-bottom: 1px solid #EEEEEE;
      .ipt{
        padding: 0 20px 0 70px;
        background-image: url('/static/images/visa/icon-right.png');
        background-repeat:no-repeat;background-position:right center;
        background-size: 16px;
        input{
          height: 60px;border: none;background: #fff;width: 100%;
          font-size: 0.7rem;color: #666666;text-align: right;
        }
        &.name{
          input{
            width: 50%;
            text-align: right;
            float: left;
          }
        }
      }
      .idipt{
        position: absolute;
        bottom: 0;
        height: 20px;width: 200px;
        input{
          height: 20px;display: block;width: 200px;
          border: none;font-size: 12px;
        }
      }
      span{
        font-size: 0.7rem;
        height: 60px;line-height: 60px;
        position: absolute;
        left: 0;top: 0;width: 70px;
      }
      &:last-child{border-bottom: none;}
    }
  }
  .save{
    font-size: 0.8rem;color: #fff;
    line-height: 35px;margin: 50px 10px 25px;
    text-align: center;background-color: #008be4;
    border-radius: 4px;
  }
}
</style>