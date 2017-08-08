//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {//状态
  token: null, //就是userid
  personId: '',
};

const mutations = {//状态只能通过此改变
  ['LOGIN'](state, payload){
    state.token = payload.userId;
    if (payload.personId) {
      state.personId = payload.personId;
      sessionStorage.personId = payload.personId;
    }
    sessionStorage.token = payload.userId;
  },
  ['LOGOUT'](state){
    state.token = null;
    sessionStorage.removeItem('token');
  },
};
const actions = {
  login: ({commit}, payload) => {
    commit('LOGIN', payload);
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}
