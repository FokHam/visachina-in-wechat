<template>
<div class="apply-add" id="apply-add">
  <div class="field">
    <div class="item">
      <span>中文名字</span>
      <div class="ipt">
        <input type="text" v-model="clientname" placeholder="与证件保持一致">
      </div>      
    </div>
    <div class="item select">
      <span>客户类型</span>
      <div class="ipt" @click="openSelect">
        <input type="text" v-model="clienttype" readonly placeholder="用于接收签证资料">
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
  <mt-popup
    v-model="popupVisible"
    position="bottom"
    pop-transition="popup-fade">
    <div class="closepop" @click="openSelect">完成</div>
    <mt-picker :slots="typeList" @change="onTypeChange"></mt-picker>
  </mt-popup>
</div>
</template>

<script>
import { Popup } from 'mint-ui'
import { DatetimePicker } from 'mint-ui'
import { Picker } from 'mint-ui'
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
      popupVisible:false,
      typeList:[
        {
          values: ['','在职','自由职业','在校学生','退休人员','学龄前儿童','家庭主妇'],
          textAlign: 'center'
        }],
      clientname:'',
      clienttype:'',
      birthday:''
    }
  },
  methods:{
    getEditData:function(){
      if (this.editId != -1) {
        this.clientname = this.$store.state.visa.apllyMenber[this.editId].name
        this.clienttype = this.$store.state.visa.apllyMenber[this.editId].type
        this.birthday = this.$store.state.visa.apllyMenber[this.editId].birthday
        var dt = this.$store.state.visa.apllyMenber[this.editId].birthday
        dt = dt.split('-')
        this.initialDate = new Date(dt[0],dt[1]-1,dt[2])
      }
    },
    openDatepicker:function(){
      this.$refs.datepicker.open();
    },
    dateConfirm:function(t){
      var m = t.getMonth()+1
      this.birthday = t.getFullYear() +'-'+ m +'-'+ t.getDate()
    },
    openSelect:function(){
      this.popupVisible = !this.popupVisible
    },
    onTypeChange:function(picker, values){
      this.clienttype = values.toString()
    },
    saveClient:function(){
      if (this.clientname != '' && this.clienttype != '' && this.birthday != '') {
        if (this.editId == -1) {
          var c_data = {'check':true,'name':this.clientname,'birthday':this.birthday,'type':this.clienttype,'idnum':''}
          this.$store.commit('visaOrder_apllyMenber_add',c_data)
          history.go(-1)
        }else {
          this.$store.commit('visaOrder_apllyMenber_edit',{
            id:this.editId,
            name:this.clientname,
            type:this.clienttype,
            birth:this.birthday
          })
          history.go(-1)
        }
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