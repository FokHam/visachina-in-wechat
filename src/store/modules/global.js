const state = {
  shop_info:{"name":"","logo":"","phone":"","email":""}
};

const mutations = {
  shopInfoSave (state, obj) {
    state.shop_info = obj;
  }
};

const actions = {
  
};

export default {
  state,
  mutations,
  actions
};
