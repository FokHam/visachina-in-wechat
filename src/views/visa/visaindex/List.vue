<template>
<ul v-if="listdata.length != 0">
  <li v-for="item in listdata"><router-link :to="'/visaDetail/'+itemid">
    <div class="visapic">
      <img :src="item.pic" onerror="javascript:this.src='/static/images/visa/defaultpic.png';">
    </div>
    <div class="visainfo">
      <div class="tit">{{item.name}} <停留天数{{item.staydays}}，有效
期限{{item.effective}}，{{item.interview}}></div>
      <div class="type">
        <span class="p" v-show="item.visatype == 0">贴纸签</span>
        <span class="e" v-show="item.visatype == 1">电子签</span>
        <span class="op" v-show="item.visatype == 2">另纸签</span>
      </div>
      <div class="day-price">
        <span class="day">受理天数：{{item.processdays}}</span>
        <span class="price"><i>￥</i>{{item.price}}</span>
      </div>
    </div>
  </router-link></li>
</ul>
<div class="empty" v-else>
  没有数据
</div>
</template>

<script>

export default {
  props: ['listdata'],
  data:function(){
    return{
      itemid:'12525'
    }
  },
  methods: {
    
  }
   
}
</script>

<style lang="less" scoped>
ul{  
  li{
    position: relative;
    padding:10px;
    background-color: #fff;
    margin-bottom: 10px;
    .visapic{
      width: 4rem;
      position: absolute;
      left: 10px;top: 10px;
    }
    .visainfo{
      padding-left: 4.5rem;
      .tit{
        font-size: 0.7rem;
        text-align: justify;
      }
      .type{
        padding: 5px 0 15px;
        span{
          font-size: 0.6rem;
          border: 1px solid;
          padding:1px 5px;
          border-radius: 2px;
          &.p{color: #008BE4;border-color: #008BE4;}
          &.e{color: #D44D00;border-color: #D44D00;}
          &.op{color: #8e00d5;border-color: #8e00d5;}
        }
      }
      .day-price{
        overflow: hidden;
        .day{font-size: 0.6rem;color: #333333;float: left;}
        .price{
          float: right;
          font-size: 0.8rem;color: #F55600;
          i{font-size: 0.6rem;font-style: normal;}
        }
      }
    }
  }
}
</style>