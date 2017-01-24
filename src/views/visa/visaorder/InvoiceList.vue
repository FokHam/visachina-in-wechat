<template>
<div class="contact-list" id="apply-list">
  <div class="contactList">
    <ul v-if="contactList.length != 0">
      <li v-for="(item,index) in contactList">
        <div class="checkbtn" :class="{check:item.check}" @click="checkOne(index)"></div>
        <div class="info">
          <div class="name"><span class="left">{{item.name}}</span><span class="right">{{item.number}}</span></div>
          
        </div>
      </li>
    </ul>
    <div v-else class="empty">暂无常用地址</div>
  </div>
  <div class="confirm" @click="confirm">确定</div>
</div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  created: function () {
     this.getPassenger()
  },
  data:function(){
    return{
      contactList:[],
      chooseItem:{"check":false,"name":"","number":""}
    }
  },
  methods:{
    getPassenger:function(){
      var url = '/api/member/invoice'
      this.$http.get(url).then(function(result){
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          for (var i=0;i<rst.data.length;i++) {
            rst.data[i].check = false
          }
          this.contactList = rst.data
        }else {
          console.log(rst.msg)
        }
      });
    },
    checkOne:function(n){
      for (var i=0; i<this.contactList.length; i++) {
        if (i==n) {          
          if (this.contactList[i].check == false) {
            this.contactList[i].check = true
            this.chooseItem = this.contactList[i] 
          }else {
            this.contactList[i].check = false
            this.chooseItem = {"check":false,"name":"","number":""}
          }          
        }else{
          this.contactList[i].check = false
        }
      }                          
    },
    confirm:function(){
      this.$emit('confirm',this.chooseItem)
    }
  }
}
</script>

<style lang="less" scoped>
.contact-list{
  background-color: #F6F6F6;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  .contactList{
    margin: 0 10px;
    background-color: #fff;
    padding-bottom: 30px;
    background-image: url('/static/images/visa/borderbg.png');
    background-repeat:repeat-x ;background-position:bottom;
    background-size: 10px;
    .empty{    text-align: center;
    line-height: 80px;
    font-size: 0.7rem;
    color: #666666;}
    ul{      
      padding: 5px 10px;
      li{
        border-bottom: 1px solid #c0c0c0;padding: 9px 0 10px;
        position: relative;
        .checkbtn{          
          height: 13px;width: 13px;border: 2px solid #999999;
          border-radius: 2px;position: absolute;
          top: 15px;left: 0;
          &.check{
            border: 2px solid #008BE4;
            background-color: #008BE4;
            background-image: url('/static/images/visa/icon-check.png');
            background-repeat: no-repeat;background-position: center;
            background-size: 12px;
          }
        }
        .info{
          padding:0 30px;
          .name{font-size: 0.7rem;color: #666666;line-height: 30px;overflow: hidden;
            .left{float: left;}
            .right{float: right;}
          }
          .txt{
            span{font-size: 0.6rem;color: #666666;display: block;}
          }
        }
        .editbtn{
          height: 15px;width: 15px;
          border-radius: 2px;position: absolute;
          top: 15px;right: 0;
          background-image: url('/static/images/visa/icon-edit.png');
          background-repeat: no-repeat;background-position: center;
          background-size: 15px;
        }
        &:last-child{ border-bottom:none;}     
      }
    }
  }
  .confirm{
    font-size: 0.8rem;color: #fff;
    line-height: 35px;margin: 25px 10px;
    text-align: center;background-color: #008be4;
    border-radius: 4px;
  }
}
</style>