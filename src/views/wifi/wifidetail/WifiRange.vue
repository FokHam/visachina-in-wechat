<template>
  <div class="wifi-range">
    <div class="backbg"></div>
    <div class="dialog">
      <div class="tit"><span>适用地点</span></div>
      <div class="list">
        <span v-for="(item,index) in countryData">
            {{item}}{{countryData.length!=index+1?'、':''}}
        </span>
      </div>
      <div class="btn" @click="close()">我知道了</div>
    </div>    
  </div>
</template>

<script>
  export default{
    props:['countryData'],
    methods:{
      close () {
        this.$emit('close');
      }
    }
  }
</script>

<style lang="less" scoped>
  .wifi-range{
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 10001;
    .backbg{
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }
    .dialog {
      position: absolute;
      height: 13.5rem;
      width: 100%;
      top: 50%;
      margin-top: -6.5rem;
      .tit{
        margin: 0 .8rem;
        background-color: #fff;
        padding: 0 0.5rem;
        span{
          display: inline-block;
          font-size: .7rem;
          line-height: 2rem;
          background-image: url(/static/images/wifi/icon-location-tit.png);
          background-repeat: no-repeat;
          background-position: 100%;
          background-size: .7rem;
          padding-right: 20px;
        }
      }
      .list{
        background: #fff;
        margin: 0 .8rem;
        height: 9rem;
        overflow-y: scroll;
        padding: 0 0.5rem;
        font-size: 0.6rem;
        border-bottom: 0.5rem solid #fff;
        overflow-y:scroll;
        overflow-scrolling: touch;-webkit-overflow-scrolling: touch;
        span {
          font-size: 0.6rem;
          line-height: 1rem;
        }
      }
      .btn{
        margin: 0 .8rem;
        background-color: #dbdbdb;
        color: #008be3;
        font-size: 0.7rem;
        line-height: 2rem;
        text-align: center;
      }
    }
  }
</style>