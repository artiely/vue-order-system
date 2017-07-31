import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'n-zepto'
Vue.use(Vuex);
import detailModule from  './modules/orderDetailModule'
import orderModule from  './modules/orderListModule'
import complainModule from  './modules/complainModule'
import userInfoModule from  './modules/userInfoModule'
import urgeModule from  './modules/urgeModule'

const store = new Vuex.Store({
  modules:{
    detail:detailModule,
    order:orderModule,
    complain:complainModule,
    userInfo:userInfoModule,
    urge:urgeModule,

  }
 })
export default store