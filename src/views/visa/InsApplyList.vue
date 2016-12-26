<template>
<div class="apply-list" id="apply-list">
  <div class="contactList">
    <ul v-if="applyData.length != 0">
      <li v-for="(item,index) in applyData">
        <div class="checkbtn" :class="{check:item.icheck}" @click="checkOne(index)"></div>
        <div class="info">
          <div class="name">{{item.name}}</div>
          <div class="txt"><span>身份证：{{item.idnum}}</span></div>
        </div>
        <router-link class="editbtn" :to="'/InsApplyEdit/'+index"></router-link>
      </li>
    </ul>
    <div v-else class="empty">请先添加签证申请人</div>
  </div>
  <div class="confirm" @click="confirm">确定</div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  name:'apply-list',
  beforeCreate:function(){
    document.title = "保险申请人"
    Indicator.open('加载中...');
  },
  created: function () {
    Indicator.close();  
  },
  data:function(){
    return{
      applyData:this.$store.state.visa.insMenber
    }
  },
  methods:{
    checkOne:function(n){
      this.applyData[n].icheck = !this.applyData[n].icheck      
    },
    confirm:function(){      
      history.go(-1)
    },
    setData:function(){
      var scrData = []
      for (var i=0; i<this.applyData.length; i++) {
        if (this.applyData[i].icheck == true) {
          scrData.push(this.applyData[i])
        }
      }
      this.$store.commit('visaOrder_insChoose_set',scrData) 
    }
  }
}
</script>

<style lang="less" scoped>
.apply-list{
  .tips{
    background: -webkit-linear-gradient(left, #F057AD, #BF69EF);
    color: #FFE6EB;text-align: center;
    line-height: 30px;font-size: 0.6rem;
  }
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
          .name{font-size: 0.7rem;color: #666666;line-height: 30px;}
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