<template>
  <div class="edit-person" @click="idTypeSelecting = false">
    <ul class="info-list wave-btm-bg">
      <li class="info-item">
        <span class="label">中文名字</span>
        <input v-model="cName" class="info-input" type="text" placeholder="与证件保持一致" value="">
      </li>
      <li class="info-item">
        <span class="label">英文名字</span>
        <input v-model="eName" class="info-input" type="text" placeholder="例如：Zhangsan" value="">
      </li>
      <li class="info-item">
        <span class="label">未选择证件类型</span>
        <input v-model="idNo" type="text" class="number" value="" placeholder="输入正确的证件号">
        <span class="show-more-btn"
          :class="{selected: typeof(idType) === 'number'}"
          @click.stop="idTypeSelecting = true">
          {{ typeof(idType) === "number" ? idTypeSlots[0].values[idType] : "请选择证件类型"}}
          <i class="icon-arrow-right"></i>
        </span>
      </li>
      <li class="info-item" @click="openBdatePicker">
        <span class="label">出生日期</span>
        <input v-model="birthday" class="info-input" type="text" placeholder="与证件保持一致" value="">
      </li>
      <li class="info-item">
        <span class="label">手机号码</span>
        <input v-model="phone" class="info-input" type="text" placeholder="请填写手机号码" value="">
      </li>
      <li class="info-item">
        <span class="label">邮箱</span>
        <input v-model="email" class="info-input" type="text" placeholder="请填写常用邮箱" value="">
      </li>
    </ul>
    <div class="confirm-btn"
      @click="confirmPerson">
      保存
    </div>
    <mt-datetime-picker
      ref="bdatepicker"
      type="date"
      :startDate="minimunDate"
      :endDate="maximunDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="confirmBdate">
    </mt-datetime-picker>
    <mt-picker v-show="idTypeSelecting"
      :visibleItemCount="3"
      :slots="idTypeSlots"
      @change="onIdTypeChange"></mt-picker>
  </div>
</template>

<script>
  export default {
    data () {
      const minimunDate = new Date(1900, 0, 1);
      const maximunDate = new Date();
      return {
        id: "",
        cName: "",
        eName: "",
        idType: "",
        idNo: "",
        birthday: "",
        phone: "",
        email: "",
        minimunDate: minimunDate,
        maximunDate: maximunDate,
        idTypeSlots: [{
          flex: 1,
          values: ["身份证", "军官证", "护照"]
        }],
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
        this.birthday = day.getFullYear() + "-" + m + "-" + d;
      },
      confirmPerson () {
        //保存信息
        this.$emit("confirm");
      },
      onIdTypeChange (p, v) {
        this.idType = this.idTypeSlots[0].values.indexOf(v[0]);
      }
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
