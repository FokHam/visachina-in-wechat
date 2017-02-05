import { Toast } from 'mint-ui';

let state = {
  productId: 0,
  productDetail: {},
  type: "",
  startDate: "",
  endDate: "",
  selectedInsuredPersonIds: [],
  selectedPolicyHolderId: "",
  insuredPerson: [],
  policyHolder: {},
  destinaiton: ["英国", "美国", "意大利"]
};

const mutations = {
  resetInsuranceState (state) {
    let d = new Date(),
        minDay = 2,
        startDate = new Date(),
        type = 0;
    startDate = new Date(startDate.getTime() + 24*3600000);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    let endDate = new Date(startDate.getTime() + 24*3600000*(minDay - 1 + 1));

    state.startDate = startDate,
    state.endDate = endDate,
    state.type = type,
    state.selectedInsuredPersonIds = [],
    state.selectedPolicyHolderId = "",
    state.insuredPerson = [],
    state.policyHolder = {}
  },
  setInsuranceEndDate (state, payload) {
    state.endDate = payload.endDate;
  },
  setInsuranceDetail (state, payload) {
    state.productId = payload.id;
    state.productDetail = payload.detail;
  },
  toggleInsuredPerson (state, id) {
    let index = state.selectedInsuredPersonIds.indexOf(id);
    if ( index !== -1) {
      state.selectedInsuredPersonIds.splice(index, 1);
    } else {
      if (state.selectedInsuredPersonIds.length < 10) {
        state.selectedInsuredPersonIds.push(id);
      } else {
        Toast("最多可选择10个被保人");
      }
    }
  },
  togglePolicyHolder (state, id) {
    state.selectedPolicyHolderId = id;
  },
  confirmInsuredPerson (state, persons) {
    state.insuredPerson = persons;
  },
  confirmPolicyHolder (state, person) {
    if (person) {
      state.policyHolder = person;
    }
  },
  setInsuranceDate (state, payload) {
    state.startDate = payload.day1;
    state.endDate = payload.day2;
  },
  setInsurancePrice (state, price) {
    state.productDetail.price = price;
  }
};

export default {
  state,
  mutations
};
