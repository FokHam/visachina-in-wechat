const state = {
  count: 0
};

const mutations = {
  increment (state, payload) {
    if (payload && payload.amount) {
      state.count += payload.amount;
      console.log(payload)
    } else {
      state.count += 1;
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
