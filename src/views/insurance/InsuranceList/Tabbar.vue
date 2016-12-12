<template>
  <nav>
    <div v-for="item in typeList" class="tabbar-btn">
      <img :src="item.imgPath" :alt="item.name">
      <p>{{ item.name }}</p>
    </div>
  </nav>
</template>

<script>
import $ from "jquery"
export default {
  data: function () {
    return {
      typeList: [
        {
          "name": "申根险",
          "imgPath": "/static/images/insurance/tab-sg.png"
        },{
          "name": "境外险",
          "imgPath": "/static/images/insurance/tab-jw.png"
        },{
          "name": "宝岛险",
          "imgPath": "/static/images/insurance/tab-tw.png"
        }
      ]
    };
  }
}
</script>

<style language="less" scoped>
  .tabbar-btn {
    display: inline-block;
  }
</style>
