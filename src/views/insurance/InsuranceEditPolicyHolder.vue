<template>
  <div class="edit-person" @click="idTypeSelecting = false">
    <ul class="info-list wave-btm-bg">
      <li class="info-item">
        <span class="label">中文名字</span>
        <input v-model="pDetail.surname" class="info-input surname" type="text" placeholder="姓" maxlength="2">
        <input v-model="pDetail.name" class="info-input name" type="text" placeholder="名" maxlength="2">
      </li>
      <li class="info-item">
        <span class="label">英文名字</span>
        <input v-model="pDetail.spell_surname" class="info-input surname" type="text" placeholder="姓First name" maxlength="12">
        <input v-model="pDetail.spell_name" class="info-input name" type="text" placeholder="名Last name" maxlength="12">
      </li>
      <li class="info-item">
        <span class="label">证件类型</span>
        <input v-model="pDetail.id_number" type="text" class="number" placeholder="输入正确的证件号" maxlength="18">
        <span class="show-more-btn"
          :class="{selected: typeof(pDetail.id_type) === 'number'}"
          @click.stop="idTypeSelecting = true">
          {{ typeof(pDetail.id_type) === "number" ? idTypeSlots[pDetail.id_type] : "请选择证件类型"}}
          <i class="icon-arrow-right"></i>
        </span>
      </li>
      <li class="info-item radio">
        <span class="label">性别</span>
        <div class="ipt">
          <div class="woman" :class="{on: pDetail.sexual === 2}" @click="pDetail.sexual=2"><i></i>女</div>
          <div class="man" :class="{on: pDetail.sexual === 1}" @click="pDetail.sexual=1"><i></i>男</div>
        </div>
      </li>
      <li class="info-item" @click="openBdatePicker">
        <span class="label">出生日期</span>
        <input v-model="pDetail.birthday" class="info-input" type="text" placeholder="与证件保持一致" readonly="readonly">
      </li>
      <li class="info-item">
        <span class="label">手机号码</span>
        <input v-model="pDetail.phone" class="info-input" type="tel" placeholder="请填写手机号码" maxlength="11">
      </li>
      <li class="info-item">
        <span class="label">邮箱</span>
        <input v-model="pDetail.email" class="info-input" type="email" placeholder="请填写常用邮箱" maxlength="30">
      </li>
    </ul>
    <div class="confirm-btn"
      @click="confirmPerson">
      保存
    </div>
    <mt-datetime-picker
      ref="bdatepicker"
      type="date"
      v-model="initialDate"
      :startDate="minimunDate"
      :endDate="maximunDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="confirmBdate">
    </mt-datetime-picker>
    <picker v-if="idTypeSelecting"
      :listdata="idTypeSlots"
      @confirm="idTypeSet"
      @close="idTypeSelecting=false">
    </picker>
  </div>
</template>

