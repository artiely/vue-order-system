//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'n-zepto'
Vue.use(Vuex);

const state = {//状态
  callId: '',//点击的工单的id (无实际用处)
  detail: '',//工单详情的数据
  workFlow:'',
  status:'',
  thisStep:[0,0,0,0,0,0,0,0],
  oid:'',//详情页面的ordernum
  btnState:{
    cuidan:false,
    pingjia:false,
    zhuiping:false,
    tousu:true,
    fapiaocuichu:false,
    fapiaoxinxiyouwu:false
  },
};

const mutations = {//状态只能通过此改变
  //GET_DETAIL(state, id) {//第一个参数是state 第二个可以传递数据
  //  state.callId = id;
  //},
  ['NEW_DETAIL'](state,payload){
    state.detail=payload.data;
    state.workFlow=payload.data.workFlow;
    let workFlow=state.workFlow

    //---------------s
    if (workFlow.score > 0) {
      //$('#ratingB').rating('update', workFlow.score);
      //$('#score').removeClass("ishide");
    }
    if ((workFlow.receiveStateMin == 70 && workFlow.callStateMin == 11000)) {
      state.status='已完成';
      $('#ts').addClass("ishide");//隐藏投诉
      state.thisStep=[1,1,1,1,1,1,1,2]
      state.btnState.zhuiping=true
      state.btnState.tousu=false
    } else if (workFlow.receiveStateMax < 70 && workFlow.receiveStateMin > 40 && workFlow.callStateMin == 11000) {
      state.thisStep=[1,1,1,1,1,1,2,0];
      state.status='付款';
      $('#fpcc').removeClass("ishide");//发票催促
      state.btnState.fapiaocuichu=true
    } else if (workFlow.receiveStateMin == 11000 && workFlow.receiveStateMax < 50 && workFlow.receiveStateMin >= 0 && workFlow.receiveStateMin != "") {
      state.status='发票寄出';
      $('#fpxxyw').removeClass("ishide");//发票信息有误
      state.thisStep=[1,1,1,1,1,2,0,0]
      state.btnState.fapiaoxinxiyouwu=true
    } else if (workFlow.auditStatusMin != 11000 && workFlow.callStateMin == 11000) {
      state.thisStep=[1,1,1,1,2,0,0,0];
      state.status='价格确认';

    } else if (workFlow.callStateMax > 0) {
      if (workFlow.callStateMin > 6000) {
        state.thisStep=[1,1,1,2,0,0,0,0];
        state.status='客户签字';
        if (workFlow.score == 0) {
          $('#pj').removeClass("ishide");//评价
          state.btnState.pingjia=true
          state.btnState.zhuiping=false
        } else {
          $('#zp').removeClass("ishide");//追评
          state.btnState.pingjia=false
          state.btnState.zhuiping=true
        }
      }
      else if (workFlow.callStateMin < 7000 && workFlow.callStateMax > 3000){
        state.status='到达';
        state.thisStep=[1,1,2,0,0,0,0,0]}
      else if (workFlow.callStateMax == 3000) {
        state.thisStep=[1,2,0,0,0,0,0,0];
        state.status='出发';
        $('#cd').removeClass("ishide");//催单
        state.btnState.cuidan=true
      }
      else if (workFlow.callStateMax < 3000 && workFlow.callStateMax > 1000) {
        state.thisStep=[2,0,0,0,0,0,0,0];
        state.status='接受';
        $('#cd').removeClass("ishide");//催单
        state.btnState.cuidan=true
      }
      else if (workFlow.callStateMax == 1000) {
        state.thisStep=[0,0,0,0,0,0,0,0];
        state.status='下单';
        $('#cd').removeClass("ishide");//催单
        state.btnState.cuidan=true
        state.btnState.tousu=false
      }
    }
    if (workFlow.callStateMax > 0) {
      if (workFlow.callStateMin > 6000) {
        //state.thisStep=[1,1,1,2,0,0,0,0];
        state.status='客户签字';
        if (workFlow.score == 0) {
          $('#pj').removeClass("ishide");//评价
          state.btnState.pingjia=true
          state.btnState.zhuiping=false
        } else {
          $('#zp').removeClass("ishide");//追评
          state.btnState.zhuiping=true
          state.btnState.pingjia=false
        }
      }}
    //---------------e
  },
  ['GET_ORDER_NUMBER'](state,payload){
    state.oid=payload.oid;
    state.callId=payload.id;
    sessionStorage.oid=payload.oid;
    sessionStorage.id=payload.id;
  },
};
const actions = {
  //GET_DETAIL: ({commit}, id)=>commit('GET_DETAIL', id), // 在actions中调用 mutations中的函数 GET_DETAIL 为actions的方法名 'GET_DETAIL' 为muations中的函数名 可以不一样 ，actions中的函数就可以在组件中调用  this.$store.dispatch('GET_DETAIL',123)
  get_order_number:({commit},payload)=>{
    commit('GET_ORDER_NUMBER',payload)
  },
  new_detail: ({commit}, payload)=> {
    //commit('GET_ORDER_NUMBER',payload);//获取orderNumber
    commit('NEW_DETAIL', {data:{workFlow:[]}})
    axios({
      url: localPath+'/calldetail/listVo?callId=' + state.callId + '',
      dataType: 'json',
    }).then(function (r) {
      console.log("读取详情", r)
      commit('NEW_DETAIL', r) //根据id获取数据
    }).catch(function (error) {
      console.error("读取详情报错", error)
    })
  },

};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}