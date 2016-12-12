<template>
  <div>
    <type-list></type-list>
    <hot-list></hot-list>
  </div>
</template>

<script>
  import Mock from "mockjs"
  import TypeList from "./insuranceList/TypeList"
  import HotList from "./insuranceList/HotList"

  export default {
    data: function () {
      var isrList = Mock.mock({
        "data": {
          "list|1-10": [{
            "id|+1": 1,
            "image": Mock.Random.image()
          }]
        }
      });
      console.log(isrList);
      return isrList;
    },
    components: {
      TypeList: TypeList,
      HotList
    }
  }
</script>

<style lang="less" scoped>

</style>
