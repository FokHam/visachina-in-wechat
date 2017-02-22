<template>
  <div class="isr-o-page">
    <div v-if="!selectingDestination">
      <div class="order-title">
        <p class="product-name">{{ insuranceState.productDetail.name + (insuranceState.productDetail.planName ? ("（" + insuranceState.productDetail.planName + "）") : "") }}</p>
        <p>适合人群：{{ insuranceState.productDetail.web_position }}</p>
        <p>{{ "投保周期：" + startDate.format("yyyy.MM.dd") + " — " + endDate.format("yyyy.MM.dd") }}</p>
      </div>
      <detail-content></detail-content>
      <div class="order-info">
        <div class="person">
          <span class="label">被保人<i class="icon-question" @click="showTip(1)"></i></span>
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
          <span class="label">投保人<i class="icon-question" @click="showTip(2)"></i></span>
          <router-link class="icon-addperson"
            v-if="!policyHolder.name"
            :to="'/InsuranceSelectPolicyHolder/' + $route.params.id"
          ></router-link>
        </div>
        <div class="person-list"
          v-if="policyHolder.name">
          <router-link class="person-item"
            :to="'/InsuranceSelectPolicyHolder/' + $route.params.id">
            <p>
              <span>{{ policyHolder.surname + policyHolder.name }}</span>
              <span>{{ policyHolder.spell_surname + policyHolder.spell_name }}</span>
            </p>
            <p>
              <span>{{ idTypeList[policyHolder.id_type] }}</span>
              <span>{{ policyHolder.id_number }}</span>
            </p>
            <i class="icon-arrow-right"></i>
          </router-link>
        </div>
        <div class="person">
          <span class="label">收益人<i class="icon-question" @click="showTip(3)"></i></span>
          <span class="read-only">法定继承人</span>
        </div>
        <div class="person"
          @click="selectingDestination=true"
          v-if="insuranceState.productDetail.web_city.length">
          <span class="label">目的地</span>
          <span class="destination-item" v-for="item in insuranceState.destination">{{ item }}</span>
          <i class="icon-write"></i>
        </div>
        <div class="person"
          v-if="insuranceState.productDetail.web_visa_flag">
          <span class="label">签证办理城市</span>
          <input type="text" name="" value="" v-model="visaCity" placeholder="填写签证办理城市">
          <i class="icon-write"></i>
        </div>
        <div class="person"
          @click.stop="targetTypeSelecting = true">
          <span class="label">出行目的</span>
          <span class="show-more-btn">
            {{ targetType ? targetTypeList[targetType] : "选择出行目的"}}
          </span>
          <i class="icon-arrow-right"></i>
        </div>
      </div>
      <div class="order-submit">
        <p class="amount">
          <span>订单金额：</span>
          <span class="num">{{ "¥" + amount }}</span>
        </p>
        <span class="button"
          @click="createOrder">提交订单</span>
      </div>
      <div class="tip-shower"
        v-if="tipShowFlag"
        @click.stop="tipShowFlag=false">
        <p>{{ tipShowText }}</p>
      </div>
      <picker v-show="targetTypeSelecting"
        :listdata="targetTypeList"
        @confirm="targetTypeSet"
        @close="targetTypeSelecting=false">
      </picker>
    </div>
    <destination-picker
      v-if="selectingDestination"
      @close="selectingDestination=false"
      ></destination-picker>
  </div>
</template>

