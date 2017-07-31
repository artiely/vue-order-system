//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'n-zepto'
import router from '../.././router/index'
Vue.use(Vuex);

const state = {//状态
  userInfo:'',
  token:null, //就是personid
  person:{personName:'',shortName:''}
};

const mutations = {//状态只能通过此改变
  ['LOGIN'](state,payload){
    state.token=payload;
    sessionStorage.token = payload;
  },
  ['PERSON_INFO'](state,payload){
    state.person=payload;
    sessionStorage.person = payload;
  },
  ['LOGOUT'](state,payload){
    state.token=null;
    sessionStorage.removeItem('token');
  },
};
const actions = {
  login:({commit},payload)=>{
    commit('LOGIN',payload);
  },
  person_info:({commit},payload)=>{
    $.ajax({
      url: localPath+'/person/infoVo/' + state.token,
      dataType: 'json',
      success: function (r) {
        if (r.code == 0) {
          commit('PERSON_INFO', r.person);
        } else {
          console.error('获取person失败')
        }
      }
    })
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}