let d = new Date();
d.setHours(0);
d.setMinutes(0);
d.setSeconds(0);
d.setMilliseconds(0);
let startDate = new Date(d.getTime() + 24*60*60*1000);
let endDate = new Date(d.getTime() + 2*24*60*60*1000);
let state = {
  destination: "",
  productId: 0,
  startDate: startDate,
  endDate: endDate,
  roomType: 0,
  adultNum: 2,
  childNum: 0,
  childAge: [],
  roomNum: 1,
  checkInDate: "",
  checkOutDate: "",
  hotelDetail: {}
};

const mutations = {
  resetHotelState (state) {
    state = {
      productId: 0,
      startDate: startDate,
      endDate: endDate,
      roomType: 0,
      adultNum: 2,
      childNum: 0,
      childAge: [],
      roomNum: 1,
      hotelDetail: {}
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
  setHotelProductId (state, payload) {
    state.productId = payload.id;
  },
  setHotelDetail (state, payload) {
    state.hotelDetail = payload.hotelDetail;
  },
  setHotelDate (state, payload) {
    state.startDate = payload.day1;
    state.endDate = payload.day2;
  },
  searchHotelConditionSave (state, payload) {
    state.startDate = payload.startDate;
    state.endDate = payload.endDate;
    state.destination = payload.destination;
  }
};

const actions = {

};

export default {
  state,
  mutations,
  actions
};
