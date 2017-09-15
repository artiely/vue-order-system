//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'n-zepto'
import moment from 'moment'
Vue.use(Vuex);

const state = {//状态
  selected: '1',
  dataList1: [],
  dataList2: [],
  dataList3: [],
  callId: '',
  page1: 0,
  page2: 0,
  page3: 0,
  count: [0, 0, 0]
};

const mutations = {
  ['GET_DATA_1'](state, payload){//获取数据
    // console.log("参数", payload);
    if(payload.refresh==true){
      state.page1=1;
      state.dataList1=[]
    }else{
      state.page1++
    }
    let _this = state;
    let url = localPath+'/customercomplain/list';
    axios({url: url, type: 'get', params: {page: _this.page1, limit: 10, status: 0}}).then(function (r) {
      // console.log(r.data.list);
      _this.dataList1 = _this.dataList1.concat(r.data.list);
      payload.cb()
    })
  },
  ['GET_DATA_2'](state, payload){//获取数据

    // console.log("参数", payload)
    if(payload.refresh==true){
      state.page2=1;
      state.dataList2=[]
    }else{
      state.page2++
    }
    let _this = state;
    let url = localPath+'/customercomplain/list';
    axios({url: url, type: 'get', params: {page: _this.page2, limit: 10, status: 2}}).then(function (r) {
      // console.log(r.data.list);
      _this.dataList2 = _this.dataList2.concat(r.data.list)
      payload.cb()
    })

  },
  ['GET_DATA_3'](state, payload){//获取数据
    // console.log("参数", payload)
    if(payload.refresh==true){
      state.page3=1;
      state.dataList3=[]
    }else{
      state.page3++
    }
    let _this = state;
    let url = localPath+'/customercomplain/list';
    axios({url: url, type: 'get', params: {page: _this.page3, limit: 10, status: 3}}).then(function (r) {
      // console.log(r.data.list);
      _this.dataList3 = _this.dataList3.concat(r.data.list)
      payload.cb()
    })
  },
  ['GET_COUNT'](state, payload){//获取数据
      let _this=state;
      axios({
        url:localPath+'/customercomplain/count',
      }).then(function(r){
        // console.log(r.data)
        _this.count=r.data
      }).catch(function(r){
        console.error(r)
      })
  },

};
const actions = {
  get_data_1: ({commit}, payload)=> {
    commit('GET_DATA_1', payload)
  },
  get_data_2: ({commit}, payload)=> {
    commit('GET_DATA_2', payload)
  },
  get_data_3: ({commit}, payload)=> {
    commit('GET_DATA_3', payload)
  },
  get_count:({commit},payload)=>{
    commit('GET_COUNT',payload)
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}
