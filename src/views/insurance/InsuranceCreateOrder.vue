<template>
  <div class="isr-o-page">
    <div class="order-title">
      <p class="product-name">申根险意外保险 （经典型）</p>
      <p>适合人群：商务出差人士</p>
      <p>{{ "投保周期：" + startDate.format("yyyy.MM.dd") + " — " + endDate.format("yyyy.MM.dd") }}</p>
    </div>
    <detail-content></detail-content>
    <div class="order-info">
      <div class="person">
        <span class="label">被保人<i class="icon-question"></i></span>
        <router-link
        :class="[insuredPerson.length === 0 ? 'icon-addperson' : 'icon-edit']"
        :to="'/InsuranceSelectInsuredPerson/' + $route.params.id"
        ></router-link>
      </div>
      <div v-if="insuredPerson.length" class="person-list">
        <div class="person-item"
          @click="selectingIp=true"
          v-for="(person, index) in insuredPerson">
          <p>
            <span>{{ person.surname + " " + person.name }}</span>
            <span>{{ person.spell_surname + " " + person.spell_name }}</span>
          </p>
          <p>
            <span>{{ idTypeList[person.id_type] }}</span>
            <span>{{ person.id_number }}</span>
          </p>
          <span class="price">¥{{ priceList[index] ? priceList[index] : "读取中.." }}</span>
        </div>
      </div>
      <div class="person">
        <span class="label">投保人<i class="icon-question"></i></span>
        <router-link class="icon-addperson"
          v-if="!policyHolder.cName"
          :to="'/InsuranceSelectPolicyHolder/' + $route.params.id"
        ></router-link>
      </div>
      <div class="person-list"
        v-if="policyHolder.cName">
        <router-link class="person-item"
          :to="'/InsuranceSelectPolicyHolder/' + $route.params.id">
          <p>
            <span>{{ policyHolder.cName }}</span>
            <span>{{ policyHolder.eName }}</span>
          </p>
          <p>
            <span>{{ idTypeList[policyHolder.idType] }}</span>
            <span>{{ policyHolder.idNo }}</span>
          </p>
          <i class="icon-arrow-right"></i>
        </router-link>
      </div>
      <div class="person">
        <span class="label">收益人<i class="icon-question"></i></span>
        <span class="read-only">法定继承人</span>
      </div>
      <div class="person">
        <span class="label">目的地</span>
        <span>冰岛</span>
        <i class="icon-write"></i>
      </div>
    </div>
    <div class="order-submit">
      <p class="amount">
        <span>订单金额：</span>
        <span class="num">{{ "¥" + amount + " (" + singlePrice + " x " + insuredPerson.length + "人)"}}</span>
      </p>
      <span class="button"
        @click="createOrder">提交订单</span>
    </div>
  </div>
</template>

<script>
  import DetailContent from "./insuranceDetail/DetailContent"
  import AddressPicker from "../../components/AddressPicker"
  import Vue from "vue"

  import { Toast } from 'mint-ui';

  export default {
    data: function () {
      let typeList = ["身份证", "护照", "出生证", "驾照", "港澳通行证", "军官证", "台胞证", "警官证"];
      typeList[99] = "其他";
      return {
        selectingIp: false,
        selectingPh: false,
        singlePrice: 150,
        idTypeList: typeList,
        priceList: []
      }
    },
    components: {
      DetailContent,
      AddressPicker
    },
    created () {
      this.trial();
    },
    methods: {
      trial () {
        let url = "/api/insurance/trial";
        let that = this;
        let send = {
          id: this.$route.params.id,
          birthday: "",
          startDate: this.startDate.format("yyyy-MM-dd"),
          endDate: new Date(this.endDate.getTime() + 24*3600000).format("yyyy-MM-dd"), //试算时结束日期需加一天
          insureType: this.selectType ? (this.annualMulti ? 4 : 3) : 0
        };
        this.insuredPerson.map(function (obj, n) {
          console.log(send);
          send.birthday = obj.birthday;
          that.$http.get(url, {params: send}).then((response) => {
            console.log(JSON.parse(response.body));
            let respMsg = JSON.parse(response.body);
            Vue.set(that.priceList, n, respMsg.data);
          }, (response) => {
            console.log("服务器错误");
          });
        });
      },
      createOrder () {
        let tempObj = this.$store.state.insurance;
        let message = "";
        let send = {
          productId: this.$route.params.id,
          startDate: this.startDate,
          endDate: this.endDate,
          insuredPerson: this.insuredPerson,
          policyHolder: this.policyHolder,
          destinaiton: tempObj.destinaiton,
          amount: this.amount
        };
        switch (true) {
          case !send.productId:
            message = "产品ID错误";
            break;
          case !send.startDate:
            message = "起始时间错误";
            break;
          case !(send.insuredPerson.length > 0):
            message = "请添加被保人";
            break;
          case !send.policyHolder.cName:
            message = "请添加投保人";
            break;
        }
        if (message !== "") {
          Toast({
            message: message,
            position: "middle",
            duration: 1500
          });
        }
        console.log(send);
      }
    },
    computed: {
      insuredPerson () {
        return this.$store.state.insurance.insuredPerson;
      },
      policyHolder () {
        return this.$store.state.insurance.policyHolder;
      },
      amount () {
        return this.insuredPerson.length * this.singlePrice;
      },
      startDate () {
        return this.$store.state.insurance.startDate;
      },
      endDate () {
        return this.$store.state.insurance.endDate;
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
    padding: 0 0 1.5rem 0.5rem;
    background-color: #fff;
    background-image: url(/static/images/insurance/underbg.png);
    background-repeat: repeat-x;
    background-position: left bottom;
    .person {
      display: flex;
      align-items: center;
      position: relative;
      height: 2.2rem;
      border-bottom: 0.05rem solid #eee;
      .read-only {
        font-size: 0.7rem;
        color: #999;
      }
      .label {
        position: relative;
        margin-right: 0.5rem;
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
      .icon-edit {
        position: absolute;
        right: 0.5rem;
        top: 0; bottom: 0;
        margin: auto;
        width: 0.95rem;
        height: 1.0rem;
        background: url(/static/images/insurance/edit.png) no-repeat;
        background-size: contain;
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
    .person-list {
      margin: 0 0.5rem;
      margin-right: 0;
      padding: 0.5rem 0 0.4rem;
      .person-item {
        position: relative;
        border-bottom: 0.05rem solid #eee;
        display: block;
        &:last-child {
          border-bottom: none;
        }
        p {
          margin: 0.3rem 0;
        }
        span {
          color: #666;
        }
        .price {
          position: absolute;
          right: 0.5rem;
          top: 0.6rem;
          color: #f55301;
        }
        .icon-arrow-right {
          position: absolute;
          right: 0.5rem;
          top: 0.9rem;
          width: 0.5rem;
          height: 0.5rem;
          background: url(/static/images/insurance/arrow-r.png) center no-repeat;
          background-size: contain;
        }
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
