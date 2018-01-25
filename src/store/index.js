import Vue from 'vue'
import Vuex from 'vuex'

if (process.env.NODE_ENV === 'development') {
// Vue.use(Vuex)
}
Vue.use(Vuex)
import detailModule from  './modules/orderDetailModule'
import userInfoModule from  './modules/userInfoModule'

const store = new Vuex.Store({
  modules:{
    detail:detailModule,
    userInfo:userInfoModule,
  }
 })
export default store
