<template>
  <div>
    <type-list></type-list>
    <hot-list
      :hotInsuranceList="hotInsuranceList"
    ></hot-list>
  </div>
</template>

<script>
  import TypeList from "./insuranceIndex/TypeList"
  import HotList from "./insuranceIndex/HotList"

  export default {
    data () {
      return {
        hotInsuranceList: []
      };
    },
    created () {
      let url = "/insurance/home";
      this.$http.get(url).then((response) => {
        let body = JSON.parse(response.body);
        if (body.status === 1) {
          this.hotInsuranceList = body.data.rows;
        } else {
          console.log("服务器错误");
        }
      },(response) => {

      });
    },
    components: {
      TypeList,
      HotList
    }
  }
</script>

<style lang="less" scoped>

</style>
