<template>
<div class="counter-com">
  <div class="counter-list">
    <div class="item" v-for="(item,index) in listData" :class="{selected:chooseitem==index}" @click="chooseitem=index,chooseAdrs=item.name,chooseAdrsid=item.out_id">
      <p>【{{item.name}}】{{item.address}}</p>
      <p>营业时间：{{item.office_hours}}</p>
    </div>
  </div>
  <div class="confirmbtn" @click="comfirm">确定</div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default{
  props:['type','cityid'],
  created:function(){
    const _this = this;
    var state = {  
      title: document.title,
      url: document.location.href  
    };  
    window.history.pushState(state,document.title, document.location.href);
    window.addEventListener("popstate", function(e) {  
      _this.$emit('close');
    }, false);
    this.getCounterList()       
  },
  data:function(){
    return{
      chooseitem:-1,
      chooseAdrs:'',
      chooseAdrsid:'',
      listData:[]
    }
  },
  methods:{
    comfirm:function(){
      if (this.chooseitem == -1 && this.chooseAdrs=="") {
        Toast('请选择一个服务点')
        return false
      }
      this.$emit('comfirm',this.chooseAdrs,this.chooseAdrsid)
    },    
    getCounterList:function(){
      var url = '/api/wifi/places',send = {cid:this.cityid,act:this.type}
      this.$http.get(url,{params:send}).then(function(result){
        console.log(result.body)
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.listData = rst.data
        }else {
          console.log(rst.msg)
        }
      });
    }
  }
  
}
</script>

<style lang="less" scoped>
.counter-com{
  position: fixed;height: 100%;width: 100%;
  top: 0;left:0;background-color: #ececec;
  overflow-y: scroll;
  .counter-list{    
    .item{
      background-color: #fff;padding: 15px 15px 10px 45px;
      margin-bottom: 10px;background-image: url('/static/images/wifi/icon-uncheck.png');
      background-size: 22px;background-repeat: no-repeat;background-position:15px 19px;
      p{margin-bottom: 5px;line-height: 20px;font-size: 0.6rem;}
      &.selected{background-image: url('/static/images/wifi/icon-check.png')}
    }
  }
  .confirmbtn{
    line-height: 40px;text-align: center;
    color: #fff;font-size: 0.8rem;margin: 25px 16px;
    background-color: #008be4;border-radius: 5px;

  }
}
</style>