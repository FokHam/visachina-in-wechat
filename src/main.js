import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui'
import Mock from 'mockjs'
import $ from 'jquery'
import 'mint-ui/lib/style.css'

import App from './App'
import Home from './components/Home'
import VisaList from './views/visa/VisaList'
import InsuranceIndex from './views/insurance/InsuranceIndex'
import InsuranceList from './views/insurance/InsuranceList'
import WifiList from './views/wifi/WifiList'
import HotelList from './views/hotel/HotelList'

Vue.use(VueRouter);
Vue.use(VueResource);

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
  path: "/wifi",
  component: WifiList
},{
  path: "/hotel",
  component: HotelList
},{
  path: "/insuranceList/:type",
  component: InsuranceList
}];

const resource = "/src/assets";

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
