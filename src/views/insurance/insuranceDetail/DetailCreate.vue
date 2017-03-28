<template>
  <div class="create-order">
    <p class="total">保费：<span class="price">¥{{ isrDetail.price }}</span></p>
    <router-link
      @click="goCreateOrder"
      class="button"
      :to="'/insuranceCreateOrder/' + $route.params.id">
    立即投保</router-link>
  </div>
</template>

<script>
  export default {
    props: [
      "isrDetail"
    ],
    methods: {
      goCreateOrder () {
        this.$emit("goCreateOrder");
      }
    }
  }
</script>

<style lang="less" scoped>
  p,span,a{font-size: 0.7rem;}
  .create-order {
    position: fixed;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .total, .button {
      line-height: 2.5rem;
      text-align: center;
    }
    .total {
      width: 45%;
      float: left;
      background: #fff;
      font-size: 0.8rem;
      .price {
        font-size: 0.8rem;
        color: #fc4949;
      }
    }
    .button {
      width: 55%;
      float: left;
      background-color: #008ce4;
      color: #fff;
      font-size: 0.85rem;
    }
  }
</style>
