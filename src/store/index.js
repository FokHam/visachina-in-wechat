import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import insurance from './modules/insurance'
import hotel from './modules/hotel'

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    insurance,
    hotel
  }
})
