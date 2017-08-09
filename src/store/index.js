import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import detailModule from  './modules/orderDetailModule'
import userInfoModule from  './modules/userInfoModule'

const store = new Vuex.Store({
  modules:{
    detail:detailModule,
    userInfo:userInfoModule,
  }
 })
export default store
