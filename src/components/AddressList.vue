<template>
<div class="contact-list" id="apply-list">
  <div class="addbtn" @click="address.display=true">添加地址</div>
  <div class="contactList">
    <ul v-if="addressList != ''">
      <li v-for="(item,index) in addressList">
        <div class="info" @click="confirm(item)">
          <div class="name"><span class="left">{{item.name}}</span><span class="right">{{item.phone}}</span></div>
          <div class="txt"><span>{{item.province+item.city+item.zone+item.address}}</span></div>
        </div>
        <div class="editbtn" @click="address.display=true,address.data=item"></div>
      </li>
    </ul>
    <div v-else class="empty">暂无常用地址</div>
  </div>
  <address-add 
  v-if="address.display"
  :info="address.data"
  @submit="closeComponents">
  </address-add>
</div>
</template>

<script>
import AddressAdd from './AddressAdd'
import { Toast } from 'mint-ui'
export default {
  created: function () {
    const _this = this;
    var state = {  
      title: document.title,
      url: document.location.href  
    };  
    window.history.pushState(state,document.title, document.location.href);
    window.addEventListener("popstate", function(e) {  
      _this.$emit('close');
    }, false);
    this.getAddress()
  },
  data:function(){
    return{
      addressList:'',
      address:{"display":false,"data":""},
    }
  },
  methods:{
    getAddress:function(){
      var url = '/api/member/address'
      this.$http.get(url).then(function(result){
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          if (rst.data) {
            this.addressList = rst.data
          }else{
            this.addressList = ''
          }
        }else {
          console.log(rst.msg)
        }
      });
    },    
    confirm:function(item){
      this.$emit('confirm',item)
    },
    closeComponents:function(){
      this.getAddress()
      this.address = {"display":false,"data":""}
    }
  },
  components:{
    AddressAdd
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
  .addbtn{
    height: 45px;line-height: 45px;display: block;
    padding: 0 20px;background-color: #fff;
    background-image:url('/static/images/visa/icon-add-1.png');
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 21px;
    font-size: 0.7rem;color: #008be4;text-indent: 27px;
    margin-bottom: 10px;
  }
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
        .info{
          padding:0 30px 0 10px;
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
          top: 18px;right: 0;
          background-image: url('/static/images/visa/icon-edit.png');
          background-repeat: no-repeat;background-position: center;
          background-size: 15px;
        }
        &:last-child{ border-bottom:none;}     
      }
    }
  }
}
</style>