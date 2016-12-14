<template>
  <div class="create-order">
    <p class="total">保费：<span class="price">¥222</span></p>
    <span class="button">立即投保</span>
  </div>
</template>

<script>
  export default {
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
