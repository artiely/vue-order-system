//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'
import {Toast} from 'mint-ui';

Vue.use(Vuex)
const state = { //状态
  callId: '', //点击的工单的id ()
  detail: '', //工单详情的数据
  orderInfo: {},// 工单的信息
  workFlow: '',
  oid: '', //详情页面的ordernum
  type: '',// 521 驻场远程电话
  detailVisiable: false
}

const mutations = { //状态只能通过此改变

  ['NEW_DETAIL'](state, payload) {
    state.detail = payload
    state.workFlow = payload.workFlow
  },
  ['GET_ORDER_NUMBER'](state, payload) {
    state.oid = payload.oid
    state.callId = payload.id
    if (payload.type) {
      state.type = payload.type
      sessionStorage.type = payload.type
    }
    sessionStorage.oid = payload.oid
    sessionStorage.id = payload.id
  },
  ['SET_ORDER_NUMBER'](state, payload) {
    state.oid = payload
    sessionStorage.oid = payload
  },
  ['SET_ORDER_INFO'](state, payload) {
    state.orderInfo = payload
    sessionStorage.orderInfo = JSON.stringify(payload)
  },
  ['TOGGLE_DETAIL_SHOW'](state, payload) {
    state.detailVisiable = !state.detailVisiable
  }
}
const actions = {

  new_detail: ({commit}, payload) => {
    //秒级不显示loading,1秒后若载不出显示loading
    // let loading=false,instance2;
    // setTimeout(() => {
    //   if (!loading)
    //     instance2 = Toast({duration: -1, message: 'loading...', iconClass: 'iconfont icon-loading2 icon-rock'});
    // },1000)
    commit('GET_ORDER_NUMBER', payload);
    if (!state.callId || state.callId == 'null') {
      // loading=true
      // if (instance2)
      //   instance2.close();
      return
    }
    api.get_order_detail({callId: state.callId}).then(res => {
      commit('NEW_DETAIL', res)
      if (res.code == ERR_OK) {
        commit('NEW_DETAIL', res) //根据id获取数据
      } else {
        alert(res.msg)
      }
      // loading=true
      // if (instance2)
      // setTimeout(() => {
      //   instance2.close();
      // }, 100)
      if (payload.showDetail)
        state.detailVisiable = !state.detailVisiable
    }).catch(err => console.error(err))
  },

}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
