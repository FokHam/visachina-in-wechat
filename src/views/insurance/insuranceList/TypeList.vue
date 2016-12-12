<template>
  <nav>
    <div v-for="item in list" class="tabbar-btn">
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
      list: [
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

<style lang="less" scoped>
   nav {
     margin: 1rem 0.5rem;
     text-align: center;
   }
  .tabbar-btn {
    display: inline-block;
    width: 33.3%;
    font-size: 0.7rem;
    img {
      width: 55%;
    }
    p {
      margin-top: 0.2rem;
    }
  }
</style>
