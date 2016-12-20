<template>
  <div class="isr-d-page">
    <detail-header></detail-header>
    <detail-content
      :withAge="true"
    ></detail-content>
    <detail-datepicker
      :type="type"
      :date1="startDate"
      :date2="endDate"
      :minDay="minDay"
    ></detail-datepicker>
    <detail-create></detail-create>
  </div>
</template>

<script>
  import DetailHeader from "./InsuranceDetail/DetailHeader"
  import DetailContent from "./InsuranceDetail/DetailContent"
  import DetailDatepicker from "./InsuranceDetail/DetailDatepicker"
  import DetailCreate from "./InsuranceDetail/DetailCreate"

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
        totalDay: ""
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
    }
  }
</script>

<style>
</style>
