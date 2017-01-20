<template>
  <div class="picker-com">
    <div class="backshadow" @click="close"></div>
    <div class="pickform">
      <div class="confirm" @click="confirm">完成</div>
      <mt-picker :slots="typeList" @change="onTypeChange"></mt-picker>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['listdata'],
    data: function(){
      return {
        typeList:[
        {
          values: this.listdata,
          textAlign: 'center'
        }],
        nowchoose:""
      }
    },
    methods:{
      onTypeChange:function(picker, values){
        this.nowchoose = values.toString()
      },
      confirm:function(){
        this.$emit('confirm',this.nowchoose)
      },
      close:function(){
        this.$emit('close')
      }
    }
  }
</script>

<style lang="less" scoped>
  .picker-com{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    z-index: 1001;
    .backshadow{
      background-color: rgba(0,0,0,0.5);
      position: absolute;
      width: 100%;
      height:100%;
      top: 0;
    }
    .pickform{
      position: absolute;
      width: 100%;
      bottom: 0;
      background-color: #fff;
      .confirm{
        line-height: 2rem;
        font-size: 0.7rem;
        padding: 0 1rem;
        text-align: right;
        border-bottom:1px solid #eee;
        color: #16A5EF;
      }
    }
    .mint-popup-bottom{width: 100%;}
  }
</style>
