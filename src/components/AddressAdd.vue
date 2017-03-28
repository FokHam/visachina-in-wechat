<template>
<div class="add-address">
  <div class="field">
    <div class="item">
      <span>联系人</span>
      <div class="ipt">
        <input type="text" v-model="clientinfo.name"  maxlength="5">
      </div>      
    </div>
    <div class="item">
      <span>手机号</span>
      <div class="ipt">
        <input type="tel" v-model="clientinfo.phone" maxlength="11">
      </div>      
    </div>    
    <div class="item">
      <span>所在地区</span>
      <div class="ipt select" @click="addressDis=true">
        <div class="txt">{{clientinfo.province +' '+clientinfo.city+' '+clientinfo.zone}}</div>
      </div> 
    </div>
    <div class="item">
      <span>详细地址</span>
      <div class="ipt street">
        <input type="text" v-model="clientinfo.address" placeholder="街道、楼牌号等" maxlength="30">
      </div>      
    </div>
  </div>
  <div class="save" @click="verifyData">保存</div>
  <address-picker
  v-if="addressDis"
  @confirm="confirmAddress"
  @close="closeAddress">
  </address-picker>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import AddressPicker from './AddressPicker'
export default {
  props: ['info'],
  created:function(){
    if (this.info != "") {
      this.clientinfo = this.info
    }
  },
  data:function(){
    return{
      clientinfo:{"name":"","phone":"","province":"","city":"","zone":"","address":""},
      addressDis:false
    }
  },
  components:{
    AddressPicker
  },
  methods:{
    confirmAddress:function(v){
      this.clientinfo.province = v[0]
      this.clientinfo.city = v[1]
      this.clientinfo.zone = v[2]
      this.addressDis = false
    },
    closeAddress:function(){
      this.addressDis = false
    },
    verifyData:function(){ 
      var reg_phone = /^1(3|4|5|7|8)\d{9}$/; 
      if (this.clientinfo.name != '' && this.clientinfo.phone != '' && this.clientinfo.province != '' && this.clientinfo.address != '') {
        if(!reg_phone.test(this.clientinfo.phone)){
          Toast('手机号格式有误')
        }else{
          this.submitData()          
        }
      }else{
        Toast('请完善资料后再保存')
      }      
    },
    submitData:function(){
      var url = '/api/member/address_create',send=this.clientinfo;      
      this.$http.get(url,{params:send}).then(function(result){
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.$emit('submit')
        }else {
          Toast(rst.msg)
        }
      });        
    }
    
  }
}
</script>

<style lang="less" scoped>
.add-address{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: #F6F6F6;
  .field{
    margin: 0 0.5rem;
    background-color: #fff;
    background-image: url('/static/images/visa/borderbg.png');
    background-repeat:repeat-x ;background-position:bottom;
    background-size: 0.5rem;
    padding: 0 0.5rem 1.5rem;
    .item{
      position: relative;
      height: 3rem;
      border-bottom: 1px solid #EEEEEE;
      .ipt{
        padding: 0 1rem 0 3.5rem;        
        background-repeat:no-repeat;background-position:right center;
        background-size: 0.8rem;
        input{
          height: 3rem;border: none;background: #fff;width: 100%;
          font-size: 0.7rem;color: #666666;text-align: right;
        }
        &.select{background-image: url('/static/images/visa/icon-right.png');}
        .txt{
          height: 3rem;
          line-height: 3rem;
          text-align: right;
          font-size: 0.7rem;
          color: #666666;
        }
        &.street{
          padding: 1.5rem 1rem 0 0;
          input{
            text-align: left;
          }
        }
      }
      .idipt{
        position: absolute;
        bottom: 0;
        height: 1rem;width: 10rem;
        input{
          height: 1rem;display: block;width: 10rem;
          border: none;font-size: 0.6rem;
        }
      }
      span{
        font-size: 0.7rem;
        height: 2.25rem;line-height: 3rem;
        position: absolute;
        left: 0;top: 0;width: 3.5rem;
      }
      &:last-child{border-bottom: none;}
    }
  }
  .save{
    font-size: 0.8rem;color: #fff;
    line-height: 1.75rem;margin: 2.5rem 0.5rem 1.25rem;
    text-align: center;background-color: #008be4;
    border-radius: 0.2rem;
  }
  .mint-popup-bottom{width: 100%;}
  .closepop{
    font-size: 0.7rem;line-height: 30px;border-bottom: 1px solid #ccc;
    padding: 0 0.5rem;color: #008BE4;text-align: right;
  }
}
</style>