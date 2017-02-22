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
    height: 2.25rem;line-height: 2.25rem;display: block;
    padding: 0 1rem;background-color: #fff;
    background-image:url('/static/images/visa/icon-add-1.png');
    background-repeat: no-repeat;
    background-position: 1rem center;
    background-size: 0.95rem;
    font-size: 0.7rem;color: #008be4;text-indent: 1.35rem;
    margin-bottom: 0.5rem;
  }
  .contactList{
    margin: 0 0.5rem;
    background-color: #fff;
    padding-bottom: 1.5rem;
    background-image: url('/static/images/visa/borderbg.png');
    background-repeat:repeat-x ;background-position:bottom;
    background-size: 0.5rem;
    .empty{    
    text-align: center;
    line-height: 4rem;
    font-size: 0.7rem;
    color: #666666;}
    ul{      
      padding: 0.25rem 0.5rem;
      li{
        border-bottom: 1px solid #c0c0c0;padding: 0.45rem 0 0.5rem;
        position: relative;        
        .info{
          padding:0 1.5rem 0 0.5rem;
          .name{font-size: 0.7rem;color: #666666;line-height: 1.5rem;overflow: hidden;
            .left{float: left;}
            .right{float: right;}
          }
          .txt{
            span{font-size: 0.6rem;color: #666666;display: block;}
          }
        }
        .editbtn{
          height: 0.75rem;width: 0.75rem;
          border-radius: 0.1rem;position: absolute;
          top: 0.8rem;right: 0;
          background-image: url('/static/images/visa/icon-edit.png');
          background-repeat: no-repeat;background-position: center;
          background-size: 0.75rem;
        }
        &:last-child{ border-bottom:none;}     
      }
    }
  }
}
</style>