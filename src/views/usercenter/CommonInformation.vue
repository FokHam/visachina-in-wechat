<template>
<div class="common-infomation" id="common-infomation">
  <div class="tabs">
    <ul>
      <li><span :class="{on:tabcount==0}" @click="tabcount=0">旅客</span></li>
      <li><span :class="{on:tabcount==1}" @click="tabcount=1">地址</span></li>
      <li><span :class="{on:tabcount==2}" @click="tabcount=2">联系人</span></li>
      <li><span :class="{on:tabcount==3}" @click="tabcount=3">报销凭证</span></li>
    </ul>
  </div>
  <div class="data-lists">
    <div class="item passenger" v-show="tabcount==0">
      <div class="add" @click="addData.passenger.display=true">添加旅客</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in listData.passenger">
            <div class="top">
              <div class="name">{{item.name}}<span>{{item.spell}}</span></div>
              <div class="idnum">{{idTypeStr[item.id_type]}} {{item.id_number}}</div>
            </div>
            <div class="bottom">
              <div class="left on" v-if="item.status == 2">默认旅客</div>
              <div class="left" v-else @click="setDefalt('passenger',item.id)">设为默认</div>
              <div class="right">
                <span class="delete" @click="deleteItem('passenger',item.id)">删除</span>
                <span class="edit" @click="addData.passenger.display=true,addData.passenger.data=item">编辑</span>
              </div>
            </div>
          </li>          
        </ul>
      </div>
    </div>
    <div class="item address" v-show="tabcount==1">
      <div class="add" @click="addData.address.display=true">添加地址</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in listData.address_list">
            <div class="top">
              <div class="contact">
                <span class="name">{{item.name}}</span>
                <span class="phone">{{item.phone}}</span>
              </div>
              <div class="ads">{{item.province+item.city+item.zone+item.address}}</div>
            </div>
            <div class="bottom">
              <div class="left on" v-if="item.status == 2">默认地址</div>
              <div class="left" v-else @click="setDefalt('address',item.id)">设为默认</div>
              <div class="right">
                <span class="delete" @click="deleteItem('address',item.id)">删除</span>
                <span class="edit" @click="addData.address.display=true,addData.address.data=item">编辑</span>
              </div>
            </div>
          </li>          
        </ul>
      </div>
    </div>
    <div class="item contacter" v-show="tabcount==2">
      <div class="add" @click="addData.contacter.display=true">添加联系人</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in listData.contacter">
            <div class="top">
              <div class="contact">
                <span class="name">{{item.name}}</span>
                <span class="phone">{{item.tel}}</span>
              </div>
              <div class="ads">{{item.email}}</div>
            </div>
            <div class="bottom">
              <div class="left on" v-if="item.status == 2">默认联系人</div>
              <div class="left" v-else @click="setDefalt('contact',item.id)">设为默认</div>
              <div class="right">
                <span class="delete" @click="deleteItem('contact',item.id)">删除</span>
                <span class="edit" @click="addData.contacter.display=true,addData.contacter.data=item">编辑</span>
              </div>
            </div>
          </li>          
        </ul>
      </div>
    </div>
    <div class="item credential" v-show="tabcount==3">
      <div class="add" @click="addData.credential.display=true">报销凭证抬头</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in listData.credential">          
            <div class="txt" @click="addData.credential.display=true,addData.credential.data=item">{{item.name}}</div>
          </li>          
        </ul>
      </div>
    </div>
  </div>
  <add-passenger 
  v-if="addData.passenger.display"
  :info="addData.passenger.data"
  @submit="closeComponents">
  </add-passenger>
  <add-address 
  v-if="addData.address.display"
  :info="addData.address.data"
  @submit="closeComponents">
  </add-address>
  <add-contacter 
  v-if="addData.contacter.display"
  :info="addData.contacter.data"
  @submit="closeComponents">
  </add-contacter>
  <add-credential 
  v-if="addData.credential.display"
  :info="addData.credential.data"
  @submit="closeComponents">
  </add-credential>
