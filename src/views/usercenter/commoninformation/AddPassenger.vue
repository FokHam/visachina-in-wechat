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
      <span>证件类型</span>
      <div class="ipt" @click="idTypeList.display=true">
        <input type="text" v-model="idTypeList.list[clientinfo.id_type-1]" readonly placeholder="选择证件类型">
      </div> 
      <div class="idipt">
        <input type="text" v-model="clientinfo.id_number" placeholder="输入证件号码" maxlength="18">
      </div>      
    </div>
    <div class="item select">
      <span>出生日期</span>
      <div class="ipt" @click="openDatepicker">
        <input type="text" v-model="clientinfo.birthday" readonly placeholder="与证件保持一致">
      </div> 
    </div>
    <div class="item radio">
      <span>性别</span>
      <div class="ipt">
        <div class="woman" :class="{on:clientinfo.sexual==2}" @click="clientinfo.sexual=2"><i></i>女</div>
        <div class="man" :class="{on:clientinfo.sexual==1}" @click="clientinfo.sexual=1"><i></i>男</div>        
      </div> 
    </div>
    <div class="item select">
      <span>客户类型</span>
      <div class="ipt" @click="clientTypeList.display=true">
        <input type="text" v-model="clientTypeList.list[clientinfo.visa_type-1]" readonly>
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
  <mt-datetime-picker
    ref="datepicker"
    type="date"
    :startDate="startDate"
    v-model="initialDate"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日"
    @confirm="dateConfirm">
  </mt-datetime-picker>  
  <picker 
  v-if="idTypeList.display"
  :listdata="idTypeList.list"
  @confirm="typeSet"
  @close="closeComp">
  </picker>
  <picker 
  v-if="clientTypeList.display"
  :listdata="clientTypeList.list"
  @confirm="cttypeSet"
  @close="closeComp">
  </picker>
</div>
</template>

<script>
import { DatetimePicker } from 'mint-ui'
import { Toast } from 'mint-ui'
import Picker from '../../../components/Picker'
export default {
  props: ['info'],
  created:function(){
    if (this.info != "") {
      this.clientinfo = this.info
    }
  },
  data:function(){
    return{
      startDate:new Date('1930','0','1'),
      initialDate:new Date(),
      clientinfo:{"surname":"","name":"","spell_surname":"","spell_name":"","id_type":1,"id_number":"","birthday":"","sexual":1,"phone":"","email":"","visa_type":1},
      idTypeList:{"display":false,"list":["身份证","护照","出生证","驾照","港澳通行证","军官证","台胞证","警官证"]},
      clientTypeList:{"display":false,"list":["在职","自由职业","在校学生","退休人员","学龄前儿童","家庭主妇"]},      
    }
  },
  methods:{
    openDatepicker:function(){
      this.$refs.datepicker.open();
    },
    checkBirthday:function(){      
      var arrB = this.clientinfo.birthday.split("-");
      if(arrB[0]==this.clientinfo.id_number.substring(6,10)&&arrB[1]==this.clientinfo.id_number.substring(10,12)&&arrB[2]==this.clientinfo.id_number.substring(12,14)){
        return true
      }else{
        return false
      }      
    },
    dateConfirm:function(day){
      let m = day.getMonth() > 8 ? day.getMonth() + 1 : "0" + (day.getMonth() + 1),
          d = day.getDate() > 9 ? day.getDate() : "0" + day.getDate();
      this.clientinfo.birthday = day.getFullYear() + "-" + m + "-" + d;
    },
    closeComp:function(){
      this.idTypeList.display = false
      this.clientTypeList.display = false
    },
    typeSet:function(v){
      this.clientinfo.id_type = this.idTypeList.list.indexOf(v) + 1
      this.idTypeList.display = false      
    },
    cttypeSet:function(v){
      this.clientinfo.visa_type = this.clientTypeList.list.indexOf(v) + 1
      this.clientTypeList.display = false      
    },
    verifyData:function(){  
      var reg_id = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;   
      var reg_phone = /^1(3|4|5|7|8)\d{9}$/; 
      var reg_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (this.clientinfo.surname != '' && this.clientinfo.name != '' && this.clientinfo.spell_surname != '' && this.clientinfo.spell_name != '' && this.clientinfo.id_number != '' && this.clientinfo.birthday != '' && this.clientinfo.phone != '' && this.clientinfo.email != '') {
        if(this.clientinfo.id_type==1&&!reg_id.test(this.clientinfo.id_number)){
          Toast('身份证号格式有误')
        }else if(!reg_phone.test(this.clientinfo.phone)){
          Toast('手机号格式有误')
        }else if(!reg_email.test(this.clientinfo.email)){
          Toast('邮箱格式有误')
        }else{
          if(this.clientinfo.id_type==1){
            if(this.checkBirthday()){
              this.submitData()
            }else{
              Toast('出生日期与身份证号不一致')
            }            
          }else{
            this.submitData()
          }
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
          Toast('保存成功')
          this.$emit('submit','passenger')
        }else {
          Toast(rst.msg)
        }
      });        
    }    
  },
  components:{
    Picker
  }
}
</script>

<style lang="less" scoped>
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
        bottom: 0;left: 0;
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
      &.radio{
        .ipt{
          overflow: hidden;
          .man,.woman{
            line-height: 60px;float: right;
            font-size: 0.7rem;
            padding-left: 1rem;
            position: relative;
            padding-right: 10px;
            i{
              display: block;
              height: 0.7rem;
              width: 0.7rem;
              position: absolute;
              border-radius: 0.7rem;
              left: 0px;
              top: 50%;
              margin-top: -0.4rem;
            }
          }
          .man{i{border: 0.1rem solid #239BE8;}}
          .woman{i{border: 0.1rem solid #E961AC;}}
          .man.on{i{background-color: #239BE8;}}
          .woman.on{i{background-color: #E961AC;}}

        }
      }
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