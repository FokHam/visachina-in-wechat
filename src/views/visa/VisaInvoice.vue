<template>
  <div class="invoice-form" id="invoice-form">
    <div class="check" @click="listdata.need=listdata.need==0?1:0">
      <span class="txt">需要发票</span>
      <span class="isneed" :class="{on:listdata.need == 1}"></span>
    </div>
    <div class="infolist" v-if="listdata.need == 1">
      <div class="item">
        <div class="tit">发票类型</div>
        <div class="con radiobtn">
          <!--<div class="ritem" :class="{on:listdata.type==0}"><span></span>电子发票</div>-->
          <div class="ritem" :class="{on:listdata.type==1}"><span></span>纸质发票</div>
        </div>
      </div>
      <div class="item">
        <div class="tit">发票明细</div>
        <div class="con txt">
          <input type="text" v-model="listdata.memo">
        </div>
      </div>
      <div class="item" @click="invoice=true">
        <div class="tit">发票抬头</div>
        <div class="con select">
          <div class="name">{{listdata.header}}</div>
        </div>
      </div>
      <div class="item" @click="delivery=true">
        <div class="tit">配送地址</div>
        <div class="con select">
          <div class="address">
            <div class="t1">{{listdata.shippingInfo.name+' '+listdata.shippingInfo.phone}}</div>
            <div class="t2">{{listdata.shippingInfo.province+listdata.shippingInfo.city+listdata.shippingInfo.zone+listdata.shippingInfo.address}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm" @click="confirm">确定</div>
    <address-list
    v-show="delivery"
    @confirm="deliveryConfirm">    
    </address-list>
    <invoice-list
    v-show="invoice"
    @confirm="invoiceConfirm">    
    </invoice-list>
  </div>
</template>

<script>
import AddressList from './visaorder/AddressList'
import InvoiceList from './visaorder/InvoiceList'
export default {
  name:'invoice-form',
  created:function(){
  },
  data:function(){
    return{
      listdata:{"need":0,"type":1,"memo":"","header":"","shippingId":"","shippingInfo":{"name":"","phone":"","province":"","city":"","zone":"","address":""}},
      delivery:false,
      invoice:false
    }
  },
  methods: {
    deliveryConfirm:function(v){
      this.delivery = false
      this.listdata.shippingId = v.id
      this.listdata.shippingInfo = v
    },
    invoiceConfirm:function(v){
      this.invoice = false
      this.listdata.header = v.name
    },
    confirm:function(){
      this.$emit('confirm',this.listdata)
    },
    closeCom:function(){
      this.$emit('closeCom')
    }
  },
  components:{    
    AddressList,
    InvoiceList
  }
   
}
</script>

<style lang="less" scoped>
.invoice-form{
  background-color: #F6F6F6;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  .check{
    padding:1rem 10px;
    margin:0 10px 5px;
    background-color: #fff;
    overflow: hidden;
    .txt{
      display: block;
      float: left;
      font-size: 0.7rem;
      line-height: 0.8rem;
    }
    .isneed{
      display: block;
      float: right;
      width: 0.7rem;
      height: 0.7rem;
      border:0.1rem solid #008CE4;
      border-radius: 0.1rem;
      &.on{
        background-color: #008BE4;
        background-image: url('/static/images/visa/icon-check.png');
        background-repeat: no-repeat;background-position: center;
        background-size: 0.65rem;
      }
    }
  }
  .infolist{
    margin: 0 10px;
    padding-left: 10px;
    background-color: #fff;
    padding-bottom: 10px;
    background-image: url('/static/images/visa/borderbg.png');
    background-repeat:repeat-x ;
    background-position:bottom;
    background-size: 10px;
    .item{
      border-bottom: 1px solid #f6f6f6;
      position: relative;
      height: 3rem;
      &:last-child{border-bottom: none;}
      .tit{
        position: absolute;
        top: 0;
        left: 0;
        width: 5rem;
        height: 3rem;
        color: #666666;
        font-size: 0.7rem;
        line-height: 3rem;
      }
      .con{
        padding-left: 5rem;
        height: 3rem;
      }
      .radiobtn{
        overflow: hidden;
        .ritem{
          position: relative;
          float: left;
          font-size: 0.7rem;
          line-height: 3rem;
          padding-left: 1rem;
          margin-right: 0.8rem;
          span {
            display: block;
            height: 0.7rem;
            width: 0.7rem;
            border: 0.1rem solid #ccc;
            float: left;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -0.4rem;
            border-radius: 0.7rem;
          }
          &.on{
            span{
              background-color: #008ce4;
              border-color: #008ce4;
              background-image: url('/static/images/visa/icon-check.png');
              background-repeat: no-repeat;background-position: center;
              background-size: 0.6rem;
            }
          }
        }
      }
      .txt{
        input{
          border:none;
          height: 3rem;
          width: 100%;
          background-color: #fff;
          font-size: 0.7rem;
        }
      }
      .select{
        padding-right: 10px;
        .name{
          line-height: 3rem;
          height: 3rem;
          font-size: 0.7rem;          
          background-image: url('/static/images/visa/icon-right-gray.png');
          background-repeat: no-repeat;
          background-position:right center;
          background-size: 0.6rem;
          padding-right: 0.6rem;
          overflow: hidden;
        }
        .address{
          padding: 0.5rem 0.6rem 0.5rem 0;
          height: 2rem;
          background-image: url('/static/images/visa/icon-right-gray.png');
          background-repeat: no-repeat;
          background-position:right center;
          background-size: 0.6rem;
          .t1{
            font-size: 0.7rem;
            height: 1rem;           
            overflow: hidden;
            line-height: 1rem;
          }
          .t2{
            font-size: 0.6rem;
            color: #999999;
            height: 1rem;
            line-height: 1rem;
            overflow: hidden;
          }
        }
      }
      .readtxt{
        line-height: 3rem;
        height: 3rem;
        font-size: 0.7rem;
        overflow: hidden;
      }
    }    
  }
  .confirm{
    line-height: 2rem;
    font-size: 0.8rem;
    text-align: center;
    color: #fff;
    background-color: #008BE4;
    margin: 20px 10px;
    border-radius: 5px;
  }

  
}
</style>