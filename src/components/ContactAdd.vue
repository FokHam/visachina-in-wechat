<template>
<div class="add-contact">
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
.add-contact{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1002;
  background-color: #F6F6F6;
  .field{
    margin: 0 0.5rem;
    background-color: #fff;
    background-image: url('/static/images/visa/borderbg.png');
    background-repeat:repeat-x ;background-position:bottom;
    background-size: 0.5rem;
    padding: 0 0.5rem 1.5rem;
    .item{
      position: relative;
      height: 3rem;
      border-bottom: 1px solid #EEEEEE;
      .ipt{
        padding: 0 1rem 0 3.5rem;        
        background-repeat:no-repeat;background-position:right center;
        background-size: 0.8rem;
        input{
          height: 3rem;border: none;background: #fff;width: 100%;
          font-size: 0.7rem;color: #666666;text-align: right;
        }
        &.select{background-image: url('/static/images/visa/icon-right.png');}
        .txt{
          height: 3rem;
          line-height: 3rem;
          text-align: right;
          font-size: 0.7rem;
          color: #666666;
        }
        &.street{
          padding: 1.5rem 1rem 0 0;
          input{
            text-align: left;
          }
        }
      }
      .idipt{
        position: absolute;
        bottom: 0;
        height: 1rem;width: 10rem;
        input{
          height: 1rem;display: block;width: 10rem;
          border: none;font-size: 0.6rem;
        }
      }
      span{
        font-size: 0.7rem;
        height: 2.25rem;line-height: 3rem;
        position: absolute;
        left: 0;top: 0;width: 3.5rem;
      }
      &:last-child{border-bottom: none;}
    }
  }
  .save{
    font-size: 0.8rem;color: #fff;
    line-height: 1.75rem;margin: 2.5rem 0.5rem 1.25rem;
    text-align: center;background-color: #008be4;
    border-radius: 0.2rem;
  }
  .mint-popup-bottom{width: 100%;}
  .closepop{
    font-size: 0.7rem;line-height: 1.5rem;border-bottom: 1px solid #ccc;
    padding: 0 0.5rem;color: #008BE4;text-align: right;
  }
}
</style>