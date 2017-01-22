<template>
<div class="screen-page">
  <div class="screen-list">
    <div class="item">
      <div class="tit">加急</div>
      <div class="list fast">
        <span v-for="item in screenStr.fw" :class="{on:item.data==visaCondition.fw}" @click="visaCondition.fw=item.data">{{item.text}}</span>
      </div>
    </div>
    <div class="item">
      <div class="tit">签证类别</div>
      <div class="list type">
        <ul>
          <li v-for="(item,index) in screenStr.type" :class="{on:index==visaCondition.lx}" @click="visaCondition.lx=index">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="item">
      <div class="tit">入境期限</div>
      <div class="list date">
        <ul>
          <li v-for="item in screenStr.rj" :class="{on:item.data==visaCondition.rj}" @click="visaCondition.rj=item.data">{{item.text}}</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="backshadow" @click="closePage"></div>
</div>
</template>

<script>
  export default{
    props:['condition','typeStr'],
    data:function(){
      return{
        screenStr:this.typeStr,
        visaCondition:this.condition,
        fast:0,
        type:0,
        date:0
      }
    },
    methods:{
      closePage:function(){
        this.$emit('closePage')
      },
      scrClick:function(type,v){
        if (type == 'fast') {
          this.fast = v
        }else if (type == 'type') {
          this.type = v
        }else {
          this.date = v
        }
        this.chosescr()
      }
    },
    watch:{
      visaCondition:{
        handler: function (obj) {
          this.$emit('chosescr',obj)
        },
        deep: true
      }
    }
  }
</script>

<style lang="less" scoped>
  .screen-page{position: fixed;height: 100%;width: 100%;z-index: 9999;top: 0;}
  .backshadow{
    position:absolute;height: 100%;width: 100%;
    top: 0;left: 0;background: rgba(0, 0, 0, 0.5);
  }
  .screen-list{
    overflow-y:scroll;
    overflow-scrolling: touch;-webkit-overflow-scrolling: touch;
    background: #fff;
    position: absolute;
    width: 9.75rem;height:100%;top:0;right: 0;
    padding-left: 15px;
    z-index: 99;
    .item{
      .tit{
        font-size: 0.7rem;line-height: 25px;
        color: #999999;padding-top: 10px;
      }
      .fast{
        span{
          display: inline-block;
          font-size: 0.6rem;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          background-image:url('/static/images/visa/icon-light.png');
          background-position: left center;
          background-size: 0.5rem;
          background-repeat: no-repeat;
          line-height: 1rem;
          &.on{
            background-image:url('/static/images/visa/icon-light-on.png');
            color: #008BE4;
          }
        }
      }
      .type{
        margin-top: 8px;
        overflow: hidden;
        li{
          float: left;width: 4rem;margin-right: 0.75rem;
          line-height: 1.25rem;border-radius: 3px;text-align: center;
          border: 1px solid #666666;font-size: 0.6rem;
          margin-bottom: 0.4rem;
          &.on{
            border: 1px solid #008BE4;color: #008BE4;
            background-color: #f2faff;
          }
        }
      }
      .date{
        li{
          text-indent: 0.75rem;
          font-size: 0.6rem;line-height: 1.5rem;
          border-left: 2px solid #fff;
          &.on{
            background-color: #f2faff;
            color: #008BE4;border-left: 2px solid #008BE4;
          }
        }
      }
    }
  }
</style>
