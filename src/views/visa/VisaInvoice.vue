<template>
  <div class="invoice-form" id="invoice-form">
    <div class="check" @click="visaOrderData.invoice.need=visaOrderData.invoice.need==0?1:0">
      <span class="txt">需要发票</span>
      <span class="isneed" :class="{on:visaOrderData.invoice.need == 1}"></span>
    </div>
    <div class="infolist" v-if="visaOrderData.invoice.need == 1">
      <div class="item">
        <div class="tit">发票类型</div>
        <div class="con radiobtn">
          <!--<div class="ritem" :class="{on:visaOrderData.invoice.type==0}"><span></span>电子发票</div>-->
          <div class="ritem" :class="{on:visaOrderData.invoice.type==1}"><span></span>纸质发票</div>
        </div>
      </div>
      <div class="item">
        <div class="tit">发票明细</div>
        <div class="con txt">
          <input type="text" v-model="visaOrderData.invoice.memo" maxlength="30">
        </div>
      </div>
      <div class="item" @click="invoice=true">
        <div class="tit">发票抬头</div>
        <div class="con select">
          <div class="name">{{visaOrderData.invoice.header}}</div>
        </div>
      </div>
      <div class="item" @click="delivery=true">
        <div class="tit">配送地址</div>
        <div class="con select">
          <div class="address">
            <div class="t1">{{visaOrderData.invoice.shippingInfo.name+' '+visaOrderData.invoice.shippingInfo.phone}}</div>
            <div class="t2">{{visaOrderData.invoice.shippingInfo.province+visaOrderData.invoice.shippingInfo.city+visaOrderData.invoice.shippingInfo.zone+visaOrderData.invoice.shippingInfo.address}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm" @click="confirm">确定</div>
    <address-list
    v-if="delivery"
    @confirm="deliveryConfirm"
    @close="delivery=false">
    </address-list>
    <invoice-list
    v-if="invoice"
    @confirm="invoiceConfirm"
    @close="invoice=false">    
    </invoice-list>
  </div>
</template>

<script>
import AddressList from '../../components/AddressList'
import InvoiceList from '../../components/InvoiceList'
import { Toast } from 'mint-ui'
export default {
  name:'invoice-form',
  created:function(){
  },
  data:function(){
    return{
      visaOrderData:this.visaOrderData,
      delivery:false,
      invoice:false
    }
  },
  methods: {
    deliveryConfirm:function(v){
      this.delivery = false
      this.visaOrderData.invoice.shippingId = v.id
      this.visaOrderData.invoice.shippingInfo = v
      history.go(-1)
    },
    invoiceConfirm:function(v){
      this.invoice = false
      this.visaOrderData.invoice.header = v.name
      if (v.number == null) {
        this.visaOrderData.invoice.number = ''
      }else{
        this.visaOrderData.invoice.number = v.number
      }
      history.go(-1)
    },
    confirm:function(){
      if (this.visaOrderData.invoice.need == 0) {
        this.$store.commit('orderDataSave',this.visaOrderData);
        history.go(-1)
      }else{
        if (this.visaOrderData.invoice.header == '') {
          Toast('请选择发票抬头')
        }else if (this.visaOrderData.invoice.shippingId == '') {
          Toast('请选择发票邮寄地址')
        }else {
          this.$store.commit('orderDataSave',this.visaOrderData);
          history.go(-1)
        }
      }
    }
  },
  components:{
    AddressList,
    InvoiceList
  },
  computed: {
    visaOrderData () {
      return this.$store.state.visa.orderPageData;
    }
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