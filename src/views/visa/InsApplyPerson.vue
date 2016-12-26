<template>
<div class="apply-person" id="apply-person">
  <div class="field">
    <div class="item">
      <span>中文名字</span>
      <div class="ipt">
        <input type="text" v-model="pageInfo.name" maxlength="8" placeholder="与证件保持一致">
      </div>      
    </div>
    <div class="item">
      <span>英文名字</span>
      <div class="ipt">
        <input type="text" v-model="pageInfo.ename" maxlength="20" placeholder="例如：Zhangsan">
      </div>      
    </div>
    <div class="item">
      <span>身份证号</span>
      <div class="ipt">
        <input type="text" v-model="pageInfo.idnum" maxlength="18" placeholder="与证件保持一致">
      </div>      
    </div>    
    <div class="item select">
      <span>出生日期</span>
      <div class="ipt">
        <input type="text" v-model="pageInfo.birthday" readonly placeholder="与证件保持一致">
      </div> 
    </div>
    <div class="item">
      <span>手机号码</span>
      <div class="ipt">
        <input type="tel" v-model="pageInfo.phone" maxlength="11" placeholder="用于接收投保信息">
      </div>      
    </div> 
    <div class="item">
      <span>邮箱</span>
      <div class="ipt">
        <input type="email" v-model="pageInfo.email" placeholder="请填写常用邮箱">
      </div>      
    </div> 

  </div>
  <div class="save" @click="saveClient">保存</div>
  
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name:'apply-person',
  created:function(){
    this.pageInfo = this.applyPerson
  },
  computed: {
    applyPerson () {
      return this.$store.state.visa.insApplyPerson
    }
  },
  data:function(){
    return{
      pageInfo:[]
    }
  },
  watch:{
    pageInfo:{
      handler(){
        if (this.pageInfo.idnum.length >= 15) {
          var y = this.pageInfo.idnum.substring(6, 10)
          var m = this.pageInfo.idnum.substring(10, 12)
          var d = this.pageInfo.idnum.substring(12, 14)
          this.pageInfo.birthday = y+'-'+m+'-'+d
        }else {
          this.pageInfo.birthday = ""
        }
　　　},
　　　deep:true
    }
  },
  methods:{    
    saveClient:function(){
      var idreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,emailreg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,4}){1,3})$/g,phonereg=/^1\d{10}$/g;
      if (this.pageInfo.name != '' && this.pageInfo.ename != '' && this.pageInfo.idnum != '' && this.pageInfo.phone != '' && this.pageInfo.email != '' ) {
        if (idreg.test(this.pageInfo.idnum) == false) {
          Toast('身份证格式错误')
          return false
        }
        if (phonereg.test(this.pageInfo.phone) == false) {
          Toast('手机号码格式错误')
          return false
        }
        if (emailreg.test(this.pageInfo.email) == false) {
          Toast('邮件地址格式错误')
          return false
        }        
        this.$store.commit('visaOrder_applyer_save',this.pageInfo)
        history.go(-1)
      }else{
        Toast('您还有未填写的选项')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.apply-person{
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
    line-height: 35px;margin: 25px 10px 25px;
    text-align: center;background-color: #008be4;
    border-radius: 4px;
  }
  
}
</style>