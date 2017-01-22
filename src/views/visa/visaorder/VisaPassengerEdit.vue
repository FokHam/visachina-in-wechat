<template>
<div class="apply-add" id="apply-add">
  <div class="field">
    <div class="item">
      <span>中文名字</span>
      <div class="ipt">
        <input type="text" v-model="passengerInfo.name" placeholder="与证件保持一致">
      </div>      
    </div>
    <div class="item select">
      <span>客户类型</span>
      <div class="ipt" @click="typedis=true">
        <input type="text" v-model="typeList[passengerInfo.type-1]" readonly placeholder="用于接收签证资料">
      </div>
    </div>
  </div>
  <div class="tips">领馆规定：儿童按照成人价收取费用</div>
  <div class="save" @click="saveClient">保存</div>  
  <div class="cancel" @click="close">取消</div>  
  <picker 
  v-if="typedis"
  :listdata="typeList"
  @confirm="typeSet"
  @close="closeComp">
  </picker>
</div>
</template>

<script>
import Picker from '../../../components/Picker'
import { Toast } from 'mint-ui'
export default {
  props:['passenger'],
  created:function(){
    if (this.passenger != '') {
      this.passengerInfo = this.passenger
    }
  },
  data:function(){
    return{
      typedis:false,      
      typeList:['在职','自由职业','在校学生','退休人员','学龄前儿童','家庭主妇'],
      passengerInfo:{"name":"","type":"","spell":"","id_type":1,"id_number":"","birthday":"","sexual":1,"phone":"","email":"","check":false,"icheck":false},
    }
  },
  methods:{
    typeSet:function(v){
      if (v=='') {v='在职'}      
      this.passengerInfo.type = this.typeList.indexOf(v) + 1
      this.typedis = false      
    },
    closeComp:function(){
      this.typedis = false
    },
    close:function(){
      this.$emit('close')
    },
    saveClient:function(){
      if (this.passengerInfo.name != '' && this.passengerInfo.type != '') {
        var url = '/member/passenger-create',send=this.passengerInfo;      
        this.$http.get(url,{params:send}).then(function(result){
          var rst = JSON.parse(result.body)
          if (rst.status == 1) {
            if (this.passenger != '') {
              this.$emit('confirm','edit',this.passengerInfo)
            }else{
              this.$emit('confirm','add',this.passengerInfo)
            }            
          }else {
            Toast(rst.msg)
          }
        });
      }else{
        Toast('请完善申请信息')
      }
    }
  },
  components:{
    Picker
  }
}
</script>

<style lang="less" scoped>
.apply-add{
  background-color: #F6F6F6;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1002;
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
  .tips{
    color: #FF3000;font-size: 0.6rem;margin: 25px 10px 10px;
  }
  .save{
    font-size: 0.8rem;color: #fff;
    line-height: 35px;margin: 0px 10px 10px;
    text-align: center;background-color: #008be4;
    border-radius: 4px;
  }
  .cancel{
    font-size: 0.8rem;color: #fff;
    line-height: 35px;margin: 0px 10px 25px;
    text-align: center;background-color: #CCC;
    border-radius: 4px;
  }  
}
</style>