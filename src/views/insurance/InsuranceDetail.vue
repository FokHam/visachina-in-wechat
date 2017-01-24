<template>
  <div class="isr-d-page">
    <detail-header
      :isrDetail="insuranceDetail"
    ></detail-header>
    <detail-content
      :isrDetail="insuranceDetail"
      :ageSelect="ageSelect"
      :withAge="true"
      @changeAge="changeAge"
    ></detail-content>
    <detail-datepicker
      :type="type"
      :date1="startDate"
      :date2="endDate"
      :minDay="minDay"
    ></detail-datepicker>
    <detail-create
      :isrDetail="insuranceDetail"
    ></detail-create>
  </div>
</template>

<script>
  import DetailHeader from "./InsuranceDetail/DetailHeader"
  import DetailContent from "./InsuranceDetail/DetailContent"
  import DetailDatepicker from "./InsuranceDetail/DetailDatepicker"
  import DetailCreate from "./InsuranceDetail/DetailCreate"
  import { Indicator } from 'mint-ui'

  export default {
    data: function () {
      let d = new Date(),
          minDay = 3,
          startDate = new Date(),
          type = 0;
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      startDate.setMilliseconds(0);
      let endDate = new Date(startDate.getTime() + 24*60*60*1000*(minDay - 1));

      return {
        type: type, // 0单次，1一年多次，2一年一次
        minDay: minDay,
        startDate: startDate,
        endDate: endDate,
        totalDay: "",
        insuranceDetail: {},
        ageSelect: 0
      }
    },
    components: {
      DetailHeader,
      DetailContent,
      DetailDatepicker,
      DetailCreate
    },
    computed: {
      totalDay: function () {
        return (startDate.getTime() - endDate.getTime())/24/60/60/1000;
      }
    },
    created () {
      let url = "/api/insurance/info";
      let send = { id: this.$route.params.id };
      Indicator.open('拼命读取保险数据中...');
      this.$http.get(url, { params: send }).then((response) => {
        console.log(JSON.parse(response.body));
        let body = JSON.parse(response.body);
        if (body.status === 1) {
          this.insuranceDetail = body.data;
          Indicator.close();
        } else {
          console.log("服务器错误");
          Indicator.close();
        }
      })
    },
    methods: {
      changeAge (n) {
        this.ageSelect = n;
      }
    }
  }
</script>

<style>
</style>
