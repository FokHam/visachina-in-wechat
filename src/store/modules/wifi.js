const state = {
  wifiCondition:{"name":"","area_id":"","city":"","cityname":"","page":1,"pagesize":10}
};

const mutations = {
  wifiConditionSave (state, obj) {
    state.wifiCondition.name = obj.name;
    state.wifiCondition.area_id = obj.area_id;
  },
  wifiConditionCity(state, obj) {
    state.wifiCondition.cityname = obj.name;
    state.wifiCondition.city = obj.area_id;
  }
};

const actions = {
  
};

export default {
  state,
  mutations,
  actions
};
