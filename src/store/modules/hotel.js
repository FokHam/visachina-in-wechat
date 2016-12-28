const state = {
  productId: 0,
  startDate: "",
  endDate: "",
  roomType: 0,
  adultNum: 2,
  childNum: 0,
  childAge: [],
  roomNum: 1
};

const mutations = {
  resetState (state) {
    state = {
      productId: 0,
      startDate: "",
      endDate: "",
      roomType: 0,
      adultNum: 2,
      childNum: 0,
      childAge: [],
      roomNum: 1
    };
  },
  setNum (state, payload) {
    state[payload.type] = payload.num;
  }
};

const actions = {

};

export default {
  state,
  mutations,
  actions
};
