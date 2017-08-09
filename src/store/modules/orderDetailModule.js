//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'
Vue.use(Vuex);
const state = { //状态
  callId: '', //点击的工单的id ()
  detail: '', //工单详情的数据
  workFlow: '',
  oid: '', //详情页面的ordernum
  type:''// 521 驻场远程电话

};

const mutations = { //状态只能通过此改变

  ['NEW_DETAIL'](state, payload) {
    state.detail = payload;
    state.workFlow = payload.workFlow;
  },
  ['GET_ORDER_NUMBER'](state, payload) {
    state.oid = payload.oid;
    state.callId = payload.id;
    state.type=payload.type;
    sessionStorage.oid = payload.oid;
    sessionStorage.id = payload.id;
    sessionStorage.type = payload.type;
  },
};
const actions = {

  new_detail: ({commit}, payload) => {
    commit('GET_ORDER_NUMBER', payload);
    api.get_order_detail({callId: state.callId}).then(res => {
      commit('NEW_DETAIL', res);
      if (res.code == ERR_OK) {
        commit('NEW_DETAIL', res) //根据id获取数据
      } else {
        alert(res.msg)
      }
    }).catch(err => console.error(err))
  },

};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}
