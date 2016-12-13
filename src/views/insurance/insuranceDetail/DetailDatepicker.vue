<template>
  <div class="datepicker">
    <div class="tabbar">
      <span class="tabbar-btn" :class="{ active:singleTime == 1 }" @click="singleTime = 1">单次</span>
      <span class="tabbar-btn" :class="{ active:singleTime == 0 }" @click="singleTime = 0">一年多次</span>
    </div>
    <div class="single-time" v-if="singleTime == 1">
      <div class="date-show">
        <i class="icon-calendar"></i>
        <p>12月01日 <i class="icon-leave"></i></p>
        <p>2016年 星期三</p>
        <i class="icon-arrow-right"></i>
      </div>
      <div class="date-show">
        <i class="icon-calendar"></i>
        <p>12月01日 <i class="icon-back"></i></p>
        <p>2016年 星期三</p>
        <i class="icon-arrow-right"></i>
      </div>
      <div class="date-total">
        <span>6天</span>
      </div>
    </div>
    <div class="multiple-time" v-if="singleTime == 0">
      <div class="date-show">
        <i class="icon-calendar"></i>
        <p class="date-leave">2016年12月01日 星期三</p>
        <p class="date-back">2017年12月01日 星期三<i class="icon-back"></i></p>
        <i class="icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        singleTime: 0
      }
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
      font-size: 0.8rem;
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
