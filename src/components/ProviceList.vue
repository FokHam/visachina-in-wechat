<template>
<div class="provice-page">
  <div class="provice-list">
    <div class="tit">常住地选择</div>
    <div class="nowlocation"><span @click="chosepvc(nowlocation.name,nowlocation.area_id)">{{nowlocation.name}}</span><i @click="getProvinceList()">更新定位</i></div>
    <div class="pvc_list" v-if="provinceData.length != 0">
      <ul>
        <li v-for="item in provinceData" @click="chosepvc(item.name,item.area_id)">{{item.name}}</li>
      </ul>
    </div>
  </div>
  <div class="backshadow" @click="closePage"></div>
</div>
</template>

<script>
  export default{
    created:function(){
      this.getProvinceList()
    },
    data:function(){
      return{
        provinceData:[],
        nowlocation:""
      }
    },
    methods:{
      getProvinceList:function(){
        var url = '/visa/province'
        this.$http.get(url).then(function(result){
          var rst = JSON.parse(result.body)          
          if (rst.status == 1) {
            this.provinceData = rst.data
            for (var i = 0;i<rst.data.length;i++) {
              if (rst.data[i].checked == 1) {
                this.nowlocation = rst.data[i]
              }
            }
          }else {
            console.log(rst.msg)
          }
        }, function(result){
          console.log("请求失败")
        });
      },
      chosepvc:function(name,id){
        this.$emit('chosepvc',name,id)
      },
      closePage:function(){
        this.$emit('closePage')
      }
    }
  }
</script>

<style lang="less" scoped>
  .provice-page{position: fixed;height: 100%;width: 100%;z-index: 9999;top: 0;}
  .backshadow{
    position:absolute;height: 100%;width: 100%;
    top: 0;left: 0;background: rgba(0, 0, 0, 0.5);
  }
  .provice-list{
    overflow-y:scroll;
    overflow-scrolling: touch;-webkit-overflow-scrolling: touch;
    background: #fff;
    position: absolute;
    width: 180px;height:100%;top:0;right: 0;
    padding-left: 10px;
    z-index: 99;
    .tit{
      font-size: 0.8rem;text-indent: 20px;line-height: 35px;padding-top: 5px;border-bottom: 1px solid #f5f5f5;
    }
    .nowlocation{
      border-bottom: 1px solid #f5f5f5;
      padding: 5px 0 5px 20px;
      margin-bottom: 15px;    
      span{
        font-size: 0.6rem;line-height: 25px;
        background-color: #eeeeee;
        display: inline-block;
        background-image: url('/static/images/visa/icon-location-black.png');
        background-position: 5px center;
        background-size: 12px;
        background-repeat: no-repeat;
        padding: 0px 8px 0 22px;
        border-radius: 5px;
      }
      i{
        font-size: 0.6rem;line-height: 25px;
        display: inline-block;
        background-image: url('/static/images/visa/icon-fresh.png');
        background-position: 5px center;
        background-size: 12px;color: #999999;font-style: normal;
        background-repeat: no-repeat;
        padding-left:18px;margin-left: 5px;
      }
    }
    .pvc_list{
      li{
        line-height: 25px;border-bottom: 1px solid #f5f5f5;
        text-indent: 20px;margin-bottom: 5px;font-size: 0.6rem;
      }
    }
  }
</style>