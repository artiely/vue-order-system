//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
// import Cookies from 'js-cookie'
Vue.use(Vuex)

const state = {//状态
  token: null, //就是userid
  personId: '',
  lang: '',
  accountState: '',
  isCompany: true
}

const mutations = {//状态只能通过此改变
  ['LOGIN'](state, payload){
    state.token = payload.userId
    if (payload.personId) {
      state.personId = payload.personId
      // sessionStorage.personId = payload.personId;
      sessionStorage.setItem('personId', payload.personId)
      // Cookies.set('personId', payload.personId)
    }
    // sessionStorage.token = payload.userId;
    sessionStorage.setItem('token', payload.userId)
    // Cookies.set('token', payload.userId)
  },
  ['LOGOUT'](state){
    state.token = null
    sessionStorage.removeItem('token')
    // Cookies.remove('token')
    sessionStorage.removeItem('personId')
    // Cookies.remove('personId')
  },
  ['SET_LANG'](state, payload){
    state.lang = payload
  },
  ['SET_ACCOUNT_STATE'](state, payload){
    state.accountState = payload
  },
  ['IS_COMPANY'](state, payload){
    state.isCompany = payload
  }
}
const actions = {
  login: ({commit}, payload) => {
    commit('LOGIN', payload)
  },
  /**
   * 检查账号信息是否完整，是否在审核中 state=4 信息不完整 state=7 审核中 state=8 拒绝
   * @param commit
   * @param payload
   */
  // checkAccount: ({commit}, payload) => {
  //   let redirect = decodeURIComponent(this.$route.query.redirect || '/')
  //   this.$api.CHECK_ACCOUNT().then(res => { // 判断注册信息是否完善
  //     if (res.code === 0) {
  //       if (res.state == 4) { // 不完善
  //         this.$router.push('/type?state=4')
  //         commit('SET_ACCOUNT_STATE', 4)
  //         return
  //       } else if (res.state == 7) {
  //         this.$router.push('/reject?state=7')
  //         commit('SET_ACCOUNT_STATE', 7)
  //         return
  //       } else if (res.state == 8) {
  //         this.$router.push('/reject?state=8')
  //         commit('SET_ACCOUNT_STATE', 8)
  //         return
  //       } else {
  //         this.$router.push({ // 跳到对应页面
  //           path: redirect
  //         })
  //       }
  //     } else {
  //       alert(JSON.stringify(res))
  //     }
  //   })
  // }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
