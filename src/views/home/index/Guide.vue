<template>
  <div class="guide" @click="close()">
    <div class="pic" :style="{'width':guideWidth+'px','bottom':guideBottom+'px'}">
      <img src="/static/images/home/guide.png">
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return{
        guideWidth:window.screen.width-60,
        guideBottom:window.screen.height*0.2,
      }
    },
    methods:{
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="less" scoped>
  .guide{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    .pic {
      position: absolute;
      left: 0;
    }
  }
</style>