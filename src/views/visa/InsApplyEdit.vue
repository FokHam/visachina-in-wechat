<template>
<div class="apply-add" id="apply-add">
  <div class="field">
    <div class="item">
      <span>英文名字</span>
      <div class="ipt">
        <input type="text" v-model="clientename" placeholder="例如：Zhangsan">
      </div>      
    </div>
    <div class="item">
      <span>身份证号</span>
      <div class="ipt">
        <input type="text" v-model="clientid" placeholder="与证件保持一致">
      </div>      
    </div>    
    <div class="item select">
      <span>出生日期</span>
      <div class="ipt" @click="openDatepicker">
        <input type="text" v-model="birthday" readonly placeholder="与证件保持一致">
      </div> 
    </div>

  </div>
  <div class="tips">领馆规定：儿童按照成人价收取费用</div>
  <div class="save" @click="saveClient">保存</div>
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
</div>
</template>

<script>
import { DatetimePicker } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
  name:'apply-add',
  created:function(){
    this.getEditData()
  },
  data:function(){
    return{
      editId:this.$route.params.id, 
      startDate:new Date('1930','0','1'),
      initialDate:new Date(),      
      clientename:'',
      clientid:'',
      birthday:''
    }
  },
  methods:{
    getEditData:function(){
      
      this.clientename = this.$store.state.visa.apllyMenber[this.editId].name
      this.clientid = this.$store.state.visa.apllyMenber[this.editId].idnum
      this.birthday = this.$store.state.visa.apllyMenber[this.editId].birthday
      var dt = this.$store.state.visa.apllyMenber[this.editId].birthday
      dt = dt.split('-')
      this.initialDate = new Date(dt[0],dt[1]-1,dt[2])
      
    },
    openDatepicker:function(){
      this.$refs.datepicker.open();
    },
    dateConfirm:function(t){
      var m = t.getMonth()+1
      this.birthday = t.getFullYear() +'-'+ m +'-'+ t.getDate()
    },
    saveClient:function(){
      if (this.clientename != '' && this.clientid != '' && this.birthday != '') {
        this.$store.commit('visaOrder_insMenber_edit',{
          id:this.editId,
          ename:this.clientename,
          idnum:this.clientid,
          birth:this.birthday
        })
        history.go(-1)
        
      }else{
        Toast('不可以留空哦~')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.apply-add{
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
    line-height: 35px;margin: 0px 10px 25px;
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