const state = {
  visaCondition:{"ct":"","ctname":"","dq":"","dqname":"","lx":0,"rj":0,"fw":0,"page":1},
  materialsData:{}
};

const mutations = {
  searchConditionSave (state, obj) {
    state.visaCondition = obj;
  },
  materialsDataSave (state, obj) {
    state.materialsData = obj;
  }
};

const actions = {
  
};

export default {
  state,
  mutations,
  actions
};