</div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import AddPassenger from './commoninformation/AddPassenger'
import AddAddress from './commoninformation/AddAddress'
import AddContacter from './commoninformation/AddContacter'
import AddCredential from './commoninformation/AddCredential'
export default{
  name:'common-infomation',
  beforeCreate(){
    document.title = '常用信息'
  },
  created: function () {  
    this.freshData('all')
  },
  components: {
    AddPassenger,
    AddAddress,
    AddContacter,
    AddCredential
  },
  data:function () {
    return{
      tabcount:0,
      addData:{
        "passenger":{"display":false,"data":""},
        "address":{"display":false,"data":""},
        "contacter":{"display":false,"data":""},
        "credential":{"display":false,"data":""}
      },
      listData:{
        "passenger":[],
        "address_list":[],
        "contacter":[],
        "credential":[]
      },
      idTypeStr:['','身份证','护照','出生证','驾照','港澳通行证','军官证','台胞证','警官证']
    }
  },
  methods:{
    freshData:function(type){
      if (type == 'all') {
        this.getPassenger()
        this.getAddress()
        this.getContacter()
        this.getCredential()
      }else if (type == 'passenger') {
        this.getPassenger()
      }else if (type == 'address') {
        this.getAddress()
      }else if (type == 'contact') {
        this.getContacter()
      }else if (type == 'credential') {
        this.getCredential()
      }
      
    },
    getPassenger:function(){
      var url = '/member/passenger'
      this.$http.get(url).then(function(result){
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.listData.passenger = rst.data
        }else {
          console.log(rst.msg)
        }
      });
    },
    getAddress:function(){
      var url = '/member/address'
      this.$http.get(url).then(function(result){
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.listData.address_list = rst.data
        }else {
          console.log(rst.msg)
        }
      });
    },
    getContacter:function(){
      var url = '/member/contact'
      this.$http.get(url).then(function(result){
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.listData.contacter = rst.data
        }else {
          console.log(rst.msg)
        }
      });
    },
    getCredential:function(){
      var url = '/member/invoice'
      this.$http.get(url).then(function(result){
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.listData.credential = rst.data
        }else {
          console.log(rst.msg)
        }
      });
    },
    setDefalt:function(type,id){
      var url = '';
      switch (type) {
        case 'passenger':
        url = '/member/passenger-set?id='+id
        break;
        case 'address':
        url = '/member/address-set?id='+id
        break;
        case 'contact':
        url = '/member/contact-set?id='+id
        break;
      }
      this.$http.get(url).then(function(result){
        this.freshData(type)
        var rst = result.body
        if (rst.status == 0) {
          console.log(rst.msg)
        }
      });
    },
    deleteItem:function(type,id){
      MessageBox.confirm('确定删除?').then(action => {
        var url = '';
        switch (type) {
          case 'passenger':
          url = '/member/passenger-delete?id='+id
          break;
          case 'address':
          url = '/member/address-delete?id='+id
          break;
          case 'contact':
          url = '/member/contact-delete?id='+id
          break;
        }
        this.$http.get(url).then(function(result){
          this.freshData(type)
          var rst = result.body
          if (rst.status == 0) {
            console.log(rst.msg)
          }
        });
      });      
    },
    closeComponents:function(v){
      this.freshData(v)
      this.addData = {
        "passenger":{"display":false,"data":""},
        "address":{"display":false,"data":""},
        "contacter":{"display":false,"data":""},
        "credential":{"display":false,"data":""}
      }
    }
  }

}
</script>

<style lang="less" scoped>
.common-infomation{
  .tabs{
    overflow: hidden;
    li{
      width: 25%;float: left;text-align: left;
      &:last-child{text-align: right;}
      span{
        display: inline-block;line-height: 40px;height: 38px;
        text-align: center;font-size: 0.7rem;padding: 0 15px;
        border-bottom: 2px solid #f6f6f6;color: #999999;
        &.on{color: #008be4;border-bottom: 2px solid #008be4;}
      }
    }
  }
  .data-lists{
    .item{
      .add{
        background-color: #fff;
        padding: 10px 20px;
        font-size: 0.7rem;
        color: #008be4;
        background-image: url('/static/images/usercenter/icon-add.png');
        background-repeat: no-repeat;
        background-position: 20px center;
        background-size: 16px;
        text-indent: 25px;
        margin-bottom: 3px;
      }
      .list{
        ul{
          li{
            background-color: #fff;
            padding: 0 20px;
            .bottom{
              border-top: 1px solid #eeeeee;
              overflow: hidden;
              .left{
                float: left;
                color: #c0c0c0;
                height: 35px;
                line-height: 35px;
                padding-left: 20px;
                font-size: 0.6rem;
                background-image: url('/static/images/usercenter/icon-undefault.png');
                background-repeat: no-repeat;
                background-position: left center;
                background-size: 15px;
                &.on{background-image: url('/static/images/usercenter/icon-default.png');}
              }
              .right{
                float: right;
                span{
                  display: inline-block;
                  height: 35px;
                  line-height: 35px;
                  padding-left: 22px;
                  font-size: 0.6rem;
                  color: #c0c0c0;
                  background-repeat: no-repeat;
                  background-position: 4px center;
                  background-size: 15px;
                }
                .delete{
                  background-image: url('/static/images/usercenter/icon-delete.png');
                }
                .edit{
                  background-image: url('/static/images/usercenter/icon-edit.png');
                }
              }
            }
          }
        }
      }
    }
    .passenger{
      ul{
        li{
          margin-bottom: 2px;
          .top{
            padding: 20px 0 10px;
            .name{
              margin-bottom: 5px;
              font-size: 0.8rem;
              color: #666666;
              span{
                padding-left: 10px;
                font-size: 0.7rem;
                color: #666666;
              }
            }
            .idnum{
              color: #999999;
              font-size: 0.6rem;
            }
          }          
        }
      }
    }
    .address,.contacter{
      ul{
        li{          
          margin-bottom: 2px;
          .top{
            padding: 20px 0 10px;
            .contact{
              overflow: hidden;
              margin-bottom: 5px;
              span{
                font-size: 0.7rem;
                color: #666666;
              }
              .name{
                float: left;
              }
              .phone{
                float: right;
              }
            }
            .ads{
              font-size: 0.6rem;
              color: #999999;
            }
          }          
        }
      }
    }
    .credential{
      ul{
        li{
          border-bottom: 1px solid #eeeeee;
          .txt{
            font-size: 0.7rem;
            color: #666666;
            line-height: 55px;
            background-image: url('/static/images/usercenter/icon-right.png');
            background-repeat: no-repeat;
            background-position: right center;
            background-size: 10px;
          }
          &:last-child{
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>