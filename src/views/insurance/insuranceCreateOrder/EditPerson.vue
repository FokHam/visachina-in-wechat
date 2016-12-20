<template>
  <div class="edit-person">
    <ul class="info-list wave-btm-bg">
      <li class="info-item">
        <span class="label">中文名字</span>
        <input v-model="cname" class="info-input" type="text" placeholder="与证件保持一致" value="">
      </li>
      <li class="info-item">
        <span class="label">英文名字</span>
        <input v-model="ename" class="info-input" type="text" placeholder="例如：Zhangsan" value="">
      </li>
      <li class="info-item">
        <span class="label">未选择证件类型</span>
        <input type="number" class="number" value="" placeholder="输入正确的证件号">
        <span class="show-more-btn">请选择证件类型<i class="icon-arrow-right"></i></span>
      </li>
      <li class="info-item" @click="openBdatePicker">
        <span class="label">出生日期</span>
        <input v-model="bdate" class="info-input" type="text" placeholder="与证件保持一致" value="">
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
  </div>
</template>

<script>
  export default {
    data: function () {
      const minimunDate = new Date(1900, 0, 1);
      const maximunDate = new Date();
      return {
        cname: "",
        ename: "",
        codeType: "",
        bdate: "",
        minimunDate: minimunDate,
        maximunDate: maximunDate
      }
    },
    methods: {
      openBdatePicker:function() {
          this.$refs.bdatepicker.open();
      },
      confirmBdate: function (d) {
        var m = d.getMonth() + 1;
        this.bdate = d.getFullYear() + "-" + m + "-" + d.getDate()
      },
      confirmPerson: function () {
        //保存信息
        this.$emit("confirm");
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
      }
      .number {
        border: none;
        line-height: 1;
        font-size: 0.7rem;
        position: absolute;
        top: 2rem;
        color: #999;
      }
    }
  }
  .confirm-btn {
    margin-top: 3rem;
  }
</style>
