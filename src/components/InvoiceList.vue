<template>
<div class="invoice-list" id="invoice-list">
  <div class="addbtn" @click="invoice.display=true">添加发票抬头</div>
  <div class="invoiceList">
    <ul v-if="invoiceList.length > 0">
      <li v-for="item in invoiceList">
        <div class="info" @click="confirm(item)">
          <div class="name"><span class="left">{{item.name}}</span><span class="right">{{item.number}}</span></div>          
        </div>
        <div class="editbtn" @click="invoice.display=true,invoice.data=item"></div>
      </li>
    </ul>
    <div v-if="isempty" class="empty">暂无常用抬头</div>
  </div>
  <invoice-add
  v-if="invoice.display"
  :info="invoice.data"
  @submit="closeComponents">    
  </invoice-add>
</div>
</template>

<script>
import InvoiceAdd from './InvoiceAdd'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
  created: function () {
    Indicator.open('加载中...')
    const _this = this;
    var state = {  
      title: document.title,
      url: document.location.href  
    };  
    window.history.pushState(state,document.title, document.location.href);
    window.addEventListener("popstate", function(e) {  
      _this.$emit('close');
    }, false);
    this.getInvoice()
  },
  data:function(){
    return{
      invoiceList:[],
      invoice:{"display":false,"data":""},
      isempty:false
    }
  },
  methods:{
    getInvoice:function(){
      var url = '/api/member/invoice'
      this.$http.get(url).then(function(result){
        Indicator.close()
        var rst = JSON.parse(result.body)
        if (rst.status == 1) {
          this.invoiceList = rst.data
          if (rst.data.length == 0) {
            this.isempty = true
          }else {
            this.isempty = false
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
      this.getInvoice()
      this.invoice = {"display":false,"data":""}
    }
  },
  components:{
    InvoiceAdd
  }
}
</script>

<style lang="less" scoped>
.invoice-list{
  background-color: #F6F6F6;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  overflow-y: scroll;
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
  .invoiceList{
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