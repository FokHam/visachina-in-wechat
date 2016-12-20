<template>
<div class="screen-page" v-if="isShow">
  <div class="screen-list">
    <div class="item">
      <div class="tit">加急</div>
      <div class="list fast">
        <span :class="{on:fast == 0}" @click="scrClick('fast',0)">全部</span>
        <span :class="{on:fast == 1}"  @click="scrClick('fast',1)">加急</span>
      </div>
    </div>
    <div class="item">
      <div class="tit">签证类别</div>
      <div class="list type">
        <ul>
          <li :class="{on:type == 0}" @click="scrClick('type',0)">全部类别</li>
          <li :class="{on:type == 1}" @click="scrClick('type',1)">旅游签证</li>
          <li :class="{on:type == 2}" @click="scrClick('type',2)">商务签证</li>
          <li :class="{on:type == 3}" @click="scrClick('type',3)">留学签证</li>
          <li :class="{on:type == 4}" @click="scrClick('type',4)">探亲签证</li>
          <li :class="{on:type == 5}" @click="scrClick('type',5)">工作签证</li>
          <li :class="{on:type == 6}" @click="scrClick('type',6)">其他签证</li>
        </ul>
      </div>
    </div>
    <div class="item">
      <div class="tit">入境期限</div>
      <div class="list date">
        <ul>
          <li :class="{on:date == 0}" @click="scrClick('date',0)">全部</li>
          <li :class="{on:date == 1}" @click="scrClick('date',1)">单次入境</li>
          <li :class="{on:date == 2}" @click="scrClick('date',2)">多次入境</li>
          <li :class="{on:date == 3}" @click="scrClick('date',3)">领馆定</li>
        </ul>
      </div>
    </div>    
  </div>
  <div class="backshadow" @click="closePage"></div>
</div>
</template>

<script>
  export default{
    props:['isShow'],
    data:function(){
      return{
        fast:0,
        type:0,
        date:0
      }
    },
    methods:{
      chosescr:function(){
        this.$emit('chosescr',this.fast,this.type,this.date)
      },
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
    width: 175px;height:100%;top:0;right: 0;
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
          padding-left: 15px;
          padding-right: 15px;
          background-image:url('/static/images/visa/icon-light.png');
          background-position: left center;
          background-size: 10px;
          background-repeat: no-repeat;
          line-height: 20px;
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
          float: left;width: 70px;margin-right: 15px;
          line-height: 25px;border-radius: 3px;text-align: center;
          border: 1px solid #666666;font-size: 0.6rem;
          margin-bottom: 8px;
          &.on{
            border: 1px solid #008BE4;color: #008BE4;
            background-color: #f2faff;
          }
        }
      }
      .date{
        li{
          text-indent: 15px;
          font-size: 0.6rem;line-height: 28px;
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