<script>
  import Picker from '../../components/Picker';
  import { Toast } from 'mint-ui';

  export default {
    props: [
      "policyHolderDetail"
    ],
    data () {
      const minimunDate = new Date(1900, 0, 1);
      const maximunDate = new Date();
      let pHolder = this.policyHolderDetail;
      let typeList = ["", "身份证", "护照", "出生证", "驾照", "港澳通行证", "军官证", "台胞证", "警官证"];
      typeList[99] = "其他";
      return {
        pDetail: {
          id: pHolder.id || "",
          name: pHolder.name || "",
          surname: pHolder.surname || "",
          spell_name: pHolder.spell_name || "",
          spell_surname: pHolder.spell_surname || "",
          id_type: typeof parseInt(pHolder.id_type) === "number" ? parseInt(pHolder.id_type) : "",
          id_number: pHolder.id_number || "",
          birthday: pHolder.birthday || "",
          sexual: parseInt(pHolder.sexual) || 1,
          phone: pHolder.phone || "",
          email: pHolder.email || ""
        },
        initialDate: pHolder.birthday || new Date(),
        minimunDate: minimunDate,
        maximunDate: maximunDate,
        idTypeSlots: typeList,
        idTypeSelecting: false
      }
    },
    methods: {
      openBdatePicker () {
          this.$refs.bdatepicker.open();
      },
      checkBirthday:function(){      
        var arrB = this.pDetail.birthday.split("-");
        if(arrB[0]==this.pDetail.id_number.substring(6,10)&&arrB[1]==this.pDetail.id_number.substring(10,12)&&arrB[2]==this.pDetail.id_number.substring(12,14)){
          return true
        }else{
          return false
        }      
      },
      confirmBdate (day) {        
        let m = day.getMonth() > 8 ? day.getMonth() + 1 : "0" + (day.getMonth() + 1),
            d = day.getDate() > 9 ? day.getDate() : "0" + day.getDate();
        this.pDetail.birthday = day.getFullYear() + "-" + m + "-" + d;
      },
      idTypeSet (v) {
        this.pDetail.id_type = this.idTypeSlots.indexOf(v);
      },
      confirmPerson () {
        if(this.pDetail.name!=''&&this.pDetail.surname!=''&&this.pDetail.spell_name!=''&&this.pDetail.spell_surname!=''&&this.pDetail.id_type!=''&&this.pDetail.id_number!=''&&this.pDetail.birthday!=''&&this.pDetail.phone!=''&&this.pDetail.email!=''){
          var reg_id = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;   
          var reg_phone = /^1(3|4|5|7|8)\d{9}$/; 
          var reg_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          if(this.pDetail.id_type==1&&!reg_id.test(this.pDetail.id_number)){
            Toast('身份证号格式有误')
          }else if(!reg_phone.test(this.pDetail.phone)){
            Toast('手机号格式有误')
          }else if(!reg_email.test(this.pDetail.email)){
            Toast('邮箱格式有误')
          }else{
            if(this.pDetail.id_type==1&&!this.checkBirthday()){
              Toast('出生日期与身份证号不一致')
            }else{
              let url = "/api/member/passenger_create";
              let send = this.pDetail;
              console.log(send);
              this.$http.get(url, {params: send}).then((response) => {
                console.log(JSON.parse(response.body));
                let body = JSON.parse(response.body);
                if (body.status === 1) {
                  this.$emit("confirm");
                }
              }, (response) => {
                console.log("服务器错误！");
              });
            }
          }
        }else{
          Toast('请先完善投保人信息');
        }
      }
    },
    components:{
      Picker
    }
  }
</script>

<style lang="less" scoped>
  p,span,a{font-size: 0.7rem;}
  .icon-arrow-right {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background: url(/static/images/insurance/arrow-r.png) center no-repeat;
    background-size: contain;
  }
  .edit-person {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
  }
  .info-list {
    margin: 0 0.5rem;
    padding-bottom: 1rem;
    background-color: #fff;
    .info-item {
      position: relative;
      display: flex;
      line-height: 3.2rem;
      border-top: 0.05rem solid #eee;
      margin: 0 0.5rem;
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
      .surname {
        width: 40%
      }
      .name {
        width: 30%;
      }
      &:first-child {
        border-top: none;
      }
      .label {
        flex: 1;
      }
      .info-input {
        flex: 1;
        border: none;
        font-size: 0.7rem;
        text-align: right;
        margin-right: 0.5rem;
      }
      .show-more-btn {
        color: #a9a9a9;
        width: 50%;
        text-align: right;
        &.selected {
          color: #333;
        }
      }
      .number {
        border: none;
        line-height: 1;
        font-size: 0.7rem;
        position: absolute;
        top: 2rem;
        width: 10rem;
        color: #999;
        left: 0;
        bottom: 0;
      }
    }
  }
  .confirm-btn {
    margin-top: 3rem;
  }
  .picker {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
  }
</style>
