<template>
  <div class="calendar-wrapper">
    <div @click="confirm" class="qdan">确定</div>
    <div class="type-selecter">
      <div @click="selectType = 1" :class="{ active: selectType === 1 }" class="type-box">
        <p class="title">{{ type1 + "日期" }}</p>
        <p class="selected-date">{{ dateFormat[0] }}</p>
      </div>
      <div v-if="multipleDate" @click="selectType = 2" :class="{ active: selectType === 2 }" class="type-box">
        <p class="title">{{ type2 + "日期" }}</p>
        <p class="selected-date">{{ dateFormat[1] }}</p>
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
            { first: isSelectedDay(item.year, item.month, n) },
            { active: isActiveDay(item.year, item.month, n) },
            { last: isLastDay(item.year, item.month, n) }]"
          @click="changeDate(item.year, item.month, n)">
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
  const weekDay = ["日", "一", "二", "三", "四", "五", "六"];
  const now = new Date();

  import Vue from 'vue'
  import { mapState } from 'vuex'

  export default {
    props: {
      dayDelay: Number,
      multipleDate: Boolean, //单个或多个日期
      minDay: Number,        //最小日期
      maxDay: Number,        //最大日期
      day1: {                //第一个已选日期
        type: Date,
        default: function () {
          return this.dayDelay ? now : new Date(now.getTime() + 24 * 3600 * this.dayDelay);
        }
      },
      day2: Date,             //第二个已选日期
      type1: {                //第一个日期的类型名
        type: String,
        default: "第一个"
      },
      type2: {                //第二个日期的类型名
        type: String,
        default: "第二个"
      },
      pickType: Number        //选择第几个日期
    },
    data: function(){
      let now = new Date(),
          month = now.getMonth(),
          year = now.getFullYear(),
          monthList = [],
          i;
      for (i = 0; i < 15; i += 1) {
        let m = {
          year: year,
          month: month,
          firstDay: (new Date(year, month, 1)).getDay(),
          days: (new Date(year, month + 1, 0)).getDate()
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
        selectType: this.pickType,
        monthList: monthList,
        selected: [ this.day1, this.day2 ]
      }
    },
    methods:{
      isSelectedDay: function (year, month, date) {
        var theDate = new Date(year, month, date);
        if (theDate.getTime() === this.startDate.getTime()) {
          return true;
        }
      },
      isLastDay: function (year, month, date) {
        var theDate = new Date(year, month, date);
        if (theDate.getTime() === this.endDate.getTime()) {
          return true;
        }
      },
      isActiveDay: function (year, month, date) {
        if (this.dateFormat[0] === this.dateFormat[1]) {
          return false;
        }
        if (this.selected.length !== 2 || !this.multipleDate) { return false }
        var theDate = new Date(year, month, date);
        if ((theDate.getTime() >= this.startDate.getTime()) && (theDate.getTime() <= this.endDate.getTime())) {
          return true;
        }
      },
      isExpiredDay: function (year, month, date, calCalendar) {
        var today = new Date(),
            theDay = new Date(year, month, (this.selectType === 1) || calCalendar ? date : date - (this.minDay - 1), 23, 59, 59, 999);
        if (this.dayDelay) {
          today = new Date(today.getTime() + 24 * 3600 * 1000 * this.dayDelay);
        }
        if (today.getTime() > theDay.getTime()) {
          return true;
        }
      },
      changeDate: function (year, month, date) { //选择日期逻辑
        if (this.isExpiredDay(year, month, date)) { return false; }
        if (this.selectType === 2 ) {
          Vue.set(this.selected, 1, new Date(year, month, date));
        } else {
          Vue.set(this.selected, 0, new Date(year, month, date));
        }
        if ((this.selected[0].getTime() >= (this.selected[1].getTime() - 24*60*60*1000*(this.minDay - 1)))) {
          if (this.selectType === 1) {
            var day = new Date(this.selected[0].getFullYear(), this.selected[0].getMonth(), this.selected[0].getDate() + (this.minDay - 1));
            this.selected[1] = day;
          } else if (this.selectType === 2) {
            var day = new Date(this.selected[1].getFullYear(), this.selected[1].getMonth(), this.selected[1].getDate() - (this.minDay - 1));
            this.selected[0] = day;
          }
        } else if (this.maxDay && (this.selected[1].getTime() >= (this.selected[0].getTime() + 24*60*60*1000*(this.maxDay - 1)))) {
          if (this.selectType === 1) {
            var day = new Date(this.selected[0].getFullYear(), this.selected[0].getMonth(), this.selected[0].getDate() + (this.maxDay - 1));
            this.selected[1] = day;
          } else if (this.selectType === 2) {
            var day = new Date(this.selected[1].getFullYear(), this.selected[1].getMonth(), this.selected[1].getDate() - (this.maxDay - 1));
            this.selected[0] = day;
          }
        }
        if (this.selectType === 1 && this.multipleDate) {
          this.selectType = 2;
        }
      },
      confirm: function () {
        this.$emit("confirm", this.selected[0], this.selected[1]);
      }
    },
    computed: {
      dateFormat () {
        var d1 = this.selected[0],
            d2 = this.selected[1],
            dateFormatter = function (d) {
              if (d) {
                return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 星期" + weekDay[d.getDay()];
              }
            };
        return [
          dateFormatter(d1),
          dateFormatter(d2)
        ];
      },
      count () {
        return this.$store.state.insurance.count;
      },
      startDate () {
        return this.selected[0];
      },
      endDate () {
        return this.selected[1];
      }
    }
  }
</script>

<style lang="less" scoped>
  .qdan {
    position: fixed;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    text-align: center;
    font-size: 1rem;
    padding: 0.5rem 0;
    border-radius: 0.1rem;
    border: 0.02rem solid #008be0;
    color: #008be0;
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
          background-color: #008be0;
          border-bottom: 0.1rem solid #008be0;
          p {
            color: #fff;
          }
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
          &.first .num, &.last .num {
            width: 1.8rem;
            background: #008be0;
            border-radius: 50%;
            color: #fff;
          }
          &.first.active .mask {
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
