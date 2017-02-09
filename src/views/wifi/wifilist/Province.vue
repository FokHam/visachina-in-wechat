<template>
<div class="wifi-country">
  <div class="backshadow" v-show="isShow" @click="closePage"></div>
  <div class="list-bd" :class="{active:isShow}">
    <div class="inner">
      <div class="continent">
        <ul>
          <li v-for="(item,index) in listData" :class="{on:cstype == index}" @click="cstype=index">{{item.type}}</li>
        </ul>
      </div>
      <div class="country_list">
        <div class="item_list" v-for="(item,index) in listData" v-show="cstype == index">
          <ul>
            <li v-for="(province,index) in item.list" :class="{on:csItem == province.name}" @click="choseGetType(province.name)">{{province.name}}</li>
          </ul>
        </div>        
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {  
  props:['isShow'],
  created: function () {
  },
  data:function(){
    return{
      keyword:'',
      cstype:0,
      csItem:'',
      listData:[
        {"type":"自取城市","list":[
            {"name":"北京"},{"name":"天津"},{"name":"河北"},{"name":"山西"},{"name":"内蒙古"},{"name":"辽宁"},{"name":"吉林"},{"name":"黑龙江"},{"name":"上海"},{"name":"江苏"},{"name":"浙江"},{"name":"安徽"},{"name":"福建"},{"name":"江西"},{"name":"山东"},{"name":"河南"},{"name":"湖北"},{"name":"湖南"},{"name":"广东"},{"name":"宁夏"},{"name":"新疆"},{"name":"香港"},{"name":"澳门"}
          ]
        }/*,
        {"type":"快递取还","list":[
            {"name":"快递取还"}
          ]
        }*/
      ]
      

    }
  },
  methods:{    
    closePage:function(){
      this.$emit('closePage')
    },
    choseGetType:function(name){
      this.csItem = name
      this.$emit('choseGetType',name)
    }
  }
}
</script>

<style lang="less" scoped>
.wifi-country{
  
  .backshadow{
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;height: 100%;width: 100%;top: 0;
  }
  .list-bd{
    position: fixed;bottom: -280px;left: 0;
    width: 100%;height: 280px;
    background-color: #fff;
    transition: ease-in-out .3s;
    &.active{bottom: 0;}
    .inner{position: relative;width: 100%;height: 280px;}
    .continent{
      position: absolute;left: 0;top: 0;
      background-color: #f6f6f6;
      width: 110px;height: 100%;
      li{
        height: 40px;line-height: 40px;font-size: 0.7rem;
        text-indent: 10px;
        &.on{
          background-color: #fff;
          background-image: url('/static/images/wifi/icon-pot.png');
          background-position: right center;
          background-size: 16px;
          background-repeat: no-repeat;
        }
      }

    }
    .country_list{
      padding-left: 110px;height: 280px;overflow-y: scroll;padding-right: 7px;
      .item_list{
        li{
          line-height: 38px;font-size: 12px;text-indent: 20px;
          border-bottom: 1px solid #f4f4f4;
          background-image: url('/static/images/wifi/icon-unchoose.png');
          background-position: right center;
          background-size: 20px;
          background-repeat: no-repeat;
          &.on{background-image: url('/static/images/wifi/icon-choose.png');}
        }
      }
    }
  }
}
</style>