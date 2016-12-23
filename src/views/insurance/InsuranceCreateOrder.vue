<template>
  <div class="isr-o-page">
    <div class="order-title">
      <p class="product-name">申根险意外保险 （经典型）</p>
      <p>适合人群：商务出差人士</p>
      <p>投保周期：2016.12.09 — 2017.01.17</p>
    </div>
    <detail-content></detail-content>
    <div class="order-info">
      <div class="person">
        <span class="label">被保人<i class="icon-question"></i></span>
        <div class="person-list">
          <span class="person-name" v-for="person in insuredPerson">{{ person.cName }}</span>
        </div>
        <i class="icon-addperson"
          @click="selectingIp=true"
        ></i>
      </div>
      <div class="person">
        <span class="label">投保人<i class="icon-question"></i></span>
        <div class="person-list">
          <span class="person-name">{{ policyHolder.cName }}</span>
        </div>
        <i class="icon-addperson"
          @click="selectingPh=true"
        ></i>
      </div>
      <div class="person">
        <span class="label">收益人<i class="icon-question"></i></span>
        <span class="read-only">法定继承人</span>
      </div>
      <div class="address">
        <span class="label">目的地</span>
        <i class="icon-write"></i>
      </div>
    </div>
    <div class="order-submit">
      <p class="amount">
        <span>订单金额：</span>
        <span class="num">¥1200</span>
      </p>
      <span class="button">提交订单</span>
    </div>
    <select-insured-person
      v-if="selectingIp"
      @confirm="selectIpConfirm">
    </select-insured-person>
    <select-policy-holder
      v-if="selectingPh"
      @confirm="selectPhConfirm">
    </select-policy-holder>
  </div>
</template>

<script>
  import DetailContent from "./InsuranceDetail/DetailContent"
  import SelectInsuredPerson from "./InsuranceCreateOrder/SelectInsuredPerson"
  import SelectPolicyHolder from "./InsuranceCreateOrder/SelectPolicyHolder"
  import AddressPicker from "../../components/AddressPicker"

  export default {
    data: function () {
      return {
        selectingIp: false,
        selectingPh: false
      }
    },
    components: {
      DetailContent,
      SelectInsuredPerson,
      SelectPolicyHolder,
      AddressPicker
    },
    methods: {
      selectIpConfirm () {
        this.selectingIp = false;
      },
      selectPhConfirm () {
        this.selectingPh = false;
      }
    },
    computed: {
      insuredPerson () {
        return this.$store.state.insurance.insuredPerson;
      },
      policyHolder () {
        return this.$store.state.insurance.policyHolder;
      }
    }
  }
</script>

<style lang="less" scoped>
  .isr-o-page {
    padding-bottom: 3.5rem;
  }
  .order-title {
    margin: 0.5rem;
    background: url(/static/images/insurance/bg.png) no-repeat;
    background-size: contain;
    padding: 1.1rem 0.8rem;
    border-radius: 0.25rem;
    .product-name {
      font-size: 0.9rem;
    }
    p {
      color: #fff;
      font-size: 0.8rem;
      margin: 0.25rem 0;
    }
  }
  .order-info {
    margin-top: 0.3rem;
    padding: 0 0.3rem 0.5rem;
    background-color: #fff;
    background-image: url(/static/images/insurance/underbg.png);
    background-repeat: repeat-x;
    background-position: left bottom;
    .person {
      display: flex;
      align-items: center;
      position: relative;
      height: 2.7rem;
      border-bottom: 0.05rem solid #eee;
      .person-list {
        flex: 50%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-right: 1.5rem;
        .person-name {
          margin-right: 0.5rem;
          border: 0.05rem solid #c0c0c0;
          padding: 0.1rem 0.2rem;
          border-radius: 0.15rem;
        }
      }
      .read-only {
        font-size: 0.7rem;
        color: #999;
      }
      .label {
        position: relative;
        flex: 1;
        margin-left: 0.5rem;
        font-size: 0.7rem;
        display: inline-block;
      }
      .icon-question {
        display: inline-block;
        vertical-align: text-bottom;
        height: 0.9rem;
        width: 0.7rem;
        margin-left: 0.2rem;
        background: url(/static/images/insurance/explain.png) center no-repeat;
        background-size: contain;
      }
      .icon-addperson {
        position: absolute;
        right: 0.5rem;
        top: 0; bottom: 0;
        margin: auto;
        width: 0.95rem;
        height: 1.0rem;
        background: url(/static/images/insurance/add.png) no-repeat;
        background-size: contain;
      }
    }
    .address {
      line-height: 2.5rem;
      position: relative;
      .label {
        position: relative;
        margin-left: 0.5rem;
        font-size: 0.7rem;
      }
      .icon-write {
        position: absolute;
        right: 0.5rem;
        top: 0; bottom: 0;
        margin: auto;
        width: 0.95rem;
        height: 1.0rem;
        background: url(/static/images/insurance/write.png) no-repeat;
        background-size: contain;
      }
    }
  }
  .order-submit {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    line-height: 2.5rem;
    .amount {
      span {
        font-size: 0.8rem;
      }
      display: inline-block;
      margin-left: 0.8rem;
    }
    .num {
      color: #f55301;
      font-weight: bold;
    }
    .button {
      color: #fff;
      background-color: #008BE4;
      line-height: 1;
      vertical-align: middle;
      padding: 0.4rem 1rem;
      border-radius: 0.2rem;
      position: absolute;
      right: 0.5rem;
      top: 0.6rem;
    }
  }
</style>
