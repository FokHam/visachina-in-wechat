const state = {
  visaCondition:{"ct":"24","ctname":"日本","dq":"141","dqname":"广东省","lx":0,"rj":0,"fw":0,"page":1},
  materialsData:{},
  orderPageData:{
    "passenger":{},
    "contact":{},
    "express":{},
    "invoice":{}
  }
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
