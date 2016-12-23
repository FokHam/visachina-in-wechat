import { Toast } from 'mint-ui';

const state = {
  productId: 0,
  selectedInsuredPersonIds: [],
  selectedPolicyHolderId: "",
  insuredPerson: [],
  policyHolder: {},
  destinaiton: ["英国", "美国", "意大利"]
};

const mutations = {
  increment (state, payload) {
    if (payload && payload.amount) {
      state.count += payload.amount;
      console.log(payload)
    } else {
      state.count += 1;
    }
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
    if (persons.length) {
      state.insuredPerson = persons;
    }
  },
  confirmPolicyHolder (state, person) {
    if (person) {
      state.policyHolder = person;
    }
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
