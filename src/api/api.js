/**
 * Created by Administrator on 2017/7/20.
 */
import fetch from './fetch'
import {isWeixnBrowser} from '@/utils'

/**
 *
 * @params{loginNum:登录次数,userName:用户名,password:密码}
 *  "username=" + this.username + "&password=" + this.password + "&captcha=" + this.captcha+"&loginNum=1"
 */
const login = params => {
  return fetch({
    url: '/sys/login',
    method: 'post',
    data: params
  })
}

/**
 *  初始化微信openId
 * @params
 */
const initWeiXinOpenId = (params, redirect) => {
  if (isWeixnBrowser()) {
    //window.location.href=SERVER_BASE_URL+'/oauth2/toOauth?'+params+'&fromUrl='+window.location.href.split('#')[0]+''+redirect;
    var fromUrl = window.location.href.replace(/(\/?#.*)/g, '//' + redirect)
    window.location.href = SERVER_BASE_URL + '/oauth2/toOauth?' + params + '&fromUrl=' + fromUrl
    return true
  }
  return false
}
/**
 * 获取用户的id 此处暂时作为token使用
 */
const get_user_id = params => {
  return fetch({
    url: '/sys/user/info',
    method: 'get',
    params: params
  })
}

/**
 * 获取服务点
 */

const get_service_address = params => {
  return fetch({
    url: '/company/getServiceAddress',
    method: 'get',
    params: params
  })
}

/**
 * 保存服务点地址
 */
const save_service_address = params => {
  return fetch({
    url: '/company/saveByUser',
    method: 'post',
    data: params
  })
}

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
 *   timeType:0/1 保修时间/服务时间
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
 * @params  {id: 工单id, fwoneCheckState: 20 审核状态20 表示用户已删除,ordernumber}
 */
const delete_order_updata = params => {
  return fetch({
    // url: '/orderinfo/update',
    url: '/orderinfo/cancel',
    method: 'post',
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

/**
 * 读取消息
 * @param params
 */
const read_notification = params => {
  return fetch({
    url: `/customernotification/read/${params.tableName}/${params.tableId}`,
    method: 'get'
  })
}

/**
 * 获取子单
 * @param callId [String] 这个接口呢是用来判断是不是报修人的单 用来判断是否展示评论按钮
 */
const get_sub_order = params => {
  return fetch({
    url: '/orderinfo/evaluateCallDetailList',
    method: 'post',
    data: params
  })
}

/**
 * 评价子单
 * @params
 * callDetailIds:["523524"], 当前子单的id
 * comments:"追评2",评论的内容
 * onSiteScore:"1",现场工程师的评分(驻场)
 * score:1,总的评分
 * seatsScore:0, 坐席工程师的评分(非驻场)
 * serviceDeskScore:"1" 服务台的评分
 */

const rating_sub_order = params => {
  return fetch({
    url: '/orderinfo/evaluateByCallDetailIds',
    method: 'post',
    data: params
  })
}

/**
 * 催单
 * @param callId
 */
const reminder_order = params => {
  return fetch({
    url: '/callreminder/save',
    method: 'post',
    data: params
  })
}

/**
 * 投诉
 * @params
 * callId:"211677", //callId
 * comments:"",
 * complainDesc:"123", //投诉内容
 * complainTarget:[1, 1, 1],
 * contentId:1, //投诉内容  12345 响应不及时-其他
 * copyComplainTarget:[], //废弃
 * isEngineer:0,//废弃
 * isOther:0,//废弃
 * isServiceCenter:1,//废弃
 * tsName:["服务台", "工程师", "其他"]//废弃
 */
const complain_order = params => {
  return fetch({
    url: '/customercomplain/save',
    method: 'post',
    data: params
  })
}

/**
 * 获取价格曲线
 * @param params
 */
const get_price_line = params => {
  return fetch({
    url: '/oncall/getOncallReservationTime',
    method: 'post',
    data: params
  })
}

/**
 * oncall 下单
 * @param params
 */
const save_price_oncall = params => {
  return fetch({
    url: '/oncall/saveOncallPrice',
    method: 'post',
    data: params
  })
}

/**
 * 获取MA价格
 * @param params
 * {
 * amonut：1//工程师数量
 * companyIds：[1223] //公司id
 * faultDesc:"",
 * isReset:1,
 * isWorkDay:0
 * trDateFrom:"2017-08-11"
 * trDateTo:"2017-08-11"
 * trTimeFrom:"09:00"
 * trTimeTo:"18:00"
 * }
 */
const get_price_Ma = params => {
  return fetch({
    url: '/Tr/getTrPrice',
    method: 'post',
    data: params
  })
}

/**
 * Ma下单
 * @param params
 */
const save_price_Ma = params => {
  return fetch({
    url: '/Tr/saveTrOrder',
    method: 'post',
    data: params
  })
}

/**
 * 付款的
 * @param params
 */
const get_paid_charge = params => {
  return fetch({
    url: '/invoice/queryPaidCharge',
    method: 'get',
    params: params
  })
}

/**
 * 未付款的
 * @param params
 */
const get_unpaid_charge = params => {
  return fetch({
    url: '/invoice/queryUnPaidCharge',
    method: 'get',
    params: params
  })
}

/**
 * 获取付款的明细
 * @param params
 */
const get_contract_detail = params => {
  return fetch({
    url: '/contractservicedetails/getListByReceiveId',
    method: 'get',
    params: params
  })
}

/**
 * 获取子单历史评价
 * @param params
 */
const get_rating_history = params => {
  return fetch({
    url: '/orderinfo/queryEvaluateByCallDetailId',
    method: 'get',
    params: params
  })
}
/**
 * 支付
 * @param params
 */
const post_pay_ment = params => {
  return fetch({
    url: '/fwonePay/scanPay',
    method: 'get',
    params: params
  })
}

/**
 * 获取支付服务明细
 * @param params
 */
const get_call_detail = params => {
  return fetch({
    url: '/calldetail/simpleList',
    method: 'get',
    params: params
  })
}

/**
 * 验证邮箱是否存在
 * @param params
 */
const CHECK_EMAIL = params => {
  return fetch({
    url: '/sys/user/checkRegistEmail',
    method: 'get',
    params: params
  })
}
/**
 * 注册
 * @param params
 */
const REGISTER = params => {
  return fetch({
    url: '/sys/user/saveEmailAndPsw',
    method: 'post',
    data: params
  })
}

/**
 * 验证token是否过期
 * @param params
 */
const CHECK_TOKEN = params => {
  return fetch({
    url: '/sys/user/checkRegistTime',
    method: 'post',
    data: params
  })
}

/**
 * 信息登记
 * @param params
 */
const POST_USER_INFO = params => {
  return fetch({
    url: '/person/saveBasicInfo',
    method: 'post',
    data: params
  })
}

/**
 * 获取公司/个人注册信息
 * @param params
 */
const GET_REGISTER_INFO = params => {
  return fetch({
    url: '/person/getRegistInfo',
    method: 'post',
    data: params
  })
}

/**
 * 获取公司/个人修改保存
 * @param params
 */
const UPDATE_REGISTER_INFO = params => {
  return fetch({
    url: '/person/updateRegistInfo',
    method: 'post',
    data: params
  })
}

/**
 * 保存注册个人信息
 * @param params
 */
const SAVE_USER_INFO = params => {
  return fetch({
    url: '/person/saveBasicInfo',
    method: 'post',
    data: params
  })
}
/**
 * 短信验证码
 * @param params type 0 1 2 绑定 注册 重置
 */
const GET_MSG_CODE = params => {
  return fetch({
    url: '/mobileMsg/sendMobileMsg',
    method: 'get',
    params: params
  })
}

/**
 * 判断手机是否已注册
 * @param params
 * @constructor
 */
const CHECK_PHONE = params => {
  return fetch({
    url: '/sys/user/checkRegistTel',
    method: 'get',
    params: params
  })
}

/**
 * 检查注册信息是否完整
 * @param params
 * @constructor
 */
const CHECK_ACCOUNT = params => {
  return fetch({
    url: '/sys/user/checkAccountAudit',
    method: 'get',
    params: params
  })
}

/**
 * 手机注册
 * @param params
 * @constructor
 */
const REGISTER_BY_MOBILE = params => {
  return fetch({
    url: '/person/RegistByMobile',
    method: 'post',
    data: params
  })
}

/**
 * 判断是否手机注册（手机注册在填写资料时就不用再绑定手机，而邮箱需要绑定手机）
 * 判断是否填写了手机号
 * res.exist==1 有手机号
 * @param params
 * @constructor
 */
const CHECK_BIND_MOBILE = params => {
  return fetch({
    url: '/sys/user/checkBindMobile',
    method: 'get',
    params: params
  })
}

/**
 * 账号切换的账号列表
 * @param params
 * @constructor
 */
const SHOW_SWITCH_ACCOUNT = params => {
  return fetch({
    url: '/person/showSwitchAccount',
    method: 'post',
    data: params
  })
}
/**
 * 账号切换
 * @param params
 * @constructor
 */
const SWITCH_ACCOUNT = params => {
  return fetch({
    url: '/person/switchAccount',
    method: 'post',
    data: params
  })
}

/**
 * 加入公司
 * @param params
 * @constructor
 */
const JOIN_COMPANY = params => {
  return fetch({
    url: '/person/saveJoinCompanyInfo',
    method: 'post',
    data: params
  })
}

/**
 * 退出
 * @param params
 * @constructor
 */
const LOGOUT = params => {
  return fetch({
    url: '/logout',
    method: 'get',
    params: params
  })
}
/**
 * 判断当前账号是企业还是个人
 * @param stste=2企业1个人
 * @constructor
 */
const CHECK_ACCOUNT_TYPE = params => {
  return fetch({
    url: '/person/getAccountType',
    method: 'get',
    params: params
  })
}

/**
 * 查询充值记录的
 * invoice/queryBalance?consumeType=
 * page limit
 * 0 全部 1 消费 2充值
 * */
const QUERY_BALANCE = params => {
  return fetch({
    url: `/invoice/queryBalance`,
    method: 'get',
    params: params
  })
}

/**
 * /invoice/queryBalanceTotal
 * 全部余额
 * */
const QUERY_BALANCE_TOTAL = params => {
  return fetch({
    url: 'invoice/queryBalanceTotal',
    method: 'get',
    params: params
  })
}

/**
 * 获取用户的信息
 * @param params
 * @constructor
 */
const GET_PERSON_ACCOUNT_USER = params => {
  return fetch({
    url: '/person/getPersonAccountUser',
    method: 'get',
    params: params
  })
}
/**
 * 获取优惠券
 *  "state": 0表示未使用、1表示已使用
 *  "expire": 0表示未过期、1表示已过期
 *  "page":第几页
 *  "limit":每页显示数量
 * @param params
 * @constructor
 */
const COUPON = params => {
  return fetch({
    url: '/coupon/pagedQuery',
    method: 'get',
    params: params
  })
}

/**
 * 获取不可用的优惠券
 * */
const UN_COUPON = params => {
  return fetch({
    url: '/coupon/pagedDisable',
    method: 'get',
    params: params
  })
}

/**
 * 自动填充发票
 * */
const AUTO_COM_INVOICE = params => {
  return fetch({
    url: '/invoice/queryInvoiceHistory',
    method: 'get',
    params: params
  })
}

/**
 * 价格说明 callId 目合同id
 * */
const GET_PRICE_REMARK = params => {
  return fetch({
    url: '/Tr/getPriceRemark',
    method: 'get',
    params: params
  })
}

/**
 * oncall 工作时间 id 公司id
 * */
const WORK_TIME = params => {
  return fetch({
    url: '/company/getDefualtWorkTime',
    method: 'get',
    params: params
  })
}

/**
 * 邀请码加入公司
 * @param params
 * @constructor
 */
const CODE_JOIN_COMPANY = params => {
  return fetch({
    url: '/person/inviteCodeJoinCompany',
    method: 'post',
    data: params
  })
}

/**
 * 轮询获取消息
 * @param params
 * @constructor
 */
const GET_MSG = params => {
  return fetch({
    url: '/msg/getMsg?_=' + Date.parse(new Date()),
    method: 'get',
    params: params
  })
}
/**
 * 手机号找回密码
 * @param params /person/checkTelephoneAndCode?telephone=18613157893&code=1234
 * @constructor
 */
const CHECK_TEL_CODE = params => {
  return fetch({
    url: '/person/checkTelephoneAndCode',
    method: 'get',
    params: params
  })
}

/**
 * 手机重置密码
 * @param params /person/resetPswByMobile?password=65432
 * @constructor
 */
const RESET_PASSWORD = params => {
  return fetch({
    url: '/person/resetPswByMobile',
    method: 'get',
    params: params
  })
}


/*
* 判断当前登录账号是否是游客
*
* */

const IS_GUEST = params => {
  return fetch({
    url: '/sys/role/getRoleIdByUserId',
    method: 'get',
    params: params
  })
}

const NEW_ACCOUNT = params => {
  return fetch({
    url: '/person/getPromotionSource',
    method: 'get',
    params: params
  })
}
/* 更新地址 */
const EDIT_ADDRESS = params => {
  return fetch({
    url: '/company/updateByUser',
    method: 'post',
    data: params
  })
}
const apiList = {
  login,
  initWeiXinOpenId,
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
  read_notification,
  get_sub_order,
  rating_sub_order,
  reminder_order,
  complain_order,
  get_price_line,
  save_price_oncall,
  get_price_Ma,
  save_price_Ma,
  get_paid_charge,
  get_unpaid_charge,
  get_contract_detail,
  get_rating_history,
  post_pay_ment,
  get_call_detail,
  CHECK_EMAIL,
  REGISTER,
  CHECK_TOKEN,
  POST_USER_INFO,
  GET_REGISTER_INFO,
  UPDATE_REGISTER_INFO,
  SAVE_USER_INFO,
  GET_MSG_CODE,
  CHECK_PHONE,
  CHECK_ACCOUNT,
  REGISTER_BY_MOBILE,
  CHECK_BIND_MOBILE,
  SHOW_SWITCH_ACCOUNT,
  SWITCH_ACCOUNT,
  JOIN_COMPANY,
  LOGOUT,
  CHECK_ACCOUNT_TYPE,
  QUERY_BALANCE,
  QUERY_BALANCE_TOTAL,
  GET_PERSON_ACCOUNT_USER,
  COUPON,
  UN_COUPON,
  AUTO_COM_INVOICE,
  GET_PRICE_REMARK,
  WORK_TIME,
  CODE_JOIN_COMPANY,
  GET_MSG,
  CHECK_TEL_CODE,
  RESET_PASSWORD,
  IS_GUEST,
  NEW_ACCOUNT,
  EDIT_ADDRESS
}

export default apiList
