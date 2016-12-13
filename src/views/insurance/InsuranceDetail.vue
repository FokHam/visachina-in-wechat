<template>
  <div class="">
    <detail-header></detail-header>
    <detail-content></detail-content>
    <detail-datepicker></detail-datepicker>
  </div>
</template>

<script>
  import DetailHeader from "./InsuranceDetail/DetailHeader"
  import DetailContent from "./InsuranceDetail/DetailContent"
  import DetailDatepicker from "./InsuranceDetail/DetailDatepicker"

  export default {
    components: {
      DetailHeader,
      DetailContent,
      DetailDatepicker
    }
  }
</script>

<style>
</style>
