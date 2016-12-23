<template>
  <div class="datepicker">
    <calendar
      v-if="pickingDate"
      v-on:confirm="setDate"
      type1="起保"
      type2="终保"
      :multipleDate="multipleDate"
      :pickType ="pickingType"
      :minDay="minimunDay"
      :maxDay="maximunDay"
      :day1="startDate"
      :day2="endDate"
      ></calendar>
    <div class="tabbar">
      <span class="tabbar-btn" :class="{ active:singleTime == 0 }" @click="singleTime = 0; minimunDay = minDay">单次</span>
      <span class="tabbar-btn" :class="{ active:singleTime == 1 }" @click="singleTime = 1; minimunDay = 365">一年多次</span>
    </div>
    <div class="single-time" v-if="singleTime === 0">
      <div class="date-show"
        @click="pickingDate = 1; pickingType = 1">
        <i class="icon-calendar"></i>
        <p>{{ ((dateFormat1.month > 8) ? (dateFormat1.month + 1) : ("0" + (dateFormat1.month + 1))) + "月" + dateFormat1.date + "日" }} <i class="icon-leave"></i></p>
        <p>{{ dateFormat1.year + "年 星期" + dateFormat1.day }}</p>
        <i class="icon-arrow-right"></i>
      </div>
      <div class="date-show"
        @click="pickingDate = 1; pickingType = 2">
        <i class="icon-calendar"></i>
        <p>{{ ((dateFormat2.month > 8) ? (dateFormat2.month + 1) : ("0" + (dateFormat2.month + 1))) + "月" + dateFormat2.date + "日" }} <i class="icon-back"></i></p>
        <p>{{ dateFormat2.year + "年 星期" + dateFormat1.day }}</p>
        <i class="icon-arrow-right"></i>
      </div>
      <div class="date-total">
        <span>{{ totalDay + "天" }}</span>
      </div>
    </div>
    <div class="multiple-time" v-if="singleTime === 1">
      <div class="date-show"
        @click="pickingDate = 1; pickingType = 1">
        <i class="icon-calendar"></i>
        <p class="date-leave">{{ dateFormat1.year + "年" + ((dateFormat1.month > 8) ? (dateFormat1.month + 1) : ("0" + (dateFormat1.month + 1))) + "月" + dateFormat1.date + "日 星期" + dateFormat1.day }}</p>
        <p class="date-back">{{ dateFormat2.year + "年" + ((dateFormat2.month > 8) ? (dateFormat2.month + 1) : ("0" + (dateFormat2.month + 1))) + "月" + dateFormat2.date + "日 星期" + dateFormat2.day }}<i class="icon-back"></i></p>
        <i class="icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
  const weekDay = ["日", "一", "二", "三", "四", "五", "六"];
  const dateFormatter = function (d) {
    if (d) {
      return {
        date: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
        day: weekDay[d.getDay()]
      }
    }
  }

  import Calendar from "../../../components/Calendar.vue";

  export default {
    mounted () {
      this.setDate(this.startDate, this.endDate);
    },
    props: [
      "type",  // 0单次，1一年多次，2一年一次
      "date1",
      "date2",
      "minDay"
    ],
    data: function () {
      return {
        singleTime: this.type,
        startDate: this.date1,
        endDate: this.date2,
        pickingDate: false,
        minimunDay: this.minDay,
        maximunDay: 365
      }
    },
    methods: {
      setDate: function (day1, day2) {
        this.pickingDate = false;
        this.startDate = day1;
        this.endDate = day2;
        this.$store.commit("setInsuranceDate", {
          day1: day1.getFullYear() + "-" + (day1.getMonth() > 9 ? (day1.getMonth() + 1) : "0" + day1.getMonth()) + "-" + (day1.getDate() > 9 ? day1.getDate() : "0" + day1.getDate()),
          day2: day2.getFullYear() + "-" + (day2.getMonth() > 9 ? (day2.getMonth() + 1) : "0" + day2.getMonth()) + "-" + (day2.getDate() > 9 ? day2.getDate() : "0" + day2.getDate())
        });
      }
    },
    computed: {
      totalDay: function () {
        return (this.endDate.getTime() - this.startDate.getTime())/1000/60/60/24 + 1;
      },
      dateFormat1: function () {
        return dateFormatter(this.startDate);
      },
      dateFormat2: function () {
        return dateFormatter(this.endDate);
      },
      multipleDate: function () {
        return this.singleTime === 0;
      }
    },
    watch: {
      singleTime: function () {
        if (this.singleTime === 0) {
          this.endDate = new Date(this.startDate.getTime() + 24*60*60*1000*(this.minDay - 1));
        } else if (this.singleTime === 1 || this.singleTime === 2) {
          this.endDate = new Date(this.startDate.getTime() + 24*60*60*1000*364);
        }
        this.setDate(this.startDate, this.endDate);
      }
    },
    components: {
      Calendar
    }
  }
</script>

<style lang="less" scoped>
  .icon-arrow-right {
    position: absolute;
    right: 0.2rem;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 0.5rem;
    height: 0.5rem;
    background: url(/static/images/insurance/arrow-r.png) center no-repeat;
    background-size: contain;
  }
  .icon-leave,.icon-back {
    position: absolute;
    right: 1rem;
    background: url(/static/images/insurance/leave.png) no-repeat center;
    background-size: contain;
    height: 0.85rem;
    width: 1.84rem;
  }
  .icon-back {
    background: url(/static/images/insurance/back.png) no-repeat center;
    background-size: contain;
  }
  .icon-calendar {
    position: absolute;
    left: 0.5rem;
    top: 0;
    bottom: 0;
    margin: auto;
    background: url(/static/images/insurance/calendar.png) no-repeat center;
    background-size: contain;
    width: 1rem;
    height: 1rem;
  }
  .tabbar {
    font-size: 0;
    .tabbar-btn {
      display: inline-block;
      width: 50%;
      line-height: 2rem;
      text-align: center;
      font-size: 0.75rem;
      color: #999;
      &.active {
        border-bottom: 0.1rem solid #008BE4;
        color: #008BE4;
      }
    }
  }
  .single-time {
    font-size: 0;
    .date-show,.date-total {
      background-color: #fff;
      display: inline-block;
    }
    .date-show {
      position: relative;
      width: 44%;
      display: inline-block;
      padding: 0.4rem 0.2rem;
      padding-left: 2rem;
      border-right: 0.05rem solid #eee;
      box-sizing: border-box;
      background-color: #fff;
      p {
        line-height: 1rem;
        position: relative;
      }
    }
    .date-total {
      width: 12%;
      text-align: center;
      position: relative;
      vertical-align: top;
      span {
        line-height: 2.8rem;
      }
    }
  }
  .multiple-time {
    position: relative;
    background-color: #fff;
    padding: 0.4rem 2rem;
    padding-right: 1rem;
    .date-show {
      display: block;
    }
    .date-leave {
      font-size: 0.85rem;
    }
    .date-back {
      .icon-back {
        position: initial;
        display: inline-block;
        vertical-align: text-top;
        margin-left: 0.2rem;
      }
    }
    .icon-arrow-right {
      right: 0.5rem;
    }
  }
</style>
