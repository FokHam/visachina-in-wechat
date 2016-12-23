const state = {
  insCheck:false,  
  apllyMenber:[{"check":false,"name":"张三","birthday":"2016-1-1","type":"自由职业","idnum":"202525198703225658"},{"check":false,"name":"李四","birthday":"2016-1-1","type":"退休人员","idnum":"420525198703225688"},{"check":false,"name":"王五","birthday":"2016-1-1","type":"在职","idnum":"352525198703227775"}],
  insMenber:[],
  orderInfo:{
    "estimated_date":"",
    "contact_info":{"name":"","phone":"","email":""},
    "delevery_info":{"type":"快递","express":"顺丰","name":"Jason","phone":"15689562587","province":"广东省","city":"深圳市","area":"罗湖区","address":"迎春路海外联谊大厦"}
  }
};

const mutations = {
  visaOrder_insCheck (state, payload) {
    state.insCheck = payload
  },
  visaOrder_apllyMenber (state, payload) {
    state.apllyMenber = payload
  },
  visaOrder_apllyMenber_add (state, payload) {
    state.apllyMenber.push(payload)
  },
  visaOrder_apllyMenber_edit (state, payload) {
    state.apllyMenber[payload.id].name = payload.name
    state.apllyMenber[payload.id].type = payload.type
    state.apllyMenber[payload.id].birthday = payload.birth
  }

};

const actions = {
  
};

export default {
  state,
  mutations,
  actions
};
