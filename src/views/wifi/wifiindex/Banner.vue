<template>
  <div class="banner">
    <img src="/static/images/wifi/banner.png" width="100%">
    <div class="inner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in pics"><router-link :to="item.link"><img :src="item.img_url"></router-link></mt-swipe-item>        
      </mt-swipe>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pics'],
  data: function(){
    return {
      isactive: 0
    }
  }
}
</script>

<style lang="less" scoped>
  .banner{position: relative;margin-bottom: 6px;}
  .banner .inner{position: absolute;height: 100%;width: 100%;left: 0;top: 0;}
  .mint-swipe img{width: 100%;}
</style>
