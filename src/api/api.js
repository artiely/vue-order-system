/**
 * Created by Administrator on 2017/7/20.
 */
import fetch from './fetch'

/**
 *
 * @params{loginNum:登录次数,userName:用户名,password:密码}
 *  "username=" + this.username + "&password=" + this.password + "&captcha=" + this.captcha+"&loginNum=1"
 */
const login = params => {
  return fetch({
    url: "/sys/login",
    method: 'post',
    data: params
  })
};
/**
 * 获取用户的id 此处暂时作为token使用
 */
const get_user_id = params => {
  return fetch({
    url: '/sys/user/info',
    method: 'get',
    params: params
  })
};

/**
 * 获取服务点
 */

const get_service_address = params => {
  return fetch({
    url: "/company/getServiceAddress",
    method: 'get',
    params: params
  })
};

/**
 * 保存服务点地址
 */
const save_service_address = params => {
  return fetch({
    url: '/company/saveByUser',
    method: 'post',
    data: params
  })
};

/**
 * 删除服务点地址
 */
const delete_service_address = params => {
  return fetch({
    url: '/company/deleteByUser',
    method: 'post',
    data: params
  })
}

/**
 * [get_order_list 获取订单列表]
 *  @params:
 *   {
 *   limit:'条数',
 *   page:'页码',
 *   order:'asc排序',
 *   orderStateId:'订单状态id',
 *   contractId:'未知',
 *   startDate:'开始日期',
 *   endDate:'结束日期',
 *   companyId:'公司id',
 *   on:'订单编号',
 *   yh:'用户',
 *   sfzc:'是否驻场 false',
 *   sfxc:'是否现场 false',
 *   sfbx:'是否报修 false',
 *
 *   }
 */
const get_order_list = params => {
  return fetch({
    url: '/orderinfo/listVo',
    method: 'get',
    params: params
  })
}
/**
 * [get_order_count 获取订单数量]
 * @params  {orderStateIds: [1, 2, 3, 4, 5, 6, 7, 8,9]]
 * 1 待处理
 * 2 已过期
 * 3 处理中
 * 4 待评价
 * 5 价格待确定
 * 6 待付款
 * 7 全部
 * 8 已取消
 * 9 已完成
 * 顺序需要与页面保持一致
 */
const get_order_count = params => {
  return fetch({
    url: '/orderinfo/count',
    method: 'get',
    params: params
  })
}
/**
 * 获取用户列表
 * @params  {companyId 公司id}
 */
const get_yh = params => {
  return fetch({
    url: '/person/getCustomerUser',
    method: 'get',
    params: params
  })
}
/**
 * 获取订单的详情
 * @params  {callId:订单的callId}
 */
const get_order_detail = params => {
  return fetch({
    url: '/calldetail/listVo',
    method: 'get',
    params: params
  })
}
/**
 * 取消订单
 * @params  {id: 工单id, fwoneCheckState: 20 审核状态20 表示用户已删除}
 */
const delete_order_updata = params => {
  return fetch({
    url: '/orderinfo/update',
    method: "post",
    data: params
  })
}

/**
 * 获取投诉列表
 * @params: {page: _this.page2, limit: 10, status: 2}}
 * status :0 待处理 ：2已受理 ：3已完成
 */
const get_complain_list = params => {
  return fetch({
    url: '/customercomplain/list',
    method: 'get',
    params: params
  })
}

/**
 * 投诉数量
 * @param params
 */
const get_complain_count = params => {
  return fetch({
    url: '/customercomplain/count',
    method: 'get',
    params: params
  })
}

/**
 * 更新投诉评分
 * @data { id: this.detailData.id, rating: this.detailData.rating, status: 3}
 */
const update_complain_rating = params => {
  return fetch({
    url: '/customercomplain/update',
    method: 'post',
    data: params
  })
}

/**
 * 获取催单列表
 * @params {page limit}
 */
const get_reminder_list = params => {
  return fetch({
    url: '/callreminder/list',
    method: 'get',
    params: params
  })
}

/**
 * 获取用户信息
 * @param personId
 */
const get_person_info = params => {
  return fetch({
    url: `/person/infoVo/${params.personId}`,
    method: 'get',
    params: ''
  })
}

/**
 * 获取消息
 * @param params
 */
const get_notification_list = params => {
  return fetch({
    url: '/customernotification/queryUnreadList',
    method: 'get',
    params: params
  })
}

const read_notification = params => {
  return fetch({
    url: `/customernotification/read/${params.tableNmae}/${params.tableId}`,
    method: 'get'
  })
}

const apiObj = {
  login,
  get_user_id,
  get_service_address,
  save_service_address,
  delete_service_address,
  get_order_list,
  get_order_count,
  get_order_detail,
  get_yh,
  delete_order_updata,
  get_complain_list,
  get_complain_count,
  update_complain_rating,
  get_reminder_list,
  get_person_info,
  get_notification_list,
  read_notification
}

export default apiObj
