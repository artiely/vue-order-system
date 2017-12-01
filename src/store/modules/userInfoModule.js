//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import api from '../../api/api.js'
import {MessageBox} from 'mint-ui'
import router from '../../router'

Vue.use(Vuex)

const state = {//状态
  token: null, //就是userid
  personId: '',
  lang: '',
  accountState: '',
  accountInfo: '',
  isCompany: true,// 判断当前用户是个人还是公司
  isGuest: false,// 判断当前用户是否是游客
  customerNotificationList: [],
  hasTelphone: '' // 是否绑定了手机号
}

const mutations = {//状态只能通过此改变
  ['LOGIN'](state, payload) {
    state.token = payload.userId
    if (payload.personId) {
      state.personId = payload.personId
      sessionStorage.setItem('personId', payload.personId)
    }
    sessionStorage.setItem('token', payload.userId)
  },
  ['LOGOUT'](state) {
    state.token = null
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('personId')
  },
  ['SET_LANG'](state, payload) {
    state.lang = payload
  },
  ['SET_ACCOUNT_STATE'](state, payload) {
    state.accountState = payload
  },
  ['IS_COMPANY'](state, payload) {
    state.isCompany = payload
  },
  ['IS_GUEST'](state, payload) {
    state.isGuest = payload
    sessionStorage.setItem('isGuest', payload)
  },
  ['SET_ACCOUNT_INFO'](state, payload) {
    state.accountInfo = payload
  },
  ['C_NOTIFICATION_LIST'](state, payload) {
    state.customerNotificationList = payload
  },
  ['GUEST_TIP'](state, payload) {
    if (state.isGuest) {
      MessageBox.confirm(this.$t('message.isGuest')).then(action => {
        router.push('/login')
      });
      return true
    } else {
      return false
    }
  },
  ['HAS_TELHPONE'](state, payload) {
    state.hasTelphone = payload
  }
}
const actions = {
  login: ({commit}, payload) => {
    commit('LOGIN', payload)
  },
  /**
   * 判断当前的账号类型，state==2 为公司 ==1为个人
   * @param commit
   * @param payload
   */
  isCompany_action: ({commit}, payload) => {
    api.CHECK_ACCOUNT_TYPE().then(res => {
      if (res.code == 0) {
        if (res.state == 2) {
          commit('IS_COMPANY', true)
        } else {
          commit('IS_COMPANY', false)
        }
      } else {
        alert('获取账号类型错误', JSON.stringify(res))
      }
    })
  },
  /**
   * 获取当前账号的信息
   * @param commit
   * @param payload
   */
  getAccountInfo: ({commit, state}, payload) => {
    api.get_person_info({personId: state.personId}).then(res => {
      if (res.code == 0) {
        commit('SET_ACCOUNT_INFO', res.person)
      } else {
        alert('获取账号信息错误', JSON.stringify(res))
      }

    })
  },
  /**
   * 获取消息
   * */
  getCustomerNotification: ({commit, state}, payload) => {
    api.get_notification_list().then(res => {
      if (res.code == 0) {
        // this.customerNotificationList = res.customerNotificationList
        commit('C_NOTIFICATION_LIST', res.customerNotificationList)
      } else {
        alert(`获取消息` + res.msg)
      }
    })
  },
  hasTelphone: ({commit, state}, payload) => {
    api.CHECK_BIND_MOBILE().then(res => {
      if (res.code == 0) {
        if (res.exist == '1') { // 有手机号了
          commit('HAS_TELHPONE', true)
        } else {
          commit('HAS_TELHPONE', false)
          MessageBox.alert(this.$t('message.no_phone_num')).then(action => {
            router.push('/info')
          });
        }
      }
    })
  }

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
