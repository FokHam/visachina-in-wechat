import { Toast } from 'mint-ui';

const state = {
  productId: 0,
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
    state = {
      productId: 0,
      selectedInsuredPersonIds: [],
      selectedPolicyHolderId: "",
      insuredPerson: [],
      policyHolder: {},
      destinaiton: []
    };
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
  }
};

const actions = {
  increment (context, payload) {
    context.commit("increment", payload);
  },
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit("increment");
    }, 1000);
  }
};

export default {
  state,
  mutations,
  actions
};