<script>
  import DetailContent from "./insuranceDetail/DetailContent"
  import AddressPicker from "../../components/AddressPicker"
  import DestinationPicker from "./insuranceCreateOrder/DestinationPicker"
  import Picker from "../../components/Picker"
  import Vue from "vue"

  import { Toast } from "mint-ui"
  import { Indicator } from "mint-ui"

  export default {
    data: function () {
      let targetList = ["", "旅游", "商务", "探亲", "留学", "务工", "其他"];
      let typeList = ["", "身份证", "护照", "出生证", "驾照", "港澳通行证", "军官证", "台胞证", "警官证"];
      typeList[99] = "其他";
      return {
        tipShowText: "",
        tipShowFlag: false,
        selectingIp: false,
        selectingPh: false,
        selectingDestination: false,
        targetType: 0,
        idTypeList: typeList,
        targetTypeList: targetList,
        targetTypeSelecting: false,
        priceList: [],
        visaCity: ""
      }
    },
    components: {
      DetailContent,
      AddressPicker,
      Picker,
      DestinationPicker
    },
    created () {
      this.trial();
    },
    methods: {
      targetTypeSet (v) {
        this.targetType = this.targetTypeList.indexOf(v);
        this.targetTypeSelecting = false;
      },
      showTip (n) {
        this.tipShowFlag = true;
        switch (n) {
          case 1:
            this.tipShowText = "此次出行者，投保人和被保人可为同一人";
            break;
          case 2:
            this.tipShowText = "购买此保险的人，通常为付款人（须成年人）";
            break;
          case 3:
            this.tipShowText = "如需修改此项，请致电保险公司进行修改";
            break;
        }
      },
      trial () {
        let url = "/api/insurance/trial";
        let that = this;
        let send = {
          id: this.$route.params.id,
          birthday: "",
          startDate: this.startDate.format("yyyy-MM-dd"),
          endDate: new Date(this.endDate.getTime() + 24*3600000).format("yyyy-MM-dd"), //试算时结束日期需加一天
          insureType: this.insureType //0默认，3一年一次，4一年多次
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
        let url = "/api/insurance/create_order";
        let tempObj = this.$store.state.insurance;
        let message = "";
        let send = {
          id: this.$route.params.id,
          beginDate: this.startDate.format("yyyy-MM-dd"),
          endDate: this.endDate.format("yyyy-MM-dd"),
          insureType: this.insureType,
          destination: this.destination,
          visaCity: this.visaCity,
          tripPurposeId: this.targetType,
          insuredPerson: this.insuredPerson,
          policyHolder: this.policyHolder,
          amount: this.amount
        };
        switch (true) {
          case !send.id:
            message = "产品ID错误";
            break;
          case !send.beginDate:
            message = "起始时间错误";
            break;
          case !send.endDate:
            message = "起始时间错误";
            break;
          case !(send.insuredPerson.length > 0):
            message = "请添加被保人";
            break;
          case !send.policyHolder.name:
            message = "请添加投保人";
            break;
          case !send.tripPurposeId:
            message = "请选择出行目的";
            break;
        }
        if (message !== "") {
          Toast({
            message: message,
            position: "middle",
            duration: 1500
          });
        } else {
          Indicator.open('正在创建订单')
          this.$http.post(url, send).then((response) => {
            let body = JSON.parse(response.body);
            console.log(response.body);
            if (body.status == 1) {
              Indicator.close()
              this.$router.push('/insuranceOrderDetail/'+body.data.orderno)
            }
          }, (response) => {
            Toast(body.msg);
          });
        }
        console.log(send);
      }
    },
    computed: {
      insuranceState () {
        return this.$store.state.insurance;
      },
      destination () {
        return this.$store.state.insurance.destination;
      },
      insuredPerson () {
        return this.$store.state.insurance.insuredPerson;
      },
      policyHolder () {
        return this.$store.state.insurance.policyHolder;
      },
      insureType () {
        return this.$store.state.insurance.insureType;
      },
      amount () {
        let amount = 0;
        for (let i = 0; i < this.insuredPerson.length; i += 1) {
          let n = this.priceList[i];
          if (typeof n === "number") {
            amount += n;
          } else {
            return "读取中";
          }
        }
        return amount;
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
  .icon-arrow-right {
    position: absolute;
    right: 0.5rem;
    top: 0; bottom: 0;
    margin: auto;
    width: 0.5rem;
    height: 0.5rem;
    background: url(/static/images/insurance/arrow-r.png) center no-repeat;
    background-size: contain;
  }
  .tip-shower {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 10;
    p {
      position: absolute;
      top: 50%;
      width: 100%;
      line-height: 3rem;
      font-size: 0.8rem;
      background: #fff;
      text-align: center;
      color: #666;
    }
  }
  .isr-o-page {
    padding-bottom: 3.5rem;
  }
  .order-title {
    margin: 0.5rem;
    background: url(/static/images/insurance/bg.png) no-repeat;
    background-size: cover;
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
      .destination-item {
        margin-right: 0.5rem;
      }
      input {
        border: none;
        font-size: 0.7rem;
      }
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
