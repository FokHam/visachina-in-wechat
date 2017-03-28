<template>
  <nav>
    <router-link v-for="item in list" v-bind:to="'/insurancelist/' + item.type">
      <div class="tabbar-btn">
        <img :src="item.imgPath" :alt="item.name">
        <p>{{ item.name }}</p>
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {
  data: function () {
    return {
      list: [
        {
          "name": "申根险",
          "imgPath": "/static/images/insurance/tab-sg.png",
          "type": 1
        },{
          "name": "境外险",
          "imgPath": "/static/images/insurance/tab-jw.png",
          "type": 2
        },{
          "name": "宝岛险",
          "imgPath": "/static/images/insurance/tab-bd.png",
          "type": 3
        }
      ]
    };
  }
}
</script>

<style lang="less" scoped>
  p,span,a{font-size: 0.7rem;}
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
      margin: auto;
    }
    p {
      margin-top: 0.2rem;
    }
  }
</style>
