<template>
<div class="add-credential">
  <div class="tabs">
    <ul>
      <li><span :class="{on:clientinfo.type==1}" @click="switchTab(1)">公司</span></li>
      <li><span :class="{on:clientinfo.type==2}" @click="switchTab(2)">个人</span></li>
    </ul>
  </div>
  <div class="field" v-show="clientinfo.type==1">
    <div class="item">
      <span>抬头</span>
      <div class="ipt">
        <input type="text" v-model="clientinfo.name" placeholder="公司名称">
      </div>      
    </div>
    <div class="item">
      <span>纳税人识别号</span>
      <div class="ipt">
        <input type="text" v-model="clientinfo.number" placeholder="仅增值税发票填写">
      </div>      
    </div>
  </div>
  <div class="field" v-show="clientinfo.type==2">
    <div class="item">
      <span>抬头</span>
      <div class="ipt">
        <input type="text" v-model="clientinfo.name" placeholder="个人姓名">
      </div>      
    </div>    
  </div>
  <div class="save" @click="verifyData">保存</div>
  <div class="delete" @click="remove" v-if="clientinfo.id">删除</div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  props: ['info'],
  created:function(){
    if (this.info != "") {
      this.clientinfo = this.info
    }
  },
  data:function(){
    return{
      clientinfo:{"name":"","number":"","type":1}           
    }
  },
  methods:{
    switchTab:function(v){
      if (this.info == '') {
        this.clientinfo.type = v
      }
    },
    verifyData:function(){
      if (this.clientinfo.type==1) {
        if (this.clientinfo.name != '' && this.clientinfo.number != '') {
          this.submitData()
        }else{
          Toast('请完善资料后再保存')
        }
      }else if (this.clientinfo.type==2) {
        if (this.clientinfo.name != '') {
          this.submitData()
        }else{
          Toast('请完善资料后再保存')
        }
      }
    },
    submitData:function(){
      var url = '/api/member/invoice-create',send=this.clientinfo;      
      this.$http.get(url,{params:send}).then(function(result){
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.$emit('submit','credential')
        }else {
          Toast(rst.msg)
        }
      });        
    },
    remove:function(){
      MessageBox.confirm('确定删除?').then(action => {
        var url = '/api/member/invoice-delete?id='+this.clientinfo.id        
        this.$http.get(url).then(function(result){
          this.$emit('submit','credential')
          var rst = result.body
          if (rst.status == 0) {
            console.log(rst.msg)
          }
        });
      }); 
    }    
  }
}
</script>

<style lang="less" scoped>
.add-credential{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: #F6F6F6;
  .tabs{
    overflow: hidden;
    li{
      width: 50%;float: left;text-align: center;
      span{
        display: inline-block;
        font-size: 0.7rem;
        line-height: 40px;
        height: 38px;
        padding: 0 15px;
        border-bottom: 2px solid #f6f6f6;
        &.on{
          color: #008BE4;
          border-bottom: 2px solid #008BE4;
        }
      }
    }
  }
  .field{
    margin: 0 10px;
    background-color: #fff;
    background-image: url('/static/images/visa/borderbg.png');
    background-repeat:repeat-x ;background-position:bottom;
    background-size: 10px;
    padding: 0 10px 30px;
    .item{
      position: relative;
      height: 60px;
      border-bottom: 1px solid #EEEEEE;
      .ipt{
        padding: 0 20px 0 90px;        
        background-repeat:no-repeat;background-position:right center;
        background-size: 16px;
        input{
          height: 60px;border: none;background: #fff;width: 100%;
          font-size: 0.7rem;color: #666666;text-align: right;
        }
        &.select{background-image: url('/static/images/visa/icon-right.png');}
        .txt{
          height: 60px;
          line-height: 60px;
          text-align: right;
          font-size: 0.7rem;
          color: #666666;
        }
        &.street{
          padding: 30px 20px 0 0;
          input{
            text-align: left;
          }
        }
      }
      .idipt{
        position: absolute;
        bottom: 0;
        height: 20px;width: 200px;
        input{
          height: 20px;display: block;width: 200px;
          border: none;font-size: 12px;
        }
      }
      span{
        font-size: 0.7rem;
        height: 60px;line-height: 60px;
        position: absolute;
        left: 0;top: 0;width: 90px;
      }
      &:last-child{border-bottom: none;}
    }
  }
  .save{
    font-size: 0.8rem;color: #fff;
    line-height: 35px;margin: 50px 10px 15px;
    text-align: center;background-color: #008be4;
    border-radius: 4px;
  }
  .delete{
    font-size: 0.8rem;color: #fff;
    line-height: 35px;margin: 0 10px 25px;
    text-align: center;background-color: #F95800;
    border-radius: 4px;
  }
 
}
</style>