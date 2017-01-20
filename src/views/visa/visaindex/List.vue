<template>
<div class="visalist">
  <ul v-if="listdata.length != 0"
  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="0">
    <li v-for="item in listdata"><router-link :to="'/visaDetail/'+item.id">
      <div class="visapic">
        <img :src="item.pic" onerror="javascript:this.src='/static/images/visa/defaultpic.png';">
      </div>
      <div class="visainfo">
        <div class="tit">{{item.name}}</div>
        <div class="type">
          <span class="p" v-show="item.visatype == 0">贴纸签</span>
          <span class="e" v-show="item.visatype == 1">电子签</span>
          <span class="op" v-show="item.visatype == 2">另纸签</span>
        </div>
        <div class="day-price">
          <span class="day">受理天数：{{item.acceptancedays}}天</span>
          <span class="price"><i>￥</i>{{item.lower_price}}</span>
        </div>
      </div>
    </router-link></li>
  </ul>
  <div class="empty" v-else>
    暂无相关数据
  </div>
</div>
</template>

<script>
import { Loadmore } from 'mint-ui';

export default {
  props: ['listdata'],
  created:function(){

  },
  data:function(){
    return{
      listData:this.listdata,
      page:0
    }
  },
  methods: {
    loadMore:function(){
      this.page += 1
      console.log(this.page)
    }
  }
   
}
</script>

<style lang="less" scoped>

</style>