<template>
<div class="apply-list" id="apply-list">
  <div class="tips">最多可选择10个申请人</div>
  <div class="addbtn" @click="editItem.content='',editItem.editdis=true">添加申请人</div>
  <div class="contactList">
    <ul v-if="passengerList.length != 0">
      <li v-for="(item,index) in passengerList">
        <div class="checkbtn" :class="{check:item.check}" @click="checkOne(index)"></div>
        <div class="info">
          <div class="name">{{item.surname+item.name}}</div>
          <div class="txt"><span>{{item.visa_type==null?'请选择客户类型':typeList[item.visa_type-1]}}</span></div>
        </div>
        <div class="editbtn" @click="editItem.content=item,editItem.editdis=true"></div>
      </li>
    </ul>
    <div v-else class="empty">暂无常用联系人</div>
  </div>
  <div class="confirm" @click="confirm">确定</div>
  <visa-passenger-edit
  v-if="editItem.editdis"
  :passenger="editItem.content"
  @confirm="editPassenger"
  @close="closePassenger">
  </visa-passenger-edit>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import VisaPassengerEdit from './VisaPassengerEdit'
export default {
  created: function () {
    const _this = this;    
    window.addEventListener("popstate", function(e) {  
      _this.$emit('close');
    }, false);
    this.getPassenger()
  },
  components:{
    VisaPassengerEdit
  },
  data:function(){
    return{
      typeList:['在职','自由职业','在校学生','退休人员','学龄前儿童','家庭主妇'],
      editItem:{"editdis":false,"content":""},
      passengerList:[],
      choosePassenger:[]
    }
  },
  methods:{
    getPassenger:function(){
      var url = '/api/member/passenger'
      this.$http.get(url).then(function(result){
        console.log(result.body)
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          for (var i=0;i<rst.data.length;i++) {
            rst.data[i].check = false
          }
          this.passengerList = rst.data
          //this.resolveCheck()
        }else {
          console.log(rst.msg)
        }
      });
    },
    checkOne:function(n){
      if (this.passengerList[n].visa_type==null) {
        Toast('请编辑客户类型')
      }else{
        this.passengerList[n].check = !this.passengerList[n].check
        this.choosePassenger = []
        for (var i=0; i<this.passengerList.length; i++) {
          if (this.passengerList[i].check == true) {
            this.choosePassenger.push(this.passengerList[i])
          }
        }        
      }                
    },
    resolveCheck:function(){
      for (var i=0; i<this.choosePassenger.length;i++) {
        var c_id = this.choosePassenger[i].id
        for (var i=0; i<this.passengerList.length;i++) {
          var p_id = this.passengerList[i].id
          if(c_id == p_id){
            this.passengerList[i].check = true
          }          
        }        
      }
    },
    editPassenger:function(t,v){
      if (t=='add') {
        this.passengerList.push(v)
      }else{
        
      }
      //this.getPassenger()   
      this.editItem.editdis = false
    },
    closePassenger:function(){
      this.editItem.editdis = false
    },
    confirm:function(){
      this.$emit('confirm',this.choosePassenger)
    }
  }
}
</script>

<style lang="less" scoped>
.apply-list{
  background-color: #F6F6F6;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  overflow-y: scroll;
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