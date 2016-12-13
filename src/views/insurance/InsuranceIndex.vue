<template>
  <div>
    <type-list></type-list>
    <hot-list></hot-list>
  </div>
</template>

<script>
  import Mock from "mockjs"
  import TypeList from "./insuranceIndex/TypeList"
  import HotList from "./insuranceIndex/HotList"

  export default {
    components: {
      TypeList,
      HotList
    }
  }
</script>

<style lang="less" scoped>

</style>
