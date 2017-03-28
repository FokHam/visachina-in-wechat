<template>
  <div class="message">
    <div class="close" @click="closePage()"></div>
    <div class="text"><div>{{text}}</div></div>
  </div>
</template>

<script>
  export default{
    props:['text'],
    methods:{
      closePage () {
        this.$emit('close')
      }
    }  
  }
</script>

<style lang="less" scoped>
  .message{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-image: url('/static/images/common/opacity-80.png');
    .close{
      height:1.5rem;
      width: 1.5rem;
      background-image: url('/static/images/common/icon-close.png');
      background-repeat: no-repeat;
      background-size: 1.5rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -0.75rem;
      margin-top: -2.5rem;
    }
    .text{
      position: absolute;
      top: 50%;
      width: 100%;
      div{
        padding: 0 1rem;
        color: #fff;
        font-size: .7rem;
        line-height: 1.5rem;
        text-align: center;
      }
    }
  }
</style>