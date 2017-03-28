const state = {
  visaCondition:{"ct":"24","ctname":"日本","dq":"141","dqname":"广东省","ty":0,"rj":0,"fw":0,"page":1},
  materialsData:{},
  orderPageData:{
    "passenger":[],
    "contact":{"name":"","tel":"","email":""},
    "express":{"name":"","phone":"","province":"","city":"","zone":"","address":""},
    "invoice":{"need":0,"type":1,"memo":"","header":"","number":"","shippingId":"","shippingInfo":{"name":"","phone":"","province":"","city":"","zone":"","address":""}}
  }
};

const mutations = {
  searchConditionSave (state, obj) {
    state.visaCondition = obj;
  },
  materialsDataSave (state, obj) {
    state.materialsData = obj;
  },
  orderDataSave (state, obj) {
    state.orderPageData = obj
  },
  orderDataClear (state, obj) {
    state.orderPageData = {
      "passenger":[],
      "contact":{"name":"","tel":"","email":""},
      "express":{"name":"","phone":"","province":"","city":"","zone":"","address":""},
      "invoice":{"need":0,"type":1,"memo":"","header":"","shippingId":"","shippingInfo":{"name":"","phone":"","province":"","city":"","zone":"","address":""}}
    }
  }

};

const actions = {
  
};

export default {
  state,
  mutations,
  actions
};
