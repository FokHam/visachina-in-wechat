<template>
  <div class="banner" v-if="bannerpics != ''">
    <img src="/static/images/home/banner.png" width="100%">
    <div class="inner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in bannerpics">
          <router-link :to="item.link"><img :src="item.img_url"></router-link>
        </mt-swipe-item>        
      </mt-swipe>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.getHomeBanner()
  },
  data () {
    return {
      bannerpics:''
    }
  },
  methods:{
    getHomeBanner () {
      var url = "/api/home/banner"
      this.$http.get(url).then(function(result){
        var rst = JSON.parse(result.body)
        console.log(result.body)
        if (rst.status == 1) {
          this.bannerpics = rst.data.rows
        }else {
          console.log(rst.msg)
        }
      });
    }
  } 
}
</script>

<style lang="less" scoped>
  .banner{position: relative;margin-bottom: 6px;}
  .banner .inner{position: absolute;height: 100%;width: 100%;left: 0;top: 0;}
  .mint-swipe img{width: 100%;}
</style>
