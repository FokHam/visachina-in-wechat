<template>
  <div class="datepicker" @click="trial">
    <calendar
      v-if="pickingDate"
      v-on:confirm="setDate"
      type1="起保"
      type2="终保"
      :multipleDate="multipleDate"
      :pickType ="pickingType"
      :minDay="minDay"
      :maxDay="maxDay"
      :day1="startDate"
      :day2="endDate"
      :dayDelay="1"
      ></calendar>
    <div class="tabbar">
      <span class="tabbar-btn"
        :class="{ active: selectType === 0, fullWidth: !multiple && !annual}"
        @click="selectType = 0;">
        单次
      </span>
      <span class="tabbar-btn"
        v-if="multiple || annual"
        :class="{ active: selectType === 1 || selectType === 2 }"
        @click="selectType = 1;">
        {{ annualMulti ? "一年多次" : "一年一次" }}
        <i class="icon-arrow-down"
          v-if="multiple"
          @click.stop="changingAnnual = true"
          ></i>
      </span>
      <span class="tabbar-more"
        v-if="changingAnnual"
        @click="changeAnnual">
        {{ annualMulti ? "一年一次" : "一年多次" }}
      </span>
    </div>
    <div class="single-time"
      v-if="selectType === 0">
      <div class="date-show"
        @click="pickingDate = 1; pickingType = 1">
        <i class="icon-calendar"></i>
        <p>{{ (startDate.getMonth() + 1) + "月" + startDate.getDate() + "日" }} <i class="icon-leave"></i></p>
        <p>{{ startDate.getFullYear() + "年 星期" + weekDay[startDate.getDay()] }}</p>
        <i class="icon-arrow-right"></i>
      </div>
      <div class="date-show"
        @click="pickingDate = 1; pickingType = 2">
        <i class="icon-calendar"></i>
        <p>{{ (endDate.getMonth() + 1) + "月" + endDate.getDate() + "日" }} <i class="icon-back"></i></p>
        <p>{{ endDate.getFullYear() + "年 星期" + weekDay[endDate.getDay()] }}</p>
        <i class="icon-arrow-right"></i>
      </div>
      <div class="date-total">
        <span>{{ totalDay + "天" }}</span>
      </div>
    </div>
    <div class="multiple-time"
      v-if="selectType === 1 || selectType === 2">
      <div class="date-show"
        @click="pickingDate = 1; pickingType = 1">
        <i class="icon-calendar"></i>
        <p class="date-leave">{{ startDate.getFullYear() + "年" + (startDate.getMonth() + 1) + "月" + startDate.getDate() + "日 星期" + weekDay[startDate.getDay()] }}</p>
        <p class="date-back">{{ endDate.getFullYear() + "年" + (endDate.getMonth() + 1) + "月" + endDate.getDate() + "日 星期" + weekDay[endDate.getDay()] }}<i class="icon-back"></i></p>
        <i class="icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import Calendar from "../../../components/Calendar.vue";

  export default {
    props: [
      "ageSelect"
    ],
    data: function () {
      return {
        weekDay: ["日", "一", "二", "三", "四", "五", "六"],
        selectType: 0,
        pickingDate: false,
        changingAnnual: false,
        annualMulti: true
      }
    },
    methods: {
      setDate: function (day1, day2) {
        this.pickingDate = false;
        this.$store.commit("setInsuranceDate", {
          day1: day1,
          day2: day2
        });
      },
      changeAnnual () {
        this.annualMulti = !this.annualMulti;
        this.changingAnnual = false;
      },
      trial () {
        let url = "/api/insurance/trial";
        let send = {
          id: this.$route.params.id,
          birthday: this.birthdayList[this.ageSelect].birthday,
          startDate: this.startDate.format("yyyy-MM-dd"),
          endDate: new Date(this.endDate.getTime() + 24*3600000).format("yyyy-MM-dd"), //试算时结束日期需加一天
          insureType: this.selectType ? (this.annualMulti ? 4 : 3) : 0
        };
        console.log(send);
        this.$http.get(url, {params: send}).then((response) => {
          console.log(JSON.parse(response.body));
          let respMsg = JSON.parse(response.body);
          if (respMsg.status === 1 ) {
            this.$store.commit("setInsurancePrice", respMsg.data);
          }
        }, (response) => {
          console.log("服务器错误");
        });
      }
    },
    computed: {
      totalDay () {
        return (this.endDate.getTime() - this.startDate.getTime())/1000/60/60/24 + 1;
      },
      multipleDate () {
        return this.selectType === 0;
      },
      startDate () {
        return this.$store.state.insurance.startDate;
      },
      endDate () {
        return this.$store.state.insurance.endDate;
      },
      minDay () {
        switch (this.selectType) {
          case 0:
            return this.$store.state.insurance.productDetail.min_day;
            break;
          case 1:
          case 2:
            return 365;
            break;
        }
      },
      maxDay () {
        switch (this.selectType) {
          case 0:
            return this.$store.state.insurance.productDetail.max_day;
            break;
          case 1:
          case 2:
            return 365;
            break;
        }
      },
      annual () {
        return this.$store.state.insurance.productDetail.web_one_frequency;
      },
      multiple () {
        return this.$store.state.insurance.productDetail.web_many_frequency;
      },
      birthdayList () {
        return this.$store.state.insurance.productDetail.age;
      }
    },
    watch: {
      selectType () {
        switch (this.selectType) {
          case 0:
            this.$store.commit("setInsuranceEndDate", {
              endDate: new Date(this.startDate.getTime() + 24*60*60*1000*(this.minDay - 1))
            });
            break;
          case 1:
          case 2:
            this.$store.commit("setInsuranceEndDate", {
              endDate: new Date(this.startDate.getTime() + 24*60*60*1000*364)
            });
            break;
        }
      }
    },
    components: {
      Calendar
    }
  }
</script>

<style lang="less" scoped>
  .icon-arrow-down {
    position: absolute;
    right: 0.5rem;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 0.5rem;
    height: 0.5rem;
    background: url(/static/images/insurance/arrow-d.png) center no-repeat;
    background-size: contain;
  }
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
    position: relative;
    font-size: 0;
    .tabbar-btn {
      display: inline-block;
      position: relative;
      width: 50%;
      line-height: 2rem;
      text-align: center;
      font-size: 0.75rem;
      color: #999;
      &.active {
        border-bottom: 0.1rem solid #008BE4;
        color: #008BE4;
      }
      &.fullWidth {
        width: 100%;
      }
    }
    .tabbar-more {
      position: absolute;
      width: 50%;
      right: 0;
      top: 2rem;
      background: #fff;
      color: #000;
      z-index: 10;
      text-align: center;
      line-height: 2rem;
      border: 0.05rem solid #eee;
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
