<template>
  <div class="create-order">
    <p class="total">保费：<span class="price">¥222</span></p>
    <router-link
      @click="goCreateOrder"
      class="button"
      :to="'/insuranceCreateOrder/' + $route.params.id">
    立即投保</router-link>
  </div>
</template>

<script>
  export default {
    methods: {
      goCreateOrder () {
        this.$emit("goCreateOrder");
      }
    }
  }
</script>

<style lang="less" scoped>
  .create-order {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    .total, .button {
      flex: 1;
      line-height: 2.5rem;
      text-align: center;
    }
    .total {
      background: #fff;
      font-size: 0.8rem;
      .price {
        font-size: 0.8rem;
        color: #fc4949;
      }
    }
    .button {
      flex: 1 1 20%;
      background-color: #008ce4;
      color: #fff;
      font-size: 0.85rem;
    }
  }
</style>
