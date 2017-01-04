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
    state.productId = 0;
    state.startDate = startDate;
    state.endDate = endDate;
    state.roomType = 0;
    state.adultNum = 2;
    state.childNum = 0;
    state.childAge = [];
    state.roomNum = 1;
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
  },
  setHotelDate (state, payload) {
    state.startDate = payload.day1;
    state.endDate = payload.day2;
  }
};

const actions = {

};

export default {
  state,
  mutations,
  actions
};
