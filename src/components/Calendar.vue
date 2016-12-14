<template>
  <div class="calendar-wrapper">
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
      <div class="month">
        <p class="year-month">
          2016年12月
        </p>
        <div class="day" v-for="n in 4"><span></span></div>
        <div class="day" v-for="n in 30" v-bind:class="[{ selected: n === 15 }, { active: (n >= 15) && (n <= 21) }]">
          <span class="num">{{ n }}<i class="mask"></i></span>
          <span class="mark" v-if="n === 15">起保</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created: function () {

  },
  data: function(){
    return {

    }
  },
  methods:{

  }
}
</script>

<style lang="less" scoped>
  .calendar-wrapper {
    display: block;
    overflow-y: scroll;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .calendar {
      width: 100%;
      background: #fff;
      .week-day-list {
        background: #fff;
        display: flex;
        span {
          flex: 1;
          text-align: center;
          line-height: 2rem;
        }
        .weekend {
          color: #008ae2;
        }
      }
      .month {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.5rem;
        .year-month {
          flex: 1 1 100%;
          text-align: center;
          font-size: 0.8rem;
          line-height: 1.5rem;
        }
        .day {
          flex: 1;
          position: relative;
          background: #fff;
          line-height: 2rem;
          flex: 0 0 14.28%;
          text-align: center;
          padding-bottom: 0.7rem;
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
            bottom: 0;
            left: 0;
            right: 0;
            line-height: 1;
            color: #008be1;
          }
          &.active .num {
            color: #fff;
          }
          &.selected .num {
            width: 1.8rem;
            background: #008be0;
            border-radius: 50%;
            color: #fff;
          }
          &.active .num .mask {
            content: "";
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 10;
            background: #008be0;
            top: 0;
            left: 0;
            z-index: -5;
          }
          &.selected.active .num .mask {
            width: 1.8rem;
            left: 0.9rem;
          }
          &.selected.active .num .mask {
            width: 1.8rem;
            left: 0.9rem;
          }
        }
      }
    }
  }
</style>
