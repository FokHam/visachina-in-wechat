<template>
  <div class="edit-person" @click="idTypeSelecting = false">
    <ul class="info-list wave-btm-bg">
      <li class="info-item">
        <span class="label">中文名字</span>
        <input v-model="pDetail.surname" class="info-input surname" type="text" placeholder="姓" value="">
        <input v-model="pDetail.name" class="info-input name" type="text" placeholder="名" value="">
      </li>
      <li class="info-item">
        <span class="label">英文名字</span>
        <input v-model="pDetail.spell_surname" class="info-input surname" type="text" placeholder="姓First name" value="">
        <input v-model="pDetail.spell_name" class="info-input name" type="text" placeholder="名Last name" value="">
      </li>
      <li class="info-item">
        <span class="label">证件类型</span>
      <input v-model="pDetail.id_number" type="text" class="number" value="" placeholder="输入正确的证件号">
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
        <input v-model="pDetail.birthday" class="info-input" type="text" placeholder="与证件保持一致" value="">
      </li>
    </ul>
    <div class="confirm-btn"
      @click="confirm">
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

  export default {
    props: [
      "insuredPersonDetail"
    ],
    data () {
      const minimunDate = new Date(1900, 0, 1);
      const maximunDate = new Date();
      let isrDetail = this.insuredPersonDetail;
      let typeList = ["身份证", "护照", "出生证", "驾照", "港澳通行证", "军官证", "台胞证", "警官证"];
      typeList[99] = "其他";
      return {
        pDetail: {
          id: isrDetail.id || "",
          name: isrDetail.name || "",
          surname: isrDetail.surname || "",
          spell_name: isrDetail.spell_name || "",
          spell_surname: isrDetail.spell_surname || "",
          id_type: typeof parseInt(isrDetail.id_type) === "number" ? parseInt(isrDetail.id_type) : "",
          id_number: isrDetail.id_number || "",
          birthday: isrDetail.birthday || "",
          sexual: parseInt(isrDetail.sexual) || 1,
          phone: isrDetail.phone || "",
          email: isrDetail.email || ""
        },
        initialDate: isrDetail.birthday || new Date(),
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
      confirmBdate (day) {
        let m = day.getMonth() > 8 ? day.getMonth() + 1 : "0" + (day.getMonth() + 1),
            d = day.getDate() > 9 ? day.getDate() : "0" + day.getDate();
        this.pDetail.birthday = day.getFullYear() + "-" + m + "-" + d;
      },
      confirm () {
        //保存信息
        let url = "/api/member/passenger-create";
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
      },
      idTypeSet (v) {
        this.pDetail.id_type = this.idTypeSlots.indexOf(v);
      }
    },
    components: {
      Picker
    }
  }
</script>

<style lang="less" scoped>
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
        flex: 1 1 auto;
      }
      .info-input {
        flex: 1 0 auto;
        border: none;
        font-size: 0.7rem;
        text-align: right;
        margin-right: 0.5rem;
      }
      .show-more-btn {
        color: #a9a9a9;
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
