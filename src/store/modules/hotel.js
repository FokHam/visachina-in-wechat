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
    let d = new Date();
    let startDate = new Date(d.getTime() + 24*60*60*1000);
    let endDate = new Date(d.getTime() + 2*24*60*60*1000);

    state = {
      productId: 0,
      startDate: startDate,
      endDate: endDate,
      roomType: 0,
      adultNum: 2,
      childNum: 0,
      childAge: [],
      roomNum: 1
    };
  },
  setNum (state, payload) {
    state[payload.type] = payload.num;
    if (payload.type === "childNum") {
      let diff = payload.num - state.childAge.length;
      if (diff > 0) {
        for (let i = 0; i < diff; i += 1) {
          state.childAge.push(0);
        }
      } else if (diff < 0) {
        for (let i = 0; i < -diff; i += 1) {
          state.childAge.pop();
        }
      }
    }
  },
  setChildAge (state, payload) {
    state.childAge[payload.index] = payload.age;
  },
  setPid (state, payload) {
    state.productId = payload.id;
  }
};

const actions = {

};

export default {
  state,
  mutations,
  actions
};
