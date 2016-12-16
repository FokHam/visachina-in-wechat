import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import Mock from 'mockjs'
import $ from 'jquery'
import 'mint-ui/lib/style.css'

import App from './App'
import Home from './views/home/Home'
import VisaList from './views/visa/VisaList'
import InsuranceIndex from './views/insurance/InsuranceIndex'
import InsuranceList from './views/insurance/InsuranceList'
import InsuranceDetail from './views/insurance/InsuranceDetail'
import InsuranceSpecific from './views/insurance/InsuranceSpecific'
import WifiList from './views/wifi/WifiList'
import HotelList from './views/hotel/HotelList'

import store from './store/index.js'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);

const routes = [{
  path: "/",
  component: Home
},{
  path: "/home",
  component: Home
},{
  path: "/visa",
  component: VisaList
},{
  path: "/insurance",
  component: InsuranceIndex
},{
  path: "/insuranceList/:type",
  component: InsuranceList
},{
  path: "/insuranceDetail/:id",
  component: InsuranceDetail
},{
  path: "/insuranceSpecific/:id",
  component: InsuranceSpecific
},{
  path: "/wifi",
  component: WifiList
},{
  path: "/hotel",
  component: HotelList
}];

const resource = "/src/assets";
const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
