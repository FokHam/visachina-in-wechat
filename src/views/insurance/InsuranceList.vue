<template>
  <div class="">
    <tabbar></tabbar>
    <h1>保险</h1>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  import Tabbar from './InsuranceList/Tabbar'

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
      Tabbar
    }
  }
</script>

<style lang="less" scoped>

</style>
