import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import Mock from 'mockjs'
import $ from 'jquery'
import 'mint-ui/lib/style.css'

import './widget.js'
import App from './App'
import routes from './routes.js'
import store from './store/index.js'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);

const resource = "/src/assets";
const router = new VueRouter({routes});

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
