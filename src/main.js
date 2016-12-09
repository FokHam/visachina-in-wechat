import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import App from './App'
import Home from './components/Home'
import VisaList from './views/visa/VisaList'
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
  component: InsuranceList
},{
  path: "/wifi",
  component: WifiList
},{
  path: "/hotel",
  component: HotelList
}];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
