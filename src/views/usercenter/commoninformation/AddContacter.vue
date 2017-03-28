<template>
<div class="add-address">
  <div class="field">
    <div class="item">
      <span>联系人</span>
      <div class="ipt">
        <input type="text" v-model="clientinfo.name" maxlength="5">
      </div>      
    </div>
    <div class="item">
      <span>手机号</span>
      <div class="ipt">
        <input type="tel" v-model="clientinfo.tel" maxlength="11">
      </div>      
    </div>  
    <div class="item">
      <span>邮箱</span>
      <div class="ipt">
        <input type="email" v-model="clientinfo.email" maxlength="30">
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
      clientinfo:{"name":"","tel":"","email":""}
    }
  },
  methods:{
    verifyData:function(){    
      var reg_phone = /^1(3|4|5|7|8)\d{9}$/; 
      var reg_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (this.clientinfo.name != '' && this.clientinfo.tel != '' && this.clientinfo.email != '') {        
        if(!reg_phone.test(this.clientinfo.tel)){
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
      var url = '/api/member/contact_create',send=this.clientinfo;      
      this.$http.get(url,{params:send}).then(function(result){
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          Toast('保存成功')
          this.$emit('submit','contact')
        }else {
          Toast(rst.msg)
        }
      });        
    }    
  }
}
</script>

<style lang="less" scoped>
.add-address{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: #F6F6F6;
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
        background-repeat:no-repeat;background-position:right center;
        background-size: 16px;
        input{
          height: 60px;border: none;background: #fff;width: 100%;
          font-size: 0.7rem;color: #666666;text-align: right;
        }
        &.select{background-image: url('/static/images/visa/icon-right.png');}
        .txt{
          height: 60px;
          line-height: 60px;
          text-align: right;
          font-size: 0.7rem;
          color: #666666;
        }
        &.street{
          padding: 30px 20px 0 0;
          input{
            text-align: left;
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
        height: 45px;line-height: 60px;
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
  .mint-popup-bottom{width: 100%;}
  .closepop{
    font-size: 0.7rem;line-height: 30px;border-bottom: 1px solid #ccc;
    padding: 0 10px;color: #008BE4;text-align: right;
  }
}
</style>