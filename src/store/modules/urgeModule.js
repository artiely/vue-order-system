//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'n-zepto'
Vue.use(Vuex);

const state = {//状态
  orderList:[],
    page:1
};

const mutations = {//状态只能通过此改变
  ['GET_URGE_DATA'](state,payload){
    state.orderinfo=payload;
    var _this=state;
    if(payload.refresh==true){
      state.page=1;
      state.orderList=[];
    }else {
      state.page++
    }
    axios({
      url:localPath+'/callreminder/list',
      params:{page:state.page,limit:8}
    }).then(function(r){
      state.orderList = state.orderList.concat( r.data.list );
      payload.cb()
    })
  },
};
const actions = {
  get_urge_data:({commit},payload)=>{
    commit('GET_URGE_DATA',payload)
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}