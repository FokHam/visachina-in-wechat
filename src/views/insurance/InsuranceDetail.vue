<template>
  <div class="isr-d-page">
    <detail-header></detail-header>
    <detail-content></detail-content>
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
      var d = new Date(),
          minDay = 5,
          startDate = new Date(),
          endDate = new Date(startDate.getTime() + 24*60*60*1000*(minDay - 1)),
          type = 0;

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
