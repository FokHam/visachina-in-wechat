<template>
  <div class="calendar-wrapper">
    <div @click="confirm" class="confirm-btn">确定按钮</div>
    <div class="type-selecter">
      <div @click="selectType = 1" :class="{ active: selectType ===1 }" class="type-box">
        <p class="title">{{ type1 + "日期" }}</p>
        <p class="selected-date">{{ selectedDate[0] }}</p>
      </div>
      <div @click="selectType = 2" :class="{ active: selectType ===2 }" class="type-box">
        <p class="title">{{ type2 + "日期" }}</p>
        <p class="selected-date">{{ selectedDate[1] }}</p>
      </div>
    </div>
    <div class="calendar">
      <div class="week-day-list">
        <span class="weekend">日</span>
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span class="weekend">六</span>
      </div>
      <div class="month"
        v-for="item in monthList">
        <p class="year-month">
          {{ item.year + "年" + (item.month + 1) + "月"}}
        </p>
        <div class="day" v-for="n in item.firstDay"><span></span></div>
        <div class="day"
          v-for="n in item.days"
          :class="[
            { expired: isExpiredDay(item.year, item.month, n, true) },
            { selected: (selected[0].date===n) && (selected[0].month===item.month) && (selected[0].year===item.year) },
            { active: isActiveDay(item.year, item.month, n) },
            { last: (selected[1].date===n) && (selected[1].month===item.month) && (selected[1].year===item.year) }]"
          @click="selectDate(item.year, item.month, n)"
          >
          <span class="num">{{ n }}</span>
          <i class="mask"></i>
          <span class="mark" v-if="(selected[0].date===n) && (selected[0].month===item.month) && (selected[0].year===item.year)">{{ type1 }}</span>
          <span class="mark" v-if="(selected[1].date===n) && (selected[1].month===item.month) && (selected[1].year===item.year)">{{ type2 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const getFisrtdayAndLastday = function (year, month) {
  let firstDay = new Date(year, month, 1),
      lastDay = new Date(year, month + 1, 0);
  return {
    firstDay: firstDay,
    lastDay: lastDay
  }
}
const weekDay = ["日", "一", "二", "三", "四", "五", "六"];
const now = new Date();
export default {
  props: {
    multiple: Boolean,
    minDay: Number,
    day1: {
      type: Object,
      default: function () {
        return {
          year: now.getFullYear(),
          month: now.getMonth(),
          date: now.getDate()
        };
      }
    },
    day2: Object,
    type1: {
      type: String,
      default: "第一个"
    },
    type2: {
      type: String,
      default: "第二个"
    }
  },
  created: function () {

  },
  data: function(){
    let now = new Date(),
        month = now.getMonth(),
        year = now.getFullYear(),
        monthList = [],
        i;
    for (i = 0; i < 3; i += 1) {
      let m = {
        year: year,
        month: month,
        firstDay: getFisrtdayAndLastday(year, month).firstDay.getDay(),
        days: getFisrtdayAndLastday(year, month).lastDay.getDate()
      }
      monthList.push(m);
      if (month === 11) {
        month = 0;
        year += 1;
      } else {
        month += 1;
      }
    }
    return {
      selectType: 1,
      monthList: monthList,
      selected: [
        {
          year: this.day1.year,
          month: this.day1.month,
          date: this.day1.date
        },
        {
          year: this.day2.year,
          month: this.day2.month,
          date: this.day2.date
        }]
    }
  },
  methods:{
    isActiveDay: function (year, month, date) {
      if (this.selected.length !== 2) { return false }
      var theDate = new Date(year, month, date),
          startDate = new Date(this.selected[0].year, this.selected[0].month, this.selected[0].date),
          endDate = new Date(this.selected[1].year, this.selected[1].month, this.selected[1].date);
      if ((theDate.getTime() >= startDate.getTime()) && (theDate.getTime() <= endDate.getTime())) {
        return true;
      }
    },
    isExpiredDay: function (year, month, date, calCalendar) {
      var today = new Date(),
          theDay = new Date(year, month, (this.selectType === 1) || calCalendar ? date : date - (this.minDay - 1), 23, 59, 59, 999);
      if (today.getTime() > theDay.getTime()) {
        return true;
      }
    },
    selectDate: function (year, month, date) {
      if (this.isExpiredDay(year, month, date)) { return false; }
      if (this.selectType === 2 ) {
        this.selected[1].year = year,
        this.selected[1].month = month,
        this.selected[1].date = date
      } else {
        this.selected[0].year = year,
        this.selected[0].month = month,
        this.selected[0].date = date
      }
      if ((this.selectType === 1) && (this.selectedDate[2].getTime() > (this.selectedDate[3].getTime() - 24*60*60*1000*(this.minDay - 1)))) {
        var day = new Date(this.selected[0].year, this.selected[0].month, this.selected[0].date + (this.minDay - 1));
        this.selected[1].year = day.getFullYear();
        this.selected[1].month = day.getMonth();
        this.selected[1].date = day.getDate();
      } else if ((this.selectType === 2) && (this.selectedDate[2].getTime() > (this.selectedDate[3].getTime() - 24*60*60*1000*(this.minDay - 1)))) {
        var day = new Date(this.selected[1].year, this.selected[1].month, this.selected[1].date - (this.minDay - 1));
        this.selected[0].year = day.getFullYear();
        this.selected[0].month = day.getMonth();
        this.selected[0].date = day.getDate();
      }
    },
    confirm: function () {
      
    }
  },
  computed: {
    selectedDate: function () {
      var d1 = new Date(this.selected[0].year, this.selected[0].month, this.selected[0].date),
          d2 = new Date(this.selected[1].year, this.selected[1].month, this.selected[1].date);
      return [
        this.selected[0].year + "年" + (this.selected[0].month + 1) + "月" + this.selected[0].date + "日 星期" + weekDay[d1.getDay()],
        this.selected[1] ? this.selected[1].year + "年" + (this.selected[1].month + 1) + "月" + this.selected[1].date + "日 星期" + weekDay[d2.getDay()] : "",
        new Date(this.selected[0].year, this.selected[0].month, this.selected[0].date),
        this.selected[1] ? new Date(this.selected[1].year, this.selected[1].month, this.selected[1].date) : ""
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .confirm-btn {
    position: fixed;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    text-align: center;
    font-size: 2rem;
  }
  .calendar-wrapper {
    padding-top: 2.5rem;
    display: block;
    overflow-y: scroll;
    position: fixed;
    background-color: #fff;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .type-selecter {
      display: flex;
      .type-box {
        text-align: center;
        flex: 1;
        .title {
          color: #008BE4;
          font-size: 0.75rem;
          margin: 0.2rem 0;
        }
        .selected-date {
          color: #666;
          font-size: 0.6rem;
          margin-bottom: 0.2rem;
        }
        &.active {
          border-bottom: 0.1rem solid #008be0;
        }
      }
    }
    .calendar {
      width: 100%;
      .week-day-list {
        background: #fff;
        display: flex;
        span {
          flex: 1;
          text-align: center;
          line-height: 2rem;
        }
        .weekend {
          color: #008be0;
        }
      }
      .month {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.5rem;
        .year-month {
          flex: 1 1 100%;
          margin-bottom: 0.5rem;
          text-align: center;
          font-size: 0.8rem;
          line-height: 1.5rem;
        }
        .day {
          flex: 1;
          position: relative;
          background: #fff;
          flex: 0 0 14.28%;
          text-align: center;
          padding-bottom: 1rem;
          overflow: hidden;
          .num {
            position: relative;
            line-height: 1.8rem;
            width: 100%;
            display: inline-block;
            z-index: 10;
          }
          .mark {
            position: absolute;
            font-size: 0.6rem;
            bottom: 0.2rem;
            left: 0;
            right: 0;
            line-height: 1;
            color: #008be0;
          }
          &.expired .num{
            color: #999;
          }
          &.active .num {
            color: #666;
          }
          &.active .mask {
            content: "";
            position: absolute;
            height: 1.66rem;
            width: 100%;
            z-index: 10;
            background: #9DD1F4;
            top: 0.07rem;
            left: 0;
            z-index: 0;
          }
          &.selected .num, &.last .num {
            width: 1.8rem;
            background: #008be0;
            border-radius: 50%;
            color: #fff;
          }
          &.selected.active .mask {
            left: 50%;
          }
          &.last.active .mask {
            left: -50%;
          }
        }
      }
    }
  }
</style>
