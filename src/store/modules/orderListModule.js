//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'n-zepto'
import moment from 'moment'
Vue.use(Vuex);

const state = {//状态
  orderinfo: [],//订单list
  totalPage: 1,
  popupVisible: false,//筛选的
  activeIndex:[0,1,2,3,4,5,7,6],//选中的 //    :class="{'active':index==query.orderStateId-1}"
  query: { //查询参数
    limit: 10,
    page: 1,
    sidx: '',
    order: 'asc',
    orderStateId: 1,
    startDate: moment().subtract(3, 'month').startOf('month').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    companyId: '',
    contractId: 1950,
    on: '',
    yh: '',
    sfzc: false,
    sfxc: false,
    sfbx: false
  },
  serviceAddress: [],//选择服务地址的列表
  yhArr: [],//选择用户的列表
  status: [// 状态
    {name: '待处理', count: 0},
    {name: '已过期', count: 0},
    {name: '处理中', count: 0},
    {name: '待评价', count: 0},
    {name: '待定价', count: 0},
    {name: '待付款', count: 0},
    {name: '已取消', count: 0},
    {name: '全部', count: 0}]

};

const mutations = {
['GET_DATA'](state){//获取数据
    var query=state.query ;
   /* if (query.page == 1) {//如果是第一页重新加载数据
      state.orderinfo = [];
      state.totalPage = 2;
    }
    if (query.page > state.totalPage) {//不是第一页 无限加载 到完毕返回
      console.info('扯完了！');
      if (cb ) {
        cb()
      }
      return
    }*/
    var url_query =
      '?&limit=8&page=' + query.page + '&sidx=&order=asc&orderStateId=' + query.orderStateId + '&contractId=1950&startDate='+query.startDate+'&endDate='+query.endDate+'&companyId='+query.companyId+'&on='+query.on+'&yh='+query.yh+'&sfzc='+query.sfzc+'&sfxc='+query.sfxc+'&sfbx='+query.sfbx+'';
    axios({
      method: 'get',
      url: '/orderinfo/listVo' + url_query
    }).then(function (r) {
      if (r.data.code == 0) {
        var list = state.orderinfo.concat(r.data.page.list);
        state.totalPage = r.data.page.totalPage;
        state.orderinfo = list;
      } else {
        Toast('系统繁忙...请稍后重试...');
      }
    }).catch(function (error) {
      console.error(error+'done is not a function错误可忽略...');
    })
  },

};
const actions = {
  get_data: ({commit}, payload)=> {
      commit('GET_DATA')
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}