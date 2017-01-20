<template>
<div class="add-credential">
  <div class="tabs">
    <ul>
      <li><span :class="{on:c_type==0}" @click="switchTab(0)">公司</span></li>
      <li><span :class="{on:c_type==1}" @click="switchTab(1)">个人</span></li>
    </ul>
  </div>
  <div class="field" v-show="c_type==0">
    <div class="item">
      <span>抬头</span>
      <div class="ipt">
        <input type="text" v-model="clientinfo.company" placeholder="公司名称">
      </div>      
    </div>
    <div class="item">
      <span>纳税人识别号</span>
      <div class="ipt">
        <input type="text" v-model="clientinfo.code" placeholder="仅增值税发票填写">
      </div>      
    </div>
  </div>
  <div class="field" v-show="c_type==1">
    <div class="item">
      <span>抬头</span>
      <div class="ipt">
        <input type="text" v-model="clientinfo.name" placeholder="个人姓名">
      </div>      
    </div>    
  </div>
  <div class="save" @click="submit">保存</div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  props: ['info'],
  created:function(){
    if (this.info != "") {
      this.clientinfo = this.info
      this.c_type = this.info.type
    }
  },
  data:function(){
    return{
      clientinfo:{"name":"","company":"","code":"","type":0},
      c_type:0      
    }
  },
  methods:{
    switchTab:function(v){
      if (this.info == '') {
        this.c_type = v
      }
    },
    submit:function(){
      this.$emit('submit')    
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
    line-height: 35px;margin: 50px 10px 25px;
    text-align: center;background-color: #008be4;
    border-radius: 4px;
  }
 
}
</style